const { Dog, Temperaments } = require("../DB");
const { Sequelize } = require('sequelize');


async function postDogs(req, res) {
    const { name, height, weight, life_span, temperament, breed_group } = req.body;
    try {
        //Comprobamos que esten todos los datos
        if (!name || !height || !weight || !life_span || !temperament || !breed_group) {
            return res.status(402).send({ message: 'Missing data' });
        }
        //Comprobamos que no nos manden tipos de datos que no corresponden
        if (typeof name !== 'string') {
            return res.status(402).send({ message: 'Error on name' });
        }
        if (typeof height !== 'string') {
            return res.status(402).send({ message: 'Error on height' });
        }
        if (typeof weight !== 'string') {
            return res.status(402).send({ message: 'Error on weight' });
        }
        if (typeof life_span !== 'string') {
            return res.status(402).send({ message: 'Error on life_span' });
        }
        if (typeof breed_group !== 'string') {
            return res.status(402).send({ message: 'Error on breed_group' });
        }
        if (!Array.isArray(temperament)) {
            return res.status(402).send({ message: 'Error on temperament' });
        }

        //Comprobamos que el nombre del perro no este en uso
        const nameMinusculas = name.toLowerCase().trim();
        const findDog = await Dog.findOne({ where: { name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), nameMinusculas) } });
        if (findDog) {
            return res.status(200).json({ message: "The dog's name already exists" });
        }

        //Creamnos el perro si no existe
        const createDog = await Dog.create({
            name, height, weight, life_span, temperament, breed_group
        });

        //Creamos una tabla intemedia que guarde la relacion entre los tipos de temperamentos y el id del perro
        await Promise.all(temperament.map(async (temp) => {
            try {
                //Creamos el temperamento que le ponen al perro si es que no existen ya
                const [temper, created] = await Temperaments.findOrCreate({
                    where: { name: temp },
                    defaults: { name: temp }
                });
                if (temper) {
                    await createDog.addTemperaments(temper);
                }
            } catch (error) {
                console.error("Error al guardar el temperamento:", error);
                res.status(400).send({ message: "Error al guardar el temperamento" });
            }
        }));

        return res.status(201).json({ message: "Data saved successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = postDogs;