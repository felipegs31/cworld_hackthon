import { success, notFound } from '../../services/response/'
import { sendMail } from '../../services/sendgrid'
import { InviteUser } from '.'
import { User } from '../user'
import { sign } from '../../services/jwt'

export const create = async ({ bodymen: { body: { email, name, role } } }, res, next) => {
  try {
    const hasUser = await User.findOne({ email })
    if (hasUser) {
      return res.status(409).json({
        message: 'User already registered'
      })
    }
    const invite = await InviteUser.create({ email, name, role })
    const link = `${process.env.API_URL}/inviteuser/${invite.token}`
    const content = `
      Hey, ${name}.<br><br>
      You have been invited to use Food Corner<br>
      Please use the following link to login in your new account. It will expire in 24 hours.<br><br>
      <a href="${link}">${link}</a><br><br>
      If you dont want to join, then you can safely ignore this email. :)<br><br>
      &mdash; cworld Team
    `
    await sendMail({ toEmail: email, subject: 'cworld - Invite', content })
    return res.status(204).end()
  } catch(err) {
    res.status(500).end()
  }
}

export const show = ({ params: { token } }, res, next) =>
  InviteUser.findOne({ token })
    .then(notFound(res))
    .then((invite) => invite ? invite.view(true) : null)
    .then(success(res))
    .catch(next)

export const update = async ({ params: { token }, bodymen: { body: { password } } }, res, next) => {
  try {
    const invite = await InviteUser.findOne({ token })
    if (!invite){
      return res.status(409).json({
        message: 'Invite not found'
      })
    }

    const hasUser = await User.findOne({ email: invite.email })
    if (hasUser) {
      return res.status(409).json({
        message: 'User already registered'
      })
    }

    const user = await User.create({email: invite.email, role: invite.role, name: invite.name, password})
    const userToken = await sign(user.id)
    await InviteUser.deleteOne({ token })

    res.status(201).json({
      token: userToken,
      user: user.view(true)
    })
  } catch (err) {
    res.status(500).end()
  }
}

