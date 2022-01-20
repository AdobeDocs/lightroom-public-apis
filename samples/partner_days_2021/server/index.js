const uuid = require('uuid')

const express = require('express');
const app = express();
const session = require('express-session')
const request = require('request-promise');
const https = require('https');
const bodyParser = require('body-parser');
const adobeApiKey = require('../public/config.js').adobeApiKey;
const adobeApiSecret = require('../public/config.js').adobeApiSecret;
const fs = require('fs');
const path = require('path');
const multer = require('multer')

/* Declare host name and port */
const hostname = 'localhost';
const port = 8000;


const outputFolderName = './public/uploads';
const upload = multer({
	storage: multer.diskStorage({
		destination: outputFolderName,
		filename: (req, file, cb) => cb(null, file.originalname),
	}),
});
/* Middlewares */
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }))
app.use(upload.single('file'));
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'jade')
app.use(session({
	/* Change this to your own secret value */
    secret: 'this-is-secret',
    resave: true,
    saveUninitialized: true,
    cookie: { 
        secure: false,
        maxAge: 6000000
    }
}));

/* Routes */
app.get('/', function (req, res) {
	fs.unlink('./public/images/rendition.jpeg', function(err){
		console.log(err)
	})
	res.render('index');
})

app.get('/login', function(req, res){
	/* This will prompt user with the Adobe auth screen */
	res.redirect(`https://ims-na1.adobelogin.com/ims/authorize?client_id=${adobeApiKey}&scope=openid,AdobeID,lr_partner_apis,lr_partner_rendition_apis&response_type=code&redirect_uri=https://localhost:8000/callback`)
})

app.get('/callback', function(req, res){
	/* Retrieve authorization code from request */
	let code = req.query.code;

	/* Set options with required paramters */
	let requestOptions = {
        uri: `https://ims-na1.adobelogin.com/ims/token/v3?grant_type=authorization_code&client_id=${adobeApiKey}&client_secret=${adobeApiSecret}&code=${code}`,
        method: 'POST',
        json: true
	}

	/* Send a POST request using the request library */
	request(requestOptions)
		.then(function (response) {
			/* Store the token in req.session.token */
			req.session.token = response.access_token;
			console.log(response.access_token)
			res.render('index', {'response':'User logged in!'});
    	})
    	.catch(function (error) {
			console.log(error)
    		res.render('index', {'response':'Log in failed!'});
    	});
})

app.get('/account', function(req, res){
	if (req.session.token) {
		/* Grab the token stored in req.session
		and set options with required parameters */

		let requestOptions = {
			uri: `https://lr.adobe.io/v2/account`,
			headers: {
				Authorization: `Bearer ${req.session.token}`,
				'X-Api-Key': adobeApiKey
			},
			json: true
		};
		console.log(requestOptions)

		/* Send a GET request using the request library */
		request(requestOptions)
			.then(function (response) {
				console.log(response)
				/* Send the received response back to the client side */
				response = response.replace("while (1) {}", "")
				response = response.replace("\n", "")
				let parsed_response = JSON.parse(response)
				let account_id = parsed_response.id
				req.session.account_id = account_id;
				res.render('index', {'response':"Account details fetched.",  'response_second': " \nAccount email is " + JSON.stringify(parsed_response.email) + " \nand Account ID is " +JSON.stringify(account_id)});
			})
			.catch(function (error) {
				console.log(error)
				res.render('index', {'response':'Failed to get account'});
			});

	} else {
		res.render('index', {'response':'You need to log in first'});
	}
})

app.get('/catalog', function(req, res){
	if (req.session.token) {
		/* Grab the token stored in req.session
		and set options with required parameters */
		let requestOptions = {
			uri: `https://lr.adobe.io/v2/catalog`,
			headers: {
				Authorization: `Bearer ${req.session.token}`,
				'X-Api-Key': adobeApiKey
			},
			json: true
		};
		console.log(requestOptions)

		/* Send a GET request using the request library */
		request(requestOptions)
			.then(function (response) {
				/* Send the received response back to the client side */
				console.log(response)
				response = response.replace("while (1) {}", "")
				response = response.replace("\n", "")
				let parsed_response = JSON.parse(response)
				let catalog_id = parsed_response.id
				req.session.catalog_id = catalog_id;
				res.render('index', {'response': "Catalog Details Fetched", 'response_second': "Catalog ID is " + JSON.stringify(catalog_id)});
			})
			.catch(function (error) {
				console.log(error)
				res.render('index', {'response':'Failed to get catalog'});
			});

	} else {
		res.render('index', {'response':'You need to log in first'});
	}
})


