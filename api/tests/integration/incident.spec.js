const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection.js');

let ongId = null;

describe('Incident', () => {
  beforeAll(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a new incident', async () => {
    const responseOng = await request(app)
      .post('/ongs')
      .send({
        name: 'APAD',
        email: 'contato@apad.com.br',
        whatsapp: '35999999999',
        city: 'Varginha',
        uf: 'mg',
      });

    const { id } = responseOng.body;
    ongId = id;

    const response = await request(app)
      .post('/incidents')
      .set({ authorization: id })
      .send({
        title: 'Caso teste',
        description: 'Descrição teste',
        value: 10,
      });

    expect(response.body).toHaveProperty('id');
  });

  it('should be able to list an incident', async () => {
    const response = await request(app)
      .get('/incidents');

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'Caso teste',
          description: 'Descrição teste',
          value: 10,
        }),
      ]),
    );
  });

  it('should be able to delete an incident', async () => {
    const response = await request(app)
      .delete(`/incidents/${1}`)
      .set({ authorization: ongId });

    expect(response.status).toBe(204);
  });
});
