import { test } from 'node:test';
import assert from 'assert';
import { api, loginAndGetToken } from './setup/auth.setup.js';
let token;

test('GET /category returns array', async () => {
  token = await loginAndGetToken();

  const res = await api
    .get('/api/category')
    .set('Authorization', `Bearer ${token}`)
    .expect(200);

  assert(Array.isArray(res.body.data));
});
