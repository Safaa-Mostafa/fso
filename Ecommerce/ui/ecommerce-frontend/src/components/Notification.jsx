const Notification = ({ message, type }) => {
  if (!message) return null

  const style = {
    padding: '12px 20px',
    margin: '10px 0',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '15px',
    color: '#fff',
    backgroundColor: type === 'error' ? '#e74c3c' : '#2ecc71',
    boxShadow: '0px 2px 8px rgba(0,0,0,0.2)',
    transition: 'all 0.3s ease-in-out'
  }

  return <div style={style}>{message}</div>
}

export default Notification
