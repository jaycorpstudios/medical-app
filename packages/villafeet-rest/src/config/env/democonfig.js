export default {
  env: 'development',
  FORCE_DEBUG: false,
  MONGOOSE_DEBUG: true,
  passportSecret: 'passportsecret',
  // Use localhost if using local mongo, otherwise use mongo:27017 for Docker
  db: 'mongodb://localhost:27017/villafeet-api-dev',
  port: 4040,
  // Get a Cloudinary account and fulfill the info
  CLOUDINARY_NAME: '',
  CLOUDINARY_API_KEY: '',
  CLOUDINARY_API_SECRET: '',
  // Get a Mailgun account and fulfill the info
  MAILGUN_DOMAIN: '',
  MAILGUN_API_KEY: '',
}
