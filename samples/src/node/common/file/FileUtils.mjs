/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/
import fs from 'fs'

let FileUtils = {
	readStringFromFileP: (name) => new Promise((resolve, reject) => {
		fs.readFile(name, 'utf8', function(err, data) {
			if(err) {
				reject(err)
			} else {
				resolve(data)
			}
		})
	}),

	writeStringToFileP: (buffer, name) => new Promise((resolve, reject) => {
		fs.writeFile(name, buffer,  'utf8', function(err) {
			if(err) {
				reject(err)
			} else {
				resolve()
			}
		})
	}),

	writeBufferToFileP: (buffer, name) => new Promise((resolve, reject) => {
		fs.writeFile(name, buffer, function(err) {
			if(err) {
				reject(err)
			} else {
				resolve()
			}
		})
	})
}

export default FileUtils
