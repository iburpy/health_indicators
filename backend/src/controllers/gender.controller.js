const { Genero } = require('../model/models.js');

const getGenders = async (req, res) => {
    try {
        const genders = await Genero.findAll();
        if (!genders || genders.length === 0) {
            res.status(404).send(
                JSON.stringify({ error: 'No se encontraron géneros.' },
                null, 2
            ));
        }
        else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(
                JSON.stringify({ found: genders.length, genders },
                null, 2
            ));
        }
    } catch (error) {
        console.log(`Error al encontrar géneros: ${error}`);
    }
}

const getGenderById = async (req, res) => {
    try {
        const gender = await Genero.findByPk(req.params.id);
        if(!gender || gender.length === 0) {
            res.status(404).json({ error: 'Género no encontrado' });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(
                JSON.stringify({ found: gender },
                null, 2
            ))
        }
    } catch (error) {
        res.status(400).json({ error: error });
        console.log(`Error al encontrar género ${req.params.id}: ${error}`);	
    }
}

const createGender = async (req, res) => {
    try {
        const gender = await Genero.create(req.body);
        if(!gender) {
            res.status(404).json({ error: 'Género no creado' });
        }
        else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(
                JSON.stringify({ created: { gender } },
                null, 2
            ));
        }
    } catch (error) {
        res.status(400).json({ error: error });
        console.log(`Error al crear género: ${error}`);
    }
}

const updateGender = async (req, res) => {
    try {
        const gender = await Genero.update(req.body, {
            where: { id: req.params.id }
        });
        if(!gender || gender.length === 0) {
            res.status(404).json({ error: 'Género no actualizado' });
        }
        else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(
                JSON.stringify({ updated: { gender } },
                null, 2
            ));
        }
    } catch (error) {
        res.status(400).json({ error: error });
        console.log(`Error al actualizar el registro ${req.params.id}: ${error}`);
    }
}

const deleteGender = async (req, res) => {
    try {
        const g_body = req.body;
        const gender = await Genero.destroy({
            where: { id: req.params.id }
        });
        if(!gender || gender.length === 0) {
            res.status(404).json({ error: 'Género no eliminado' });
        }
        else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(
                JSON.stringify({ is_deleted: gender, g_body },
                null, 2
            ));
        }
    } catch (error) {
        res.status(400).json({ error: error });
        console.log(`Error al borrar el registro ${req.params.id}: ${error}`);
    }
}

module.exports = {
    getGenders,
    getGenderById,
    createGender,
    updateGender,
    deleteGender
};