app.get('/albums', function(req, res){
	if (req.session.token) {
		/* Grab the token stored in req.session
		and set options with required parameters */
		let requestOptions = {
			uri: `https://lr.adobe.io/v2/catalogs/${req.session.catalog_id}/albums`,
			headers: {
				Authorization: `Bearer ${req.session.token}`,
				'X-Api-Key': adobeApiKey
			},
			json: true
		};
		console.log(requestOptions)
		/* Send a GET request using the request library */
		request(requestOptions)
			.then(function (response) {
				/* Send the received response back to the client side */
				console.log(response)
				response = response.replace("while (1) {}", "")
				response = response.replace("\n", "")
				let parsed_response = JSON.parse(response)
				let albums_names = []
				parsed_response.resources.forEach((x, i) => albums_names.push(x.payload.name));
				console.log(albums_names)
				res.render('index', {'response': "Albums Fetched", 'response_second':JSON.stringify(albums_names.join(', '))});
			})
			.catch(function (error) {
				console.log(error)
				res.render('index', {'response':'Failed to get albums'});
			});

	} else {
		res.render('index', {'response':'You need to log in first'});
	}
})

app.post('/create_asset', function(req, res){
	if (!req.session.token) {
		res.render('index', {'response':'You need to log in first'});
		return
	}
	if (!req.session.catalog_id || !req.session.account_id)  {
		res.render('index', {'response':'You need get account as well as catalog first'});
		return
	}

	let asset_uuid = uuid.v4();
	asset_uuid = asset_uuid.replace(/-/g, "")
	console.log('Your Asset UUID is: ' + asset_uuid);
	if (!req.file){
		res.render('index', {'response':'Please select a file first'});
		return
	}
	let content = {
		subtype: "image",
		payload: {
			captureDate: '0000-00-00T00:00:00',
			userCreated: "2019-09-17T17:46:38.575399Z",
			userUpdated: "2019-09-17T17:46:38.575399Z",
			importSource: {
				fileName:req.file.originalname,
				importTimestamp: "2019-09-17T17:46:38.575399Z",
				importedBy: req.session.account_id,
				importedOnDevice: adobeApiKey
			}
		}
	}
	let requestOptions = {
		uri: `https://lr.adobe.io/v2/catalogs/${req.session.catalog_id}/assets/${asset_uuid}`,
		headers: {
			Authorization: `Bearer ${req.session.token}`,
			'X-Api-Key': adobeApiKey
		},
		body: content,
		json: true,
		method: "PUT"
	};

	console.log(requestOptions)

	request(requestOptions)
		.then(function (response) {
			/* Send the received response back to the client side */
			console.log(response)
			let requestOptionsMaster = {
				uri: `https://lr.adobe.io/v2/catalogs/${req.session.catalog_id}/assets/${asset_uuid}/master`,
				headers: {
					Authorization: `Bearer ${req.session.token}`,
					'X-Api-Key': adobeApiKey,
					'Content-Type': 'application/octet-stream'
				},
				body: fs.createReadStream("./public/uploads/"+ req.file.originalname),
				//body: stream,
				method: "PUT"
			};

			console.log(requestOptionsMaster)

			request(requestOptionsMaster)
				.then(function (response) {
					/* Send the received response back to the client side */
					console.log(response)
					req.session.asset_id = asset_uuid;
					res.render('index', {'response': "Image asset created for file name " +req.file.originalname});
				})
				.catch(function (error) {
					console.log(error)
					res.render('index', {'response':'Failed to craete asset'});
				});
		})
		.catch(function (error) {
			console.log(error)
			res.render('index', {'response':'Failed to craete asset'});
		});
})

app.post('/fetch_rendition', function(req, res){
	if (!req.session.token) {
		res.render('index', {'response':'You need to log in first'});
		return
	}

	if (!req.session.catalog_id || !req.session.asset_id) {
		res.render('index', {'response':'You need fetch catalog first and upload an image'});
		return
	}

	let requestOptions = {
		uri: `https://lr.adobe.io/v2/catalogs/${req.session.catalog_id}/assets/${req.session.asset_id}/renditions/${req.body.rendition_type}`,
		headers: {
			Authorization: `Bearer ${req.session.token}`,
			'X-Api-Key': adobeApiKey
		}
	};

	console.log(requestOptions)
	request(requestOptions).on('response', function(response){
		//Print response if needed
	}).pipe(fs.createWriteStream("./public/images/rendition.jpeg")).on('close', function(err) {
		if (err){
			console.log(err)
			res.render('index', {'response':'Failed to get rendition'});
		} else {
			res.render('index', {'response': "Rendition Fetched", 'rendition': true});
		}
	});
})

/* Set up a HTTS server with the signed certification */
var httpsServer = https.createServer({
	key: fs.readFileSync(path.join(__dirname, 'key.pem')),
	cert: fs.readFileSync(path.join(__dirname, 'cert.pem'))
}, app).listen(port, hostname, (err) => {
	if (err) console.log(`Error: ${err}`);
	console.log(`listening on port ${port}!`);
});