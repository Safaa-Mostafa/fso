import { test } from 'node:test';
import assert from 'assert';
import { api, loginAndGetToken } from './setup/auth.setup.js';

test('POST /category success', async () => {
  const token = await loginAndGetToken();

  const res = await api
    .post('/api/category')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: `create-${Date.now()}`,
      description: 'Electronics'
    })
    .expect(201);

  assert(res.body.status === true);
});

test('POST /category without name fails', async () => {
  const token = await loginAndGetToken();

  await api
    .post('/api/category')
    .set('Authorization', `Bearer ${token}`)
    .send({})
    .expect(400);
});
