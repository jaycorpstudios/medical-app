import express from 'express'
import validate from 'express-validation'
import paramValidation from './user.validations'
import userCtrl from '../../controllers/user.controller'
import catchErrors from './../../helpers/catchErrors'

const router = express.Router() // eslint-disable-line new-cap

/** GET /api/users - Get list of users */
router.route('/').get(catchErrors(userCtrl.list))

router
  .route('/:userId')
  /** GET /api/users/:userId - Get user */
  .get(catchErrors(userCtrl.get))
  /** PUT /api/users/:userId - Update user */
  .put(validate(paramValidation.updateUser), userCtrl.update)
  /** DELETE /api/users/:userId - Delete user */
  .delete(catchErrors(userCtrl.remove))

/** Load user when API with userId route parameter is hit */
router.param('userId', catchErrors(userCtrl.load))

export default router
