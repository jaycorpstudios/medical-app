import express from 'express'
import mediaCtrl from '../../controllers/media.controller'

const router = express.Router() // eslint-disable-line new-cap

router
  .route('/avatar')
  /** POST /api/media/avatar/ - Upload avatar photo */
  .post(mediaCtrl.uploadAvatar)

export default router
