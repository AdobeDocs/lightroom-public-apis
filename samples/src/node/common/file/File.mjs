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
import path from 'path'
import OriginalUtils from '../../../common/original/OriginalUtils.mjs'

let File = {
	streamP: (filePath, chunkSize, chunkHandlerP) => new Promise((resolve, reject) => {
		let offset = 0
		async function readableHandler() {
			let data
			while (null !== (data = stream.read(chunkSize))) {
				try {
					await chunkHandlerP(data, offset)
					offset += data.length
				} catch (err) {
					stream.destroy(err)
				}
			}
			stream.once('readable', readableHandler)
		}
		const stream = fs.createReadStream(filePath, { highWaterMark: chunkSize })
		stream.on('end', resolve)
		stream.on('error', reject)
		stream.once('readable', readableHandler)
	}),

	streamController: (filePath) => {
		return (chunkSize, chunkHandlerP) => File.streamP(filePath, chunkSize, chunkHandlerP)
	},

	originalP: async function(filePath) {
		let stats = await fs.promises.stat(filePath)
		let parent = path.dirname(filePath)
		let name = path.basename(filePath)
		return OriginalUtils.create(filePath, parent, name, stats.size, File.streamController(filePath))
	}
}

export default File
