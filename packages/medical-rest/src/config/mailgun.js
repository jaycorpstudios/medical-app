import mailgun from 'mailgun-js'
import config from './constants'

const { MAILGUN_DOMAIN, MAILGUN_API_KEY, NODE_ENV } = config

const configuration = {
  apiKey: MAILGUN_API_KEY,
  domain: MAILGUN_DOMAIN,
}
// Workaround to avoid include mailgun during tests

const mailgunWrapper = NODE_ENV === 'test' ? {} : mailgun(configuration)

export default mailgunWrapper
