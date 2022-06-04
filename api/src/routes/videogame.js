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
    call1 = axios.get(`https://api.rawg.io/api/games?key=${DB_KEY}&page=2&page_size=40`);
    call2 = axios.get(`https://api.rawg.io/api/games?key=${DB_KEY}&page=3&page_size=20`);        
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
            image: videogame.background_image,
            name: videogame.name,
            genres: videogame.genres.map(gener => gener.name)
        }
    })
    let filteredVideoApic1 = c1.data.results.map((videogame) =>{
        return {
            image: videogame.background_image,
            name: videogame.name,
            genres: videogame.genres.map(gener => gener.name)
        }
    })
    let filteredVideoApic2 = c2.data.results.map((videogame) =>{
        return {
            image: videogame.background_image,
            name: videogame.name,
            genres: videogame.genres.map(gener => gener.name)
        }
    })
    let filteredVideoDB = gameDB.map(db => {
        return{
            image: db.background_image,
            name: db.name,
            genres: db.genres.map(gener => gener.name)
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
    res.send(allVideoGame)
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
                image: videogame.background_image,
                name: videogame.name,
                genres: videogame.genres.map(gener => gener.name)
            }
        })
        let filteredVideoDB = videogameDB.map(db => {
            return{
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
        const {id,name,description,release_date, rating} = req.body;
        const newVideogame = await Videogame.create({
            name,
            description,
            release_date, 
            rating
        })
        res.status(201).send(newVideogame)
    } catch(error){
        next(error)
    }
})

router.post('/:videogameId/genre/:genreId', async(req,res,next) =>{
    try{
        const {videogameId,genreId} = req.params;
        const videogame = await Videogame.findByPk(videogameId);
        await videogame.addGenre(genreId);
        res.send(200)
    } catch(error){
        next(error)
    }
})

router.post('/:videogameId/platform/:platformId', async(req,res,next) =>{
    try{
        const {videogameId,platformId} = req.params;
        const videogame = await Videogame.findByPk(videogameId);
        await videogame.addPlatform(platformId);
        res.send(200)
    } catch(error){
        next(error)
    }
})
/*
router.put('/', (req,res,next) =>{
    res.send('soy put /videogame')
})

router.delete('/', (req,res,next) =>{
    res.send('soy delete /videogame')
})
*/

module.exports = router;