const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: false }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('Should throw an error if description is null', (done) => {
        Videogame.create({ name: 'Super Mario Bros' })
          .then(() => done(new Error('It requires a description')))
          .catch(() => done());
      });
      it('should create the Game if all required properties are ok', async () => {
        const videogame = await Videogame.create({
          id: "670b9562-b30d-52d5-b827-655787665500",
          name: 'Probando Test',
          description: 'Probar si el test fue creado',
          release_date: "1950-12-30",
          rating: 10,
          background_image: 'https://cdn.evalart.com/wp-content/uploads/2018/10/16pf.jpg',
          genres: [],
          platforms: []
        })
        expect(videogame.toJSON())./*toEqual*/equal({
          id: "670b9562-b30d-52d5-b827-655787665500",
          name: 'Probando Test',
          description: 'Probar si el test fue creado',
          release_date: "1950-12-30",
          rating: 10,
          background_image: 'https://cdn.evalart.com/wp-content/uploads/2018/10/16pf.jpg',
          genres: [],
          platforms: []
        });
      });
      xit('should work when its a valid name', () => {
        Recipe.create({ name: 'Super Mario Bros' });
      });
    });
  });
});
