import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductsDashboard from '../ProductList'
import productService from '../../services/productService'
import {vi } from 'vitest'

vi.mock('../../services/productService', () => ({
  default: {
    deleteProduct: vi.fn()
  }
}))

const mockProducts = [
  {
    _id: '1',
    name: 'Product 1',
    brand: 'Brand A',
    category: { name: 'Category A' },
    price: 100,
    discountPrice: 80,
    stock: 5,
    isActive: true,
    images: [{ url: 'image1.png' }]
  }
]

test('renders product content', () => {
  render(<ProductsDashboard products={mockProducts} onProductDeleted={vi.fn()} />)
  expect(screen.getByText('Product 1')).toBeInTheDocument()
  expect(screen.getByText('$80')).toBeInTheDocument()
})

test('delete button calls onProductDeleted', async () => {
  const mockHandler = vi.fn()
  vi.mocked(productService.deleteProduct).mockResolvedValueOnce({})

  render(<ProductsDashboard products={mockProducts} onProductDeleted={mockHandler} />)
  const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValueOnce(true)

  const user = userEvent.setup()
  await user.click(screen.getByText('Delete'))

  expect(confirmSpy).toHaveBeenCalled()
  expect(productService.deleteProduct).toHaveBeenCalledWith('1')
  expect(mockHandler).toHaveBeenCalledWith('1')
  confirmSpy.mockRestore()
})