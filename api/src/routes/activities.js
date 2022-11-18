/* const axios = require("axios"); */
const express = require("express");
const router = express.Router();
const { Country, Activity } = require("../db");

//Funcion para manejo de errores
/* const handleErrors = (err) => {
  throw err
} */

/* express.json es necesario para que se puedan interpretar los datos traidos por body */
/* router.use(express.json()); */


// Esta ruta crea una actividad en mi base de datos 
router.post('/', async (req, res, next) => {
  // paso los items del model por body
  try {
    const { name, difficulty, duration, season, createInDb, countries } = req.body;
    
    const newActiviti = await Activity.create({
      name,
      difficulty,
      duration,
      season,
      createInDb
    })
    
    //Si se desea o requiere se puede enviar la data creada
    /* !newActiviti.length ? res.json(newActiviti) : res.send("No se creo la info."); */

    /* countryDb es un arreglo de aobjetos, esto es equivalente a un SELECT * FROM Country; */
    /* const countryDb = await Country.findAll({
      where: {
        name: countries.map()
      }, */
      /*  include: {
        model: Activity,
      }, */
    /* }); */
/*     console.log(countryDb[0].id) */
    /* countryDb.length ? res.status(200).json(countryDb) : res.send('No hay data.') */
  /*  await newActiviti.addCountry(countryDb[0].id);
    res.send('Buen Trabajo !!!') */

    countries.map(async (e) => {
      const country = await Country.findOne({
        where: {
          name: e
        }
      })
      await newActiviti.addCountry(country.id);
    })
    
    

    /* !newActiviti.length
      ? res.status(200).json(newActiviti)
      : res.send("No se pudo crear la actividad."); */

} catch (error) {
    next(error);
  }
});


// Esta ruta obtiene todas las actividades creadas desde mi base de datos y los paises con esas actividades
router.get('/', async (req, res, next) => {
  /* const { name } = req.query; */

  try {
    const activities = await Activity.findAll({
      include: [
        {
          model: Country,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    activities.length
      ? res.status(200).json(activities)
      : res.send("No existe informacion.");
    
  } catch (error) {
    next(error)
  }
});


module.exports = router;