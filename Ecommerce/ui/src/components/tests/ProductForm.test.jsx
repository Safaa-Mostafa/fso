import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductForm from '../ProductForm'
import categoryService from '../../services/categoryService'
import { vi } from 'vitest'

vi.mock('../../services/categoryService', () => ({
  default: {
    getAll: vi.fn()
  }
}))

test('ProductForm input fields update and form submits', async () => {
  vi.mocked(categoryService.getAll).mockResolvedValue({ data: [] })

  const handleSubmit = vi.fn((e) => e.preventDefault())
  const setNewProduct = vi.fn()
  const newProduct = { name: '', slug: '', description: '', images: [], price: '', discountPrice: '', stock: 0, category: '', brand: '' }

  render(<ProductForm createProduct={handleSubmit} newProduct={newProduct} setNewProduct={setNewProduct} />)

  await waitFor(() => {
    expect(categoryService.getAll).toHaveBeenCalled()
  })

  const user = userEvent.setup()
  const nameInput = screen.getByPlaceholderText('Product Name')
  const submitButton = screen.getByText('Add Product')

  await user.type(nameInput, 'Test Product')
  await user.click(submitButton)

  expect(handleSubmit).toHaveBeenCalled()
})