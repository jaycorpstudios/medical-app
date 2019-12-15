import httpStatus from 'http-status'
import multer from 'multer'
import cloudinaryStorage from 'multer-storage-cloudinary'
import util from 'util'
import APIError from './../helpers/APIError'
import cloudinary from './../../config/cloudinary'

const { NODE_ENV = 'development' } = process.env
const ALLOWED_IMG_TYPES = ['image/png', 'image/jpg', 'image/jpeg']
const AVATARS_FOLDER = `villafeet/${NODE_ENV}/avatars`

const storageAvatar = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: AVATARS_FOLDER,
  allowedFormats: ['jpg', 'png'],
  transformation: [{ width: 500, height: 500, crop: 'fill', gravity: 'auto' }],
})

const fileFilter = (_req, file, cb) => {
  if (!ALLOWED_IMG_TYPES.includes(file.mimetype)) {
    const error = new APIError('wrong file mimetype', httpStatus.UNSUPPORTED_MEDIA_TYPE)
    return cb(error)
  }
  cb(null, true)
}

const parseAvatar = multer({
  storage: storageAvatar,
  fileFilter,
}).single('avatar')

/**
 * Add avatar photo
 * @returns {file}
 */
async function uploadAvatar(req, res) {
  try {
    await util.promisify(parseAvatar)(req, res)
    return res.json({ file: req.file })
  } catch (err) {
    return res.status(err.status).json({ error: err.message, raw: err })
  }
}

export default { uploadAvatar }
