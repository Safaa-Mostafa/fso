import { test } from 'node:test';
import assert from 'assert';
import { api, loginAndGetToken } from './setup/auth.setup.js';
import { createCategory } from './helpers/category.helper.js';


test('PUT /category/:id success', async () => {
  const token = await loginAndGetToken();
  const category = await createCategory(token);

  const res = await api
    .put(`/api/category/${category._id}`)
    .set('Authorization', `Bearer ${token}`)
    .send({ description: 'Updated' })
    .expect(200);

  assert(res.body.data.description === 'Updated');
});

test('PUT /category/:id fails without authentication token', async () => {
  const token = await loginAndGetToken();
  const category = await createCategory(token);
  await api
    .put(`/api/category/${category._id}`)
    .send({ description: 'Updated' })
    .expect(401);
});

test('PUT /category/:id fails with invalid id format', async () => {
  const token = await loginAndGetToken();

  const res = await api
    .put('/api/category/123') 
    .set('Authorization', `Bearer ${token}`)
    .send({ description: 'Updated' })
    .expect(400);

  assert(res.body.status ===  400);
  assert(res.body.success === false);
  assert(res.body.message.includes('Malformatted ID') === true);
});

test('PUT /category/:id fails for non-existent category', async () => {
  const token = await loginAndGetToken();
  const nonExistentId = '694c5d5a72efef4ec4bf7765'; 

  const res = await api
    .put(`/api/category/${nonExistentId}`)
    .set('Authorization', `Bearer ${token}`)
    .send({ description: 'Updated' })
    .expect(404);

  assert(res.body.status === 404);
  assert(res.body.success ===  false);
  assert(res.body.message ===  "Category not exist");
  assert(res.body.data === null);
});