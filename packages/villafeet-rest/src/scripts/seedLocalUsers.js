import setMongooseConfig from '../config/mongoose'
import User from '../server/models/user.model'
//TODO: Add babel config to skip errors when calling this script
setMongooseConfig()

async function createUser() {
  try {
    const user = new User({
      name: 'Jay',
      lastName: 'Test',
      email: 'test@me.com',
      password: 'test',
      avatar: '',
    })
    const response = await user.save()
    return response
  } catch (err) {
    console.log(err)
  }
}

async function main() {
  console.log('About to create local users.')
  await createUser()
  console.log('created users')
  process.exit()
}

main()
