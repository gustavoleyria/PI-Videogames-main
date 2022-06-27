/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);
const videogame = {
  id: "670b9562-b30d-52d5-b827-655787665501",
  name: 'Probando Test Route Get',
  description: 'Probar si el test fue creado',
  release_date: "1950-12-30",
  rating: 10,
  background_image: 'https://cdn.evalart.com/wp-content/uploads/2018/10/16pf.jpg',
  genres: [],
  platforms: []
  
};

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Videogame.sync({ force: false })
    .then(() => Videogame.create(videogame)));
  describe('GET /videogames', () => {
    it('should get 200', () =>
      agent.get('/videogames').expect(200)
    );
  });
});
