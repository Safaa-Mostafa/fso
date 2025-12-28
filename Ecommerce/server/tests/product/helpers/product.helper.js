import { api } from '../../setup/auth.setup.js';

export const createProduct = async (token, overrides = {}) => {
  const defaultProduct = {
    name: `Test Product ${Date.now()}`,
    slug: `test-product-${Date.now()}`,
    description: 'A sample product for testing',
    price: 100,
    discountPrice: 90,
    stock: 10,
    category: 'Test Category',
    brand: 'Test Brand',
    images: [{ url: 'https://example.com/image.jpg', publicId: 'test123' }],
    ...overrides, 
  };

  const res = await api
    .post('/api/product')
    .set('Authorization', `Bearer ${token}`)
    .send(defaultProduct)
    .expect(201);

  return res.body.data; 
};
