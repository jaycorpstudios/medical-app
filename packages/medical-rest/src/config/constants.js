
require('dotenv-safe').config();

export default {
  NODE_ENV: process.env.NODE_ENV || "development",
  FORCE_DEBUG: process.env.FORCE_DEBUG || false,
  MONGOOSE_DEBUG: process.env.MONGOOSE_DEBUG || false,
  PASSOPORT_SECRET: process.env.PASSOPORT_SECRET || 'developmentSecret',
  DB: process.env.DB,
  PORT: process.env.PORT || 4040,
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN,
  MAILGUN_API_KEY: process.env.MAILGUN_API_KEY
}
  