import { test } from 'node:test';
import assert from 'assert';
import { api, loginAndGetToken } from './setup/auth.setup.js';
import { createCategory } from './helpers/category.helper.js';

test('GET /category/:id success', async () => {
  const token = await loginAndGetToken();
  const category = await createCategory(token);

  const res = await api
    .get(`/api/category/${category._id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(200);

  assert(res.body.status === true);
});

test('GET /category/:id invalid id', async () => {
  const token = await loginAndGetToken();

  await api
    .get('/api/category/123')
    .set('Authorization', `Bearer ${token}`)
    .expect(400);
});

test('GET /category/:id invalid id', async () => {
  const token = await loginAndGetToken();

  await api
    .get('/api/category/123')
    .set('Authorization', `Bearer ${token}`)
    .expect(400);
});

test('GET /category/:id returns 404 for non-existent but valid id', async () => {
  const token = await loginAndGetToken();
  const nonExistentId = '694f03a9bbfb744691b9c0ef'; 

  const response = await api
    .get(`/api/category/${nonExistentId}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(404);
  const body = response.body;
  assert(body.status=== 404, 'Status should be 404');
  assert(body.success=== false, 'Success should be false');
  assert(body.message==='Category not exist', 'Message should indicate category does not exist');
  assert(body.data=== null, 'Data should be null');
});

test('GET /category/:id fails without authentication token', async () => {
  const nonExistentId = '694f03a9bbfb744691b9c0ef'; 
    await api
    .get(`/api/category/${nonExistentId}`)
    .expect(401);
});