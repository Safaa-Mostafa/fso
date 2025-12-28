import { test, after } from 'node:test';
import { api, loginAndGetToken } from '../setup/auth.setup.js';
import { createProduct } from './helpers/product.helper.js';
import assert from 'assert';
import mongoose from 'mongoose';

let token;

test('Login to get token', async () => {
  token = await loginAndGetToken();
});

test('GET /product returns list of products', async () => {
  const res = await api.get('/api/product').expect(200);
  assert(Array.isArray(res.body.data), 'Data should be an array');
});

test('GET /product/:id returns product', async () => {
  const product = await createProduct(token);
  const res = await api.get(`/api/product/${product._id}`)
                       .set('Authorization', `Bearer ${token}`)
                       .expect(200);
  assert.strictEqual(res.body.status, true);
  assert.strictEqual(res.body.data._id, product._id);
});

test('GET /product/:id with invalid id fails', async () => {
  const res = await api.get('/api/product/123')
                       .set('Authorization', `Bearer ${token}`)
                       .expect(400);
  assert.strictEqual(res.body.success, false);
  assert.ok(res.body.message.includes('"id" length must be 24 characters long'));
});

// Close DB
after(async () => {
  await mongoose.connection.close();
});
