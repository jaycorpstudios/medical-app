//Temporal email implementation, just to test.
// You can see a record of this email in your logs: https://app.mailgun.com/app/logs.

import mailgun from './../../config/mailgun'

//TODO: Refactor this to send:
/**
 * User registration confirmation
 * Restore password links
 * Medical appointment reminder
 * Medical appointment summary
 */
const mailTypes = {
  registration: {
    template: 'vf-account-created',
    subject: 'Villafeet: Confirma tu cuenta',
  },
}

const from = 'Villafeet App <noreply@villafeet.com.mx>'
const testMode = true //TODO: Set value based on ENV
const data = {
  from,
  to: 'jaycorpstudios@me.com',
  subject: 'Test VillaFeet Account Created',
  template: 'vf-account-created',
  'v:name': 'Lord Jay',
  'o:testmode': testMode,
}
const emailService = {
  sendEmail: ({ type, values }) => {
    //get type and send the email
    mailgun.messages().send(data, function(error, body) {
      console.log('Sending email with data:', data)
      console.log(body)
      //Returns
      // { id: '<20190903044145.1.92469F782E374B1F@sandbox6a14abb573ce42fba6b79e171dd21b61.mailgun.org>',
      //  message: 'Queued. Thank you.' }
    })
  },
}

export default emailService
