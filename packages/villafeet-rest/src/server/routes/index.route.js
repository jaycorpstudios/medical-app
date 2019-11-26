import express from 'express'
import userRoutes from './user/user.route'
import patientRoutes from './patient/patient.route'
import mediaRoutes from './media/media.route'
import authRoutes from './auth/auth.route'
import authCtrl from '../controllers/auth.controller'

const router = express.Router() // eslint-disable-line new-cap

/* PUBLIC ROUTES */
/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => res.send('OK'))
router.use('/auth', authRoutes)

/* PROTECTED ROUTES */
//TODO: check if groupId is the same
router.use('/users', authCtrl.checkAuth, userRoutes)
//TODO: add authCtrl.checkAuth and check if groupId is the same
router.use('/patients', patientRoutes)
router.use('/media', authCtrl.checkAuth, mediaRoutes)

export default router
