const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios')
const{Genre} = require('../db');
const {DB_KEY} = process.env;

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', async(req,res,next) =>{
    try{
        //genreApi = axios.get(`https://api.rawg.io/api/genres?key=${DB_KEY}`);
        let genreDB = await Genre.findAll();
        res.send(genreDB)
        /*Promise.all([
           // genreApi,
            genreDB
        ])
        .then((result) =>{
            const [genreApi, genreDB] = result;
            /*let filteredGenreApi = genreApi.data.results.map((genre) =>{
                return {
                    image: genre.image_background,
                    name: genre.name
                }
            })
            let filteredGenreDB = genreDB.map(db => {
                return{
                    image: db.image_background,
                    name: db.name
                }
            })*/
            //console.log(genreApi.data);
            //console.log(genreDB);
            //let allGenre = [...filteredGenreApi, ...filteredGenreDB];
            /*allGenre.sort(function (a, b) {
                // A va primero que B
                if (a.name < b.name)
                    return -1;
                // B va primero que A
                else if (a.name > b.name)
                    return 1;
                // A y B son iguales
                else 
                    return 0;
            });
            res.send(allGenre)
        })*/
    }catch(error){
        next(error)
    }
})

router.post('/', async (req,res,next) =>{
    try{
        let genreApi = await axios.get(`https://api.rawg.io/api/genres?key=${DB_KEY}`);
        let allGenre = genreApi.data.results.map((genre) =>{
            return {
                id: genre.id,
                image: genre.image_background,
                name: genre.name
            }
        })
        let resultado = allGenre.map(async(allGenre)=>{
            await Genre.findOrCreate({
                where:{
                    name: allGenre.name,
                    image_background: allGenre.image
                },
                default:{
                    //id,
                    //image_background
                }
            })
        })
        
        allGenre = await Genre.findAll()
     
            res.send(allGenre)
    }catch(error){
        next(error)
    }

   /* const {name} = req.body;
    return Genre.create({name})
    .then((newGenre) =>{
        res.status(201).send(newGenre)
    })
    .catch((error) =>{
        next(error)
    })*/
})
/*
router.put('/', (req,res,next) =>{
    res.send('soy put /genre')
})

router.delete('/', (req,res,next) =>{
    res.send('soy delete /genre')
})
*/



module.exports = router;