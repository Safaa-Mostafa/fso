import { test } from 'node:test';
import { api, loginAndGetToken } from './setup/auth.setup.js';
import { createCategory } from './helpers/category.helper.js';
import { assert } from 'console';

test('DELETE /category/:id success', async () => {
  const token = await loginAndGetToken();
  const category = await createCategory(token);

  await api
    .delete(`/api/category/${category._id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(200);
});

test('DELETE /category/:id fails with invalid id', async () => {
  const token = await loginAndGetToken();

  const response = await api
    .delete(`/api/category/123`) 
    .set('Authorization', `Bearer ${token}`)
    .expect(400);

  const body = response.body;
  assert(body.status, 400, 'Status code should be 400');
  assert(body.success, false, 'Success should be false');
  assert(
    body.message.includes('"id" length must be 24 characters long'),
    'Error message should mention invalid id length'
  );
});

test('DELETE /category/:id returns 404 for non-existent category', async () => {
  const token = await loginAndGetToken();

  const fakeId = '694c5d5a72efef4ec4bf7799';

  const response = await api
    .delete(`/api/category/${fakeId}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(404);

  const body = response.body;

  assert(body.status, 404, 'Status should be 404');
  assert(body.success, false, 'Success should be false');
  assert(body.message, 'Category Not exist', 'Message should indicate category does not exist');
  assert(body.data, null, 'Data should be null');
});

test('DELETE /category/:id fails without authentication token', async () => {
  const token = await loginAndGetToken();
  const category = await createCategory(token);

  await api
    .delete(`/api/category/${category._id}`)
    .expect(401);
});