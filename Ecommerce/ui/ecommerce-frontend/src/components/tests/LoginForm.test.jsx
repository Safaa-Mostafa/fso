import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm from '../LoginForm'
import {vi } from 'vitest'

test('LoginForm updates inputs and calls handleLogin', async () => {
  const handleLogin = vi.fn()
  let email = ''
  let password = ''
  const setEmail = (val) => email = val
  const setPassword = (val) => password = val

  render(<LoginForm handleLogin={handleLogin} email={email} setEmail={setEmail} password={password} setPassword={setPassword} />)

  const user = userEvent.setup()
  const emailInput = screen.getByPlaceholderText('Enter your email')
  const passwordInput = screen.getByPlaceholderText('Enter your password')
  const button = screen.getByText('Login')

  await user.type(emailInput, 'noha@gmil.com')
  await user.type(passwordInput, 'P@ssw0rd12')
  await user.click(button)

  expect(handleLogin).toHaveBeenCalled()
})
