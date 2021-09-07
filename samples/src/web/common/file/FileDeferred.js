/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/
import FileUtils from './FileUtils'

class FileDeferred {
	constructor(file) {
		this._file = file
	}

	get promise() {
		if (!this._promise) {
			this._promise = FileUtils.readP(this._file)
		}
		return this._promise
	}
}

export default FileDeferred
