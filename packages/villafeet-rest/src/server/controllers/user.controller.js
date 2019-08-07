import User from '../models/user.model'

/**
 * Load user and append to req.
 */
async function load(req, res, next) {
  const { userId } = req.params
  const user = await User.get(userId)
  req.user = user
  return next()
}

/**
 * Get user
 * @returns {User}
 */

async function get(req, res) {
  res.json(req.user)
}

/**
 * Update existing user
 * @property {string} req.body.email - The email of user.
 * @returns {User}
 */
function update(req, res, next) {
  const user = req.user
  //TODO: Handle update data (e.g.)
  //user.email = req.body.email
  user.save().then(savedUser => res.json(savedUser)).catch(e => next(e))
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
async function list(req, res) {
  const { limit = 50, skip = 0 } = req.query
  const users = await User.list({ limit, skip })
  res.json(users)
}

/**
 * Delete user.
 * @returns {User}
 */
async function remove(req, res, next) {
  const { user } = req
  const deleted = await user.remove()
  res.json(deleted)
}

export default { load, get, update, list, remove }
