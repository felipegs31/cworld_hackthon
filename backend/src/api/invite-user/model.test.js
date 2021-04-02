import { InviteUser } from '.'

let inviteUser

beforeEach(async () => {
  inviteUser = await InviteUser.create({ email:'a@a.com', role: 'user', name: 'any_name' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = inviteUser.view()
    expect(view.email).toBe(inviteUser.email)
    expect(view.role).toBe(inviteUser.role)
    expect(view.name).toBe(inviteUser.name)
    expect(view.token).toBe(inviteUser.token)
  })

  it('returns full view', () => {
    const view = inviteUser.view(true)
    expect(view.email).toBe(inviteUser.email)
    expect(view.role).toBe(inviteUser.role)
    expect(view.name).toBe(inviteUser.name)
    expect(view.token).toBe(inviteUser.token)
  })
})
