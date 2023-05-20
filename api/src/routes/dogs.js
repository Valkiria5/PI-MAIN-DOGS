const { Router } = require('express');
const { Dog, Temperament } = require('../db');
const dogsRoute = Router();
const { getAllBreeds,getBreedbyID } = require('../contoller/index')

dogsRoute.get('/', async(req, res) => {
      const { name } = req.query
      let allbreeds = await getAllBreeds(); 
      if(name) {
               let breeds = await allbreeds.filter(el => 
                el.name.toLowerCase().includes(name.toLowerCase()));

               breeds.length ? 
               res.status(200).json(breeds) :
               res.status(404).json(`No hay razas con el nombre ${name}`);
               
          } else {
              res.status(200).json(allbreeds)
          } 
        });

    dogsRoute.get('/:id', async (req, res) => {
        const { id } = req.params;
        try{
            let breed = await getBreedbyID(id);
            if(breed && breed.length) return res.status(200).json(breed[0]);
            else return res.status(404).send(`No breed was found with the id: ${id}`)
            }
            catch (e) {
                res.status(404).json({error: e.message })
            }
    })
    
   
    dogsRoute.post('/', async (req,res)=>{
        const {name, image_url, heightMin, heightMax, weightMin, weightMax,  temperament, life_span, createdInDb} = req.body

        try {
            let newDog = await Dog.create({
                name,
                heightMin,
                heightMax,
                weightMin,
                weightMax,
                life_span,
                image_url,
                createdInDb : true,
            })
            
            let temperamentNewDog = await Temperament.findAll({
                 where: {name: temperament},
                 
            })
            
            newDog.addTemperament(temperamentNewDog)
            
            return res.status(200).json('Nuevo perro creado exitosamente')
            
        } catch (error) {
            res.status(404).json({error: error.message})
        }
        
    })
    
   



    

































module.exports = dogsRoute; 