const {test,after} = require('node:test');
const supertest = require('supertest');
const app = require('../app');
const { default: mongoose } = require('mongoose');
const api = supertest(app);
test('products are returned as json',async()=>{
    await api.get('/products').expect(200).expect('Content-Type',/application\/json/)
})

test('products are created success as json',async()=>{
    await api.post('/product').expect(200).expect('Content-Type',/application\/json/)
})

test('products are deleted success as json',async()=>{
    await api.delete('/product').expect(200).expect('Content-Type',/application\/json/)
})

after (async ()=>{
    await mongoose.connection.close()
})