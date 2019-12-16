import setMongooseConfig from '../config/mongoose'
import User from '../server/models/user.model'

setMongooseConfig()

function createUser({ newUser, password = '' } = {}) {
  const handleUserCreation = (resolve, reject) => {
    User.register(newUser, password, (user, error) => {
      if (error) {
        return reject(error)
      }
      return resolve(user)
    })
  }
  return new Promise(handleUserCreation)
}

async function main() {
  console.log('About to create local admin users.')
  const password = 'adminAdmin'
  const email = 'admin@admin.com'
  const newUser = new User({
    name: 'John',
    lastName: 'Doe',
    email,
    avatar: `https://api.adorable.io/avatars/285/${email}.png`,
    role: 'admin',
  })
  try {
    await createUser({ newUser, password })
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
  console.log('Users created')
  process.exit()
}

main()
