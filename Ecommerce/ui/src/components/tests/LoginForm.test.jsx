import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "../LoginForm";
import { expect, vi } from "vitest";

test("renders login form", () => {
  render(
    <LoginForm
      handleLogin={vi.fn()}
      email=""
      setEmail={vi.fn()}
      password=""
      setPassword={vi.fn()}
    />
  )

  expect(screen.getByPlaceholderText("Enter your email")).toBeDefined()
  expect(screen.getByPlaceholderText("Enter your password")).toBeDefined()
  expect(screen.getByRole("button", { name: /login/i })).toBeDefined()
})

test("calls setEmail when user types email", async () => {
  const user = userEvent.setup();
  const setEmail = vi.fn();
  render(
    <LoginForm
      handleLogin={vi.fn()}
      email=""
      setEmail={setEmail}
      password=""
      setPassword={vi.fn()}
    />
  )

  const emailInput = screen.getByPlaceholderText("Enter your email")
  await user.type(emailInput, "safaa@test.com")
  expect(setEmail).toHaveBeenCalled()
})

test("calls setPassword when user types password", async () => {
  const user = userEvent.setup()
  const setPassword = vi.fn()
  render(
    <LoginForm
      handleLogin={vi.fn()}
      email=""
      setEmail={vi.fn()}
      password=""
      setPassword={setPassword}
    />
  )

  const passwordInput = screen.getByPlaceholderText("Enter your password")
  await user.type(passwordInput, '262728')
  expect(setPassword).toHaveBeenCalled()
})

test('calls handleLogin when form is submitted',async ()=>{
  const user = userEvent.setup()
  const handleLogin = vi.fn()
  render(
    <LoginForm 
    handleLogin={handleLogin}
    email=""
    setEmail={vi.fn()}
    password="299292"
    setPassword={vi.fn()}
    />
  )

  const button =screen.getByRole('button',{name:'Login'})
  await user.click(button)
  expect(handleLogin).toHaveBeenCalledTimes(1)
})