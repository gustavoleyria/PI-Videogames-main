const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios')
const{Platform} = require('../db');
const {DB_KEY} = process.env;

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/', async (req,res,next) =>{
    try{
        let platformDB = await Platform.findAll();
        res.send(platformDB)
    }catch(error){
        next(error)
    }
})


router.post('/', async (req,res,next) =>{
    try{
        let platformApi = await axios.get(`https://api.rawg.io/api/games?key=${DB_KEY}`)
        platformApi = platformApi.data.results
        platformApi = platformApi.map(plat => plat.platforms)
        let platformApi2 = [];
        for(let i = 0; i < platformApi.length; i++){
            let dato = platformApi[i].map(dato =>{
                return dato.platform.name
            })
            platformApi2.push([...dato])
        }
        let platformApi3 = [];
        for(let i = 0; i < platformApi2.length; i++){
            for(let j = 0; j < platformApi2.length; j++){
                if(platformApi2[i][j] != null)
                platformApi3.push(platformApi2[i][j])
            }
        }
        let platformApi4 = [...new Set(platformApi3)]
        let resultado = platformApi4.map(async(platformApi4)=>{
            await Platform.findOrCreate({
                where:{
                    name: platformApi4//.name
                    //image_background: allGenre.image
                },
                default:{
                    //id,
                    //image_background
                }
            })
        })
        platformApi4 = await Platform.findAll()
        res.json(platformApi4)
    }catch(error){
        next(error)
    }
})






module.exports = router;