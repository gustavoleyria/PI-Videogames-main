const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {Op} = require('sequelize')
const axios = require('axios')
const {Videogame,Genre,Platform} = require('../db');
const {DB_KEY} = process.env;
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', (req,res,next) =>{
    videogameApi = axios.get(`https://api.rawg.io/api/games?key=${DB_KEY}&page_size=40`);
    call1 = axios.get(`https://api.rawg.io/api/games?key=${DB_KEY}&page=5&page_size=40`);
    call2 = axios.get(`https://api.rawg.io/api/games?key=${DB_KEY}&page=8&page_size=20`);        
    videogameDB = Videogame.findAll({
        include: [
            {
              model: Genre,
              through: {
                attributes: [],
              },
            },
            {
              model: Platform,
              through: {
                attributes: [],
              },
            },
          ],
        //include: Platform
        //raw: true,
        //nest: true
    });
Promise.all([
    videogameApi,
    call1,
    call2,
   videogameDB
])
.then((result) =>{
   // console.log(result.length)
    let [gameApi,c1, c2,gameDB] = result;
    //gameApi.concat(c1,c2)
    let filteredVideoApi = gameApi.data.results.map((videogame) =>{
        return {
            id: videogame.id,
            image: videogame.background_image,
            name: videogame.name,
            genres: videogame.genres.map(gener => gener.name),
            rating: videogame.rating
        }
    })
    let filteredVideoApic1 = c1.data.results.map((videogame) =>{
        return {
            id: videogame.id,
            image: videogame.background_image,
            name: videogame.name,
            genres: videogame.genres.map(gener => gener.name),
            rating: videogame.rating
        }
    })
    let filteredVideoApic2 = c2.data.results.map((videogame) =>{
        return {
            id: videogame.id,
            image: videogame.background_image,
            name: videogame.name,
            genres: videogame.genres.map(gener => gener.name),
            rating: videogame.rating
        }
    })
    let filteredVideoDB = gameDB.map(db => {
        return{
            id: db.id,
            image: db.background_image,
            name: db.name,
            genres: db.genres.map(gener => gener.name),
            rating: db.rating
        }
    })
    //console.log(gameApi.data);
    //console.log(gameDB);
    let allVideoGame = [...filteredVideoApi, ...filteredVideoApic1, ...filteredVideoApic2, ...filteredVideoDB];
    /*allVideoGame.sort(function (a, b) {
        // A va primero que B
        if (a.name < b.name)
            return -1;
        // B va primero que A
        else if (a.name > b.name)
            return 1;
        // A y B son iguales
        else 
            return 0;
    });*/ 
    console.log(allVideoGame.length)    
    res.status(200).send(allVideoGame)
})
.catch(error => next(error))
})


router.get('/search',async(req,res,next) =>{
    let name = req.query.search;
    try{
        let videogameApi = await axios.get(`https://api.rawg.io/api/games?key=${DB_KEY}&search=${name}&page_size=15`)
        let videogameDB = await Videogame.findAll({
            include: [
                {
                  model: Genre,
                  through: {
                    attributes: [],
                  },
                },
                {
                  model: Platform,
                  through: {
                    attributes: [],
                  },
                },
              ],
            where:{
                name:{
                    [Op.iLike]: "%" + name + "%"
                }
            },
            order:[
                ['name', 'ASC']
            ]
        });
        let filteredVideoApi = videogameApi.data.results.map((videogame) =>{
            return {
                id: videogame.id,
                image: videogame.background_image,
                name: videogame.name,
                genres: videogame.genres.map(gener => gener.name)
            }
        })
        let filteredVideoDB = videogameDB.map(db => {
            return{
                id: db.id,
                image: db.background_image,
                name: db.name,
                genres: db.genres.map(gener => gener.name)
            }
        })
        let info = [...filteredVideoDB, ...filteredVideoApi]
        if(info.length === 0 || name === ''){
            return res.send('No hay coincidencias')
        }
        if(info.length > 15) {
            let info15 = [];
            for(let i = 0; i < 15; i++){
                info15.push(info[i])
            }
            return res.send(info15)
        }
        res.send(info)
    }catch(error){
       next(error)
    }
})


