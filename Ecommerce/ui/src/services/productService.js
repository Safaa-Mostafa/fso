import axios from 'axios'
const baseUrl = 'http://localhost:3000/api/product'

let token = null
const getToken = () => localStorage.getItem('accessToken')


export const deleteProduct = async (id) => {
  const authToken = token || `Bearer ${getToken()}`
  const config = {
    headers: {
      Authorization: authToken
    }
  }
  const uri = `${baseUrl}/${id}`
  const response = await axios.delete(uri, config)
  return response.data
}
export const setToken = newToken => { token = `Bearer ${newToken}` }

export const getAll = () => axios.get(baseUrl).then(res => res.data)

export const create = async newProduct => {
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, newProduct, config)
  return response.data
}

export const update = (id, updatedProduct) =>
  axios.put(`${baseUrl}/${id}`, updatedProduct, { headers: { Authorization: token } }).then(res => res.data)


export default { update, create, getAll,deleteProduct }
