import { test, after } from 'node:test';
import { api, loginAndGetToken } from '../setup/auth.setup.js';
import assert from 'assert';
import mongoose from 'mongoose';

let token;

test('Login to get token', async () => {
  token = await loginAndGetToken();
});

test('POST /product creates a product', async () => {
  const newProduct = { name: `Test Product ${Date.now()}`, description: 'A test product', price: 100, stock: 10 };
  const res = await api.post('/api/product')
                       .set('Authorization', `Bearer ${token}`)
                       .send(newProduct)
                       .expect(201);
  assert.strictEqual(res.body.status, true);
  assert.strictEqual(res.body.data.name, newProduct.name);
});

test('POST /product without name fails', async () => {
  const invalidProduct = { price: 50 };
  const res = await api.post('/api/product')
                       .set('Authorization', `Bearer ${token}`)
                       .send(invalidProduct)
                       .expect(400);
  assert.strictEqual(res.body.success, false);
  assert.ok(res.body.message.includes('"name" is required'));
});

after(async () => {
  await mongoose.connection.close();
});
