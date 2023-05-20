const { API_KEY } = process.env;
const axios = require('axios');
const { Dog, Temperament} = require('../db');

const getBeedFromAPI = async() => {
    const {data} = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    
    if (!data) throw new Error (`Error! status: ${data.status}`);

    const breedsFromApi = await data.map(e => (
        {
            id: e.id,
            name: e.name,
            height: e.height.metric!='NaN' ? e.height.metric : e.height.imperial,
            weight: e.weight.metric.includes('NaN') ? "1 - 99" : e.weight.metric,
            life_span: e.life_span,
            image_url: e.image.url, 
            temperament: e.temperament
    }))
     return breedsFromApi; 
}
const getBfDB = async() => {

const db = await Dog.findAll({
    include: {
     model: Temperament,
         attributes: ['name'],
            through: {
                attributes: []
                }
            }
        })
        return db; 
    };

const getAllBreeds = async () => {
    let breedApi = await getBeedFromAPI(); 
    let  breedBd = await getBfDB(); 
    let allbreeds = breedApi.concat(breedBd);
    return allbreeds; 
}

const getBreedbyID = async (id) => {
    let allBreeds = await getAllBreeds();
    let foundBreed = allBreeds.filter(breed => breed.id == id);
    return foundBreed;
}
const getTemperaments = async () => {
    const temperamentsDB = await Temperament.findAll();
    if(temperamentsDB.length > 0){
        return temperamentsDB;
    }

    const {data} = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    
    if (!data) throw new Error (`Error! status: ${data.status}`);
    
    let TemperamentsAPI = [];
    
    data.forEach(el => {
        el.temperament ? TemperamentsAPI.push(el.temperament.split(', ')) : ""
    });
    
    const TemperamentList = [...new Set(TemperamentsAPI.flat())];
    const TemperamentList_Object = TemperamentList.map(e => ({name: e}))
    
    Temperament.bulkCreate(TemperamentList_Object);
    
    const temperaments = await Temperament.findAll();
    return temperaments;
}




module.exports = { 
    getBeedFromAPI,
    getAllBreeds,
    getBreedbyID,
    getBfDB, 
 getTemperaments,
}