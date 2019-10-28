const path = require('path')
const multer = require('multer')
const moment = require('moment')

const storage = multer.diskStorage({
  destination(req, file, cb) {
    let dirName = 'static'
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
      dirName = 'static/uploads'
    } else if (
        file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.mimetype === 'application/vnd.ms-excel'
      ) {
      dirName = 'static/xls'
    }
    cb(null, path.resolve(__dirname, '../..', dirName))
  },
  filename(req, file, cb) {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
      cb(null, `${moment().format('DDMMYYYY-HHmmss_SSS')}-${file.originalname}`)
    } else if (
        file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.mimetype === 'application/vnd.ms-excel'
      ) {
      cb(null, file.originalname)
    }
  }
})

const fileFilter = (req, file, cb) => {
  if (
      file.mimetype === 'image/png' || 
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.mimetype === 'application/vnd.ms-excel'
    ) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

module.exports = multer({
  storage, fileFilter, limits: {fileSize: 1024 * 1024 * 5}
})
