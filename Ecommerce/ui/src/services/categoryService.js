import axios from 'axios'

const baseUrl = 'http://localhost:3000/api/category'

let token = null

export const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getToken = () => localStorage.getItem('accessToken')

export const getAll = async () => {
  const authToken = token || `Bearer ${getToken()}`
  const config = {
    headers: {
      Authorization: authToken
    }
  }
  const response = await axios.get(baseUrl, config)
  return response.data
}

export const create = async (newCategory) => {
  const config = {
    headers: {
      Authorization: token || `Bearer ${getToken()}`
    }
  }
  const response = await axios.post(baseUrl, newCategory, config)
  return response.data
}

export default { getAll, create, setToken }
