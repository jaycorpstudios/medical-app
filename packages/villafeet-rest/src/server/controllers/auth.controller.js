import httpStatus from 'http-status'
import passport from 'passport'
import APIError from '../helpers/APIError'
import User from '../models/user.model'

/**
 * Returns passport login response (cookie) when valid username and password is provided
 * @param req
 * @param res
 * @returns {*}
 */
function login(req, res) {
  return res.json(req.user)
}

/**
 * Returns User when succesfully registered
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function register(req, res, next) {
  const newUser = new User({ email: req.body.email })
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      //UserExistsError
      const error = new APIError(`Authentication error ${err.name}`, httpStatus.UNAUTHORIZED)
      next(error)
      return
    }

    passport.authenticate('local')(req, res, () => {
      res.json({ user })
    })
  })
}

/**
 * Returns User if user session is still open
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function me(req, res, next) {
  if (!req.user) {
    const error = new APIError('Authentication error', httpStatus.UNAUTHORIZED)
    next(error)
  }

  res.json(req.user)
}

/**
 * Middleware to check user is authorised to access endpoint.
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function checkAuth(req, res, next) {
  if (!req.user) {
    const error = new APIError('Authentication error', httpStatus.UNAUTHORIZED)
    next(error)
  }

  next()
}

export default { login, register, me, checkAuth }
