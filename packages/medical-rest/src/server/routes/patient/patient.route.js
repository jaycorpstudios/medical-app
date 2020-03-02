import express from 'express'
import validate from 'express-validation'
// import paramValidation from './patient.validations'
import patientCtrl from '../../controllers/patient.controller'
import catchErrors from './../../helpers/catchErrors'

const router = express.Router() // eslint-disable-line new-cap

/** GET /api/patients - Get list of patients */
router.route('/').get(catchErrors(patientCtrl.list)).post(catchErrors(patientCtrl.add))

router
  .route('/:patientId')
  /** GET /api/patients/:patientId - Get patient */
  .get(catchErrors(patientCtrl.get))
  /** PUT /api/patients/:patientId - Update patient */
  .put(catchErrors(patientCtrl.update))
  /** DELETE /api/patients/:patientId - Delete patient */
  .delete(catchErrors(patientCtrl.remove))

/** Load patient when API with patientId route parameter is hit */
router.param('patientId', catchErrors(patientCtrl.load))

export default router
