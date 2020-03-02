import httpStatus from 'http-status'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import config from './../../config/env'
import APIError from '../helpers/APIError'
import User from '../models/user.model'
import emailService from './../services/emailService'

/**
 * Token expiration expressed in seconds
 * or a string describing a time span zeit/ms. Eg: 60, "2 days", "10h", "7d" 
 */
const tokenExpiration = '1 days'

/**
 * Returns passport login response (cookie) when valid username and password is provided
 * @param req
 * @param res
 * @returns {*}
 */
function login(req, res) {
  const payload = {
    email: req.user.email,
    avatar: req.user.avatar,
    name: req.user.name,
    lastName: req.user.lastName,
    id: req.user._id,
    role: req.user.role,
  }
  jwt.sign(payload, config.passportSecret, { expiresIn: tokenExpiration }, (err, token) => {
    if (err) res.status(500).json({ error: 'Error signing token', raw: err })
    res.json({ success: true, token: `Bearer ${token}` })
  })
}

/**
 * Returns User when succesfully registered
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function register(req, res, next) {
  const { email, name = '', lastName = '', password } = req.body
  const newUser = new User({ email, name, lastName })
  User.register(newUser, password, (err, user) => {
    if (err) {
      //UserExistsError
      const error = new APIError(`Authentication error ${err.name}`, httpStatus.UNAUTHORIZED)
      next(error)
      return
    }

    //encrypt and response with token
    passport.authenticate('local')(req, res, () => {
      const payload = {
        email: user.email,
        avatar: user.avatar,
        name: user.name,
        lastName: user.lastName,
        id: user._id,
        role: user.role,
      }
      jwt.sign(payload, config.passportSecret, { expiresIn: tokenExpiration }, (err, token) => {
        if (err) res.status(500).json({ error: 'Error signing token', raw: err })
        emailService.sendEmail({})
        return res.json({ success: true, token: `Bearer ${token}` })
      })
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
  //TODO: Get more info about the user
  if (!req.user) {
    next(new APIError('Authentication error', httpStatus.UNAUTHORIZED))
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
function checkAuth(req, _res, next) {
  const { authorization } = req.headers

  if (authorization) {
    const parsedTokenHeader = /Bearer\s(.*)/.exec(authorization)
    const token = parsedTokenHeader ? parsedTokenHeader[1] : ''
    jwt.verify(token, config.passportSecret, function(err, decoded) {
      if (err) {
        return next(new APIError('Authentication error', httpStatus.UNAUTHORIZED))
      } else {
        req.user = decoded
        return next()
      }
    })
  } else {
    return next(new APIError('Authentication error', httpStatus.UNAUTHORIZED))
  }
}

export default { login, register, me, checkAuth }
