const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection.js');

describe('Session', () => {
  beforeAll(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to login into an ONG account', async () => {
    const responseOng = await request(app)
      .post('/ongs')
      .send({
        name: 'APAD',
        email: 'contato@apad.com.br',
        whatsapp: '35999999999',
        city: 'vga',
        uf: 'mg',
      });

    const { id } = responseOng.body;

    const response = await request(app)
      .post('/sessions')
      .send({
        id,
      });

    expect(response.body).toHaveProperty('name');
    expect(response.body.name).toBe('APAD');
  });
});
