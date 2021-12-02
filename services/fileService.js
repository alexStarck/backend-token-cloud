const fs = require('fs')
const Path = require('path')
const File = require('../models/File')

class FileService {

    createDir(file) {
        const filePath = `${Path.join(__dirname, '..', 'files')}\\${file.user}\\${file.path}`
        return new Promise(((resolve, reject) => {
            try {
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath, {recursive: true})
                    return resolve({message: 'File was created'})
                } else {
                    return reject({message: "File already exist"})
                }
            } catch (e) {
                return reject({message: 'File error'})
            }
        }))
    }

    deleteFile(file) {
        const path = this.getPath(file)
        if (file.type === 'dir') {
            fs.rmdirSync(path)
        } else {
            fs.unlinkSync(path)
        }
    }

    getPath(file) {
        return Path.join(__dirname, '..', 'files') + '\\' + file.user + '\\' + file.path
    }
}


module.exports = new FileService()