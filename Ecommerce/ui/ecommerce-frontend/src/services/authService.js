import axios from 'axios'
const baseUrl = 'http://localhost:3000/api/auth'
let token = null

const setToken = (newToken) => {
  return `Bearer ${newToken}`
}
const getToken = () => {
  return localStorage.getItem('accessToken')
}
const login = async credentials => {
  const response = await axios.post(`${baseUrl}/login`, credentials)
  return response.data
}

const refreshToken = async (refreshToken) => {
  const response = await axios.post(`${baseUrl}/refresh-token`, { refreshToken })
  return response.data
}

const getProfile = async () => {
  token = getToken()
  const config = {
    headers: { Authorization:setToken(token) }
  }
  const response = await axios.get(`${baseUrl}/profile`, config)
  return response.data
}

export default { login ,getProfile,setToken,refreshToken }
