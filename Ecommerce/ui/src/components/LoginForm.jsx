const LoginForm = ({ handleLogin, email, setEmail, password, setPassword }) => {
  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    maxWidth: '350px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  }

  const labelStyle = {
    display: 'flex',
    flexDirection: 'column',
    fontWeight: 'bold',
    color: '#34495e',
    fontSize: '14px'
  }

  const inputStyle = {
    padding: '10px',
    marginTop: '5px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '14px',
    outline: 'none',
  }

  const buttonStyle = {
    padding: '10px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#2ecc71',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '15px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  }

  const buttonHoverStyle = {
    backgroundColor: '#27ae60'
  }

  return (
    <form
      onSubmit={handleLogin}
      style={formStyle}
    >
      <div style={labelStyle}>
        Email
        <input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          style={inputStyle}
          placeholder="Enter your email"
        />
      </div>

      <div style={labelStyle}>
        Password
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          style={inputStyle}
          placeholder="Enter your password"
        />
      </div>

      <button
        type="submit"
        style={buttonStyle}
        onMouseOver={e => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
        onMouseOut={e => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
      >
        Login
      </button>
    </form>
  )
}

export default LoginForm
