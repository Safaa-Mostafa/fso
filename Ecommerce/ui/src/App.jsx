import { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import ProductForm from './components/ProductForm'
import ProductsDashboard from './components/ProductList'
import Notification from './components/Notification'
import authService from './services/authService'
import * as productService from './services/productService'
import Navbar from './components/Navbar'
import './index.css'

const App = () => {
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [products, setProducts] = useState([])
  const [newProduct, setNewProduct] = useState({ name: '', price: '' })
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const loginFormRef = useRef()

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      productService.setToken(token)
      authService
        .getProfile()
        .then((profile) => setUser({ ...profile, token }))
        .catch(() => {
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
        })
    }

    productService.getAll().then(setProducts)
  }, [])

  const handleProductDeleted = (id) => {
    setProducts(products.filter((product) => product._id !== id))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const res = await authService.login({ email, password })
      localStorage.setItem('accessToken', res.data.accessToken)
      if (res.data.refreshToken)
        localStorage.setItem('refreshToken', res.data.refreshToken)

      const profile = await authService.getProfile()
      setUser(profile.user)
      productService.setToken(res.data.accessToken)
      loginFormRef.current.clearForm()

      setSuccessMessage(`Welcome ${profile.user.name}`)
      setTimeout(() => setSuccessMessage(null), 5000)
    } catch (err) {
      setErrorMessage(err.response.data.message)
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    productService.setToken(null)
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setSuccessMessage('Logged out successfully')
    setTimeout(() => setSuccessMessage(null), 5000)
  }

  const createProduct = async (event) => {
    event.preventDefault()
    try {
      const addedProduct = await productService
        .create(newProduct)
        .then((returnedProducts) => {
          setProducts(products.concat(returnedProducts))
        })
      setNewProduct({ name: '', price: '' })
      setSuccessMessage(`Product '${addedProduct.name}' added successfully`)
      setTimeout(() => setSuccessMessage(null), 5000)
    } catch (err) {
      setErrorMessage(err.response.data.message)
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  return (
    <>
      {user && <Navbar user={user} handleLogout={handleLogout} />}

      <div className='max-w-4xl mx-auto mt-16 p-6 bg-gray-50 rounded-xl shadow-md'>
        <h1 className='text-center text-2xl font-bold text-gray-700 mb-4'>
          Products Dashboard
        </h1>

        <Notification message={errorMessage} type='error' />
        <Notification message={successMessage} type='success' />

        {!user && (
          <div className='mt-6'>
            <LoginForm
              ref={loginFormRef}
              handleLogin={handleLogin}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
          </div>
        )}

        {user && (
          <div className='mt-6'>
            <ProductForm
              createProduct={createProduct}
              newProduct={newProduct}
              setNewProduct={setNewProduct}
            />
          </div>
        )}
      </div>
      {user && (
        <div className='mt-6 bg-white rounded-xl shadow-lg p-6 max-w-5xl mx-auto'>
          <h2 className='text-xl font-semibold text-gray-700 mb-4'>
            Product List
          </h2>
          <ProductsDashboard
            products={products}
            onProductDeleted={handleProductDeleted}
          />
        </div>
      )}
    </>
  )
}

export default App
