import { api } from '../setup/auth.setup.js';

export const createCategory = async (token, data = {}) => {
  const category = {
    name: `test-cat-${Date.now()}`,
    ...data
  };

  const res = await api
    .post('/api/category')
    .set('Authorization', `Bearer ${token}`)
    .send(category);

  return res.body.data;
};
