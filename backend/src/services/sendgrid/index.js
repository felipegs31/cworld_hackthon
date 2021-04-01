import sendgridMail from '@sendgrid/mail'
import { sendgridKey, defaultEmail } from '../../config'

sendgridMail.setApiKey(sendgridKey)

export const sendMail = ({
  fromEmail = defaultEmail,
  toEmail,
  subject,
  content
}) => {
  const msg = {
    to: toEmail,
    from: fromEmail,
    subject,
    html: content
  }
  console.log('msg', msg)
  console.log('sendgridKey', sendgridKey)

  return sendgridMail.send(msg)
}
