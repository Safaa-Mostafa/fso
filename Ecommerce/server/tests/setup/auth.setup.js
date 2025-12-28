import supertest from 'supertest';
import app from '../../../app.js';

export const api = supertest(app);

export const loginAndGetToken = async () => {
  const res = await api.post('/api/auth/login').send({
    email: 'noha@gmil.com',
    password: 'P@ssw0rd12'
  });

  return res.body.data.accessToken;
};