router.get('/:id',async(req,res,next) =>{
    const {id} = req.params;
    let videogame;
    //res.send(id)
    if(typeof id === 'string' && id.length > 7){
        videogame2 = await Videogame.findByPk(id,{
            include: [Genre,Platform]
        })
        videogame = {
            id: videogame2.id,
            image: videogame2.background_image,
            name: videogame2.name,
            genres: videogame2.genres.map(gener => gener.name),
            description: videogame2.description,
            release_date: videogame2.release_date,
            rating: videogame2.rating,
            platforms: videogame2.platforms.map((platf) => platf.name)
        }
    }else{
        let videogame2 = await axios.get(`https://api.rawg.io/api/games/${id}?key=${DB_KEY}`)
        videogame = {
            id: videogame2.id,
            image: videogame2.data.background_image,
            name: videogame2.data.name,
            genres: videogame2.data.genres.map(gener => gener.name),
            description: videogame2.data.description,
            release_date: videogame2.data.released,
            rating: videogame2.data.rating,
            platforms: videogame2.data.platforms.map((platf) => platf.platform.name)
        }
    }
    res.send(videogame)
})


router.post('/', async(req,res,next) =>{
    try{
        const {id,name,description,release_date, rating, platforms, genres, background_image } = req.body;
        const newVideogame = await Videogame.create({
            name,
            description,
            release_date, 
            rating,
            background_image
        })
console.log(genres)

        if (newVideogame && genres && Array.isArray(genres))
                {
                    const promisesGenres = genres.map(async (g) => {
                        let genre = await Genre.findAll({
                            where: { name: g}
                            });
                        
                        return newVideogame.setGenres(genre); //la asociacion la realiza como objeto
                        });  

                    await Promise.all(promisesGenres); 
                } // end-if


        if (newVideogame && platforms && Array.isArray(platforms))
        {
            const promisesPlatforms = platforms.map(async (platf) => {
                let platform = await Platform.findAll({
                    where: { name: platf}
                    });
                
                return newVideogame.setPlatforms(platform); //la asociacion la realiza como objeto
                });  

            await Promise.all(promisesPlatforms); 
        } // end-if




        res.status(201).send(newVideogame)
    } catch(error){
        next(error)
    }
})


router.put('/update/:id', async (req, res, next) => {
    const { id } = req.params
    try {
      const gameDB = await Videogame.findByPk(id,{
        include: [Genre,Platform]
    }) ;
  
      // filter req.body to remove empty values
       const { body } = req;
       const filteredBody = Object.keys(body).reduce((resultObj, key) => {
         if(body[key] != ''){
           resultObj[key] = body[key];
           console.log(resultObj[key])
           console.log(body[key])
         }
         return resultObj;
       }, {});
  
       const updatedGameBD = await gameDB.update(filteredBody);
      
       if (updatedGameBD && body.genres && Array.isArray(body.genres))
                {
                    const promisesGenres = body.genres.map(async (g) => {
                        let genre = await Genre.findAll({
                            where: { name: g}
                            });
                        
                        return updatedGameBD.setGenres(genre); //la asociacion la realiza como objeto
                        });  

                    await Promise.all(promisesGenres); 
                } // end-if


        if (updatedGameBD && body.platforms && Array.isArray(body.platforms))
        {
            const promisesPlatforms = body.platforms.map(async (platf) => {
                let platform = await Platform.findAll({
                    where: { name: platf}
                    });
                
                return updatedGameBD.setPlatforms(platform); //la asociacion la realiza como objeto
                });  

            await Promise.all(promisesPlatforms); 
        } // end-if

      res.send(updatedGameBD)
    } catch (error) {
      next(error)
    }
  })

router.delete('/delete/:id', async(req,res,next) =>{
    try{
        const {id} = req.params;
        const gameDB = await Videogame.findByPk(id,{
            include: [Genre,Platform]
        }) 
        const info = gameDB;

        if (gameDB) {
            Videogame.destroy({
                where: {
                    id: id
                }
            })
            return res.send(console.log(`El juego ${info.name} fue borrado correctamente`))
    } 
        }catch(error){
        next(error)
    }
   
})


module.exports = router;