import { test, after } from 'node:test';
import { api, loginAndGetToken } from '../setup/auth.setup.js';
import { createProduct } from './helpers/product.helper.js';
import assert from 'assert';
import mongoose from 'mongoose';

let token;

test('Login to get token', async () => {
  token = await loginAndGetToken();
});

test('DELETE /product/:id success', async () => {
  const product = await createProduct(token);
  const res = await api.delete(`/api/product/${product._id}`)
                       .set('Authorization', `Bearer ${token}`)
                       .expect(200);
  assert.strictEqual(res.body.status, true);
});

test('DELETE /product/:id invalid id fails', async () => {
  const res = await api.delete('/api/product/123')
                       .set('Authorization', `Bearer ${token}`)
                       .expect(400);
  assert.strictEqual(res.body.success, false);
  assert.ok(res.body.message.includes('"id" length must be 24 characters long'));
});

test('DELETE /product/:id not exist', async () => {
  const fakeId = '694f03a9bbfb744691b9c0ef';
  const res = await api.delete(`/api/product/${fakeId}`)
                       .set('Authorization', `Bearer ${token}`)
                       .expect(404);
  assert.strictEqual(res.body.status, 404);
  assert.strictEqual(res.body.success, false);
  assert.strictEqual(res.body.data, null);
});

// Close DB
after(async () => {
  await mongoose.connection.close();
});
