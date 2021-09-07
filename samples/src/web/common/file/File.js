/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/
import FileDeferred from './FileDeferred'
import OriginalUtils from '../../../common/original/OriginalUtils'

let File = {
	streamP: async (buffer, chunkSize, chunkHandlerP) => {
		if (chunkSize === 0) { // return entire buffer in one chunk
			await chunkHandlerP(buffer, 0)
			return
		}
		let count = (buffer.byteLength / chunkSize) - 1 // not last chunk
		let offset = 0
		for (let i = 0; i < count; i++) {
			let data = buffer.slice(offset, offset + chunkSize)
			await chunkHandlerP(data, offset)
			offset += chunkSize
		}
		let data = buffer.slice(offset) // last chunk
		await chunkHandlerP(data, offset)
	},

	streamController: (deferred) => {
		return async (chunkSize, chunkHandlerP) => {
			let buffer = await deferred.promise // entire file for sample
			await File.streamP(buffer, chunkSize, chunkHandlerP)
		}
	},

	original: (file) => {
		let deferred = new FileDeferred(file)
		return OriginalUtils.create(undefined, undefined, file.name, file.size, File.streamController(deferred))
	}
}

export default File
