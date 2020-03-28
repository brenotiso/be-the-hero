const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection.js');

describe('ONG', () => {
  beforeAll(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: 'APAD',
        email: 'contato@apad.com.br',
        whatsapp: '35999999999',
        city: 'Varginha',
        uf: 'mg',
      });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });

  it('should be able to list ONGs', async () => {
    const response = await request(app)
      .get('/ongs');

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'APAD',
          email: 'contato@apad.com.br',
          whatsapp: '35999999999',
          city: 'Varginha',
          uf: 'mg',
        }),
      ]),
    );
  });
});
