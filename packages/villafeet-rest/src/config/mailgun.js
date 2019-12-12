import mailgun from 'mailgun-js'
import config from './env'

const { MAILGUN_DOMAIN, MAILGUN_API_KEY } = config

const configuration = {
  apiKey: MAILGUN_API_KEY,
  domain: MAILGUN_DOMAIN,
}

export default mailgun(configuration)
