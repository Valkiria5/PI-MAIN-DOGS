const { Router } = require('express');
const { getTemperaments } = require('../contoller');


const temperamentRoute = Router();

temperamentRoute.get('/', async (req, res) => {
    try {
        const temperaments = await getTemperaments();
        res.status(200).json(temperaments);
    }
    catch (error){
        res.status(404).json({error: error.message });
    }
    
})

module.exports = temperamentRoute;