import { test, after } from 'node:test';
import { api, loginAndGetToken } from '../setup/auth.setup.js';
import { createProduct } from './helpers/product.helper.js';
import assert from 'assert';
import mongoose from 'mongoose';

let token;

test('Login to get token', async () => {
  token = await loginAndGetToken();
});

test('PUT /product/:id updates product', async () => {
  const product = await createProduct(token);
  const res = await api.put(`/api/product/${product._id}`)
                       .set('Authorization', `Bearer ${token}`)
                       .send({ price: 200 })
                       .expect(200);
  assert.strictEqual(res.body.status, true);
  assert.strictEqual(res.body.data.price, 200);
});

test('PUT /product/:id non-existent fails', async () => {
  const fakeId = '694f03a9bbfb744691b9c0ef';
  const res = await api.put(`/api/product/${fakeId}`)
                       .set('Authorization', `Bearer ${token}`)
                       .send({ price: 200 })
                       .expect(404);
  assert.strictEqual(res.body.status, 404);
  assert.strictEqual(res.body.success, false);
  assert.strictEqual(res.body.data, null);
});

// Close DB
after(async () => {
  await mongoose.connection.close();
});
