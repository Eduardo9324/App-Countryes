const axios = require('axios');
const express = require('express');
const router = express.Router();
/* const { createId } = require("../functions/createId.js"); */
const { Country, Activity } = require("../db");
const { Op } = require('sequelize');

// esta funcion envia un error
function throwErrors(msj) {
  throw msj
};


// funcion trae countries de la API
/* creo una funcion que trae toda la informacion de la API y la mapeo con los 
datos de mi interes  */
/* const getAllCountries = async () => {
  const getCountries = await axios.get("https://restcountries.com/v3/all");
  const infoCountries = await getCountries.data.map((e) => {
    return {
      id: e.cca3,
      name: e.name.common,
      image: e.flags[1],
      continent: "Continent:" + " " + e.continents[0], //el [0] elimina las { continent }
      capital: "Capital:" + " " + e.capital?.[0],
      subregion: e.subregion,
      area: parseInt(e.area) + " " + "km2",
      population: parseInt(e.population),
    };
  })
  return infoCountries;
}; */

// funciopn trae countries de la DB
/* const getDbCountries = async () => {
  return await Country.findAll({
    include: {
      model: Activity,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
}; */

/* const getAll = async () => {
  const infoApi = await getAllCountries();
  const dbInfo = await getDbCountries();
  const totalInfo = infoApi.concat(dbInfo);
  return totalInfo;
}; */

/* router.get('/', async (req, res, next) => {
  const { name } = req.query;

  const countiesTotal = await getAll();

  if (name) {
    const nameCountries = await countiesTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))

    nameCountries.length ? res.status(200).json(nameCountries) :
      res.status(404).send('Pais no encontrado.');
    
  } else {
    res.status(200).json(countiesTotal);
  }
}); */



// ESTE CODIGO FUNCIONAA
router.get('/', async (req, res, next) => {
  const dataExterna = await axios.get("https://restcountries.com/v3/all");
  const { name } = req.query;

  try {
    const infoCountries = await dataExterna.data.map((e) => ({
      id: e.cca3,
      name: e.name.common,
      image: e.flags[1],
      continent: "Continent:" + " " + e.continents[0], //el [0] elimina las { continent }
      capital: "Capital:" + " " + e.capital?.[0],
      subregion: e.subregion,
      area: parseInt(e.area) + " " + "km2",
      population: parseInt(e.population),
    }));
    /* res.status(200).json({ infoCountries }); */

    const dataInterna = await Country.findAll({
      include: [
        {
          model: Activity,
          /* attributes: ["name"],
      through: {
        attributes: [],
      } */
        },
      ],
    });
    !dataInterna.length && Country.bulkCreate(infoCountries);

  } catch (error) {
    next(error)
  }
  
  try {
    if (!name) {
      try {
        const response = await Country.findAll({
          include: [
            {
              model: Activity,
              /* attributes: ["name"],
              through: {
                attributes: [],
              }, */
            },
          ],
        });
        response ? res.json(response) : throwErrors('Error, informacion no encontrada.')

      } catch (error) {
        next(error)
      }
    } else {
      try {
        const ress = await Country.findAll({
          where: {
            name: {
              [Op.iLike]: `%${name}%`,
            },
          },
          include: {
            model: Activity,
          },
        });

        ress.length ? res.json(ress) : throwErrors("Error");

      } catch (error) {
        next(error)
      }
    }
  } catch (error) {
    next(error)
  }
});


/* router.get("/search", async (req, res, next) => {
  const { name } = req.query; */

  /* if (name) {
    const fullNameCoun = await Country.findAll({
      where: {
        name: {
          [Op.iLike]: "%" + name + "%",
        },
      },
      include: {
        model: Sightseeing,
      },
      order: [["name", "ASC"]],
    });
    res.status(200).json(fullNameCoun);
  } else {
    res.status(404).send('Pais no encontrado.');
  } */

/*     if (!fullNameCoun.length) {
    throw new Error("Pais no encontrado.");
  } else {
    res.status(200).json(fullNameCoun);
  } */

  /* if (!name) {
    try {
      const nameCountry = await Country.findAll({
        include: {
          model: Sightseeing,
        },
      });
      if (!nameCountry) {
        res.status(404).send("No se encuentra ningun pais con ese nombre.");
      } else {
        res.status(200).json(nameCountry);
      }
    } catch (error) {
      next(error);
    }
  } else {
    try {
      const fullNameCoun = await Country.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
        include: {
          model: Sightseeing,
        },
        order: [["name", "ASC"]],
      });
      if (!fullNameCoun.length) {
        throw new Error("Pais no encontrado.");
      } else {
        res.status(200).json(fullNameCoun);
      }
    } catch (error) {
      next(error);
    }
  }
}); */

// DAVID
/* router.get("/search", async (req, res) => {
  const { name } = req.query;
  if (name) {
    let DBData = await Country.findAll({
      include: Sightseeing,
      where: {
        name: {
          [Op.iLike]: "%" + name + "%",
        },
      },
      order: [["name", "ASC"]],
    });
    res.status(200).json(DBData);
  }
}); */

// RURA ID
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const counId = await Country.findByPk(id, {
      include: [
        {
          model: Activity,
          attributes: ["name" /* , "difficulty", "duration", "season" */],
          through: {
            attributes: [],
          },
        },
      ],
    });
    
    if (counId) {
      res.status(200).json(counId);
    } else {
      throw new Error("No se encuentra pais por id.");
    }
    
  } catch (error) {
    next(error);
  }
});

module.exports = router;