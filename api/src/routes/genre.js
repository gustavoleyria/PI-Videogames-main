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
        let genreDB = await Genre.findAll();
        res.send(genreDB)
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
})



module.exports = router;