const { UnidadMedida } = require('../model/models.js');


const getUnits = async (req, res) => {
    try {
        const units = await UnidadMedida.findAll();
        if(!units || units.length === 0) {
            res.status(404).send(
                JSON.stringify({ error: 'Unidades de medida no encontradas' },
                null, 2
            ));
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(
                JSON.stringify({ found: units.length, units },
                null, 2
            ));
        }
    } catch (error) {
        res.status(400).json({ error: error });
        console.log(`Error al encontrar unidades de medida: ${error}`);
    }
};

const getUnitById = async (req, res) => {
    try {
        const unit = await UnidadMedida.findByPk(req.params.id);
        if(!unit || unit.length === 0) {
            res.status(404).json({ error: 'Unidad de medida no encontrada' });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(
                JSON.stringify({ found: unit },
                null, 2
            ))
        }
    } catch (error) {
        res.status(400).json({ error: error });
        console.log(`Error al encontrar la unidad de medida: ${error}`);
    }
};

const createUnit = async (req, res) => {
    try {
        const unit = await UnidadMedida.create(req.body);
        if(!unit) {
            res.status(404).json({ error: 'Unidad de medida no creada' });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(
                JSON.stringify({ created: { unit } },
                null, 2
            ));
        }
    } catch (error) {
        res.status(400).json({ error: error });
        console.log(`Error al crear la unidad de medida: ${error}`);
    }
};

const updateUnit = async (req, res) => {
    try {
        const unit = await UnidadMedida.update(req.body, {
            where: { id: req.params.id }
        });
        if(!unit || unit.length === 0) {
            res.status(404).json({ error: 'Unidad de medida no actualizada' });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(
                JSON.stringify({ updated: { unit } },
                null, 2
            ));
        }
    } catch (error) {
        res.status(400).json({ error: error });
        console.log(`Error al actualizar la unidad de medida: ${error}`);
    }
};

const deleteUnit = async (req, res) => {
    try {
        const u_body = req.body;
        const unit = await UnidadMedida.destroy({
            where: { id: req.params.id }
        });
        if(!unit || unit.length === 0) {
            res.status(404).json({ error: 'Unidad de medida no eliminada' });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(
                JSON.stringify({ is_deleted: unit, u_body },
                null, 2
            ));
        }
    } catch (error) {
        res.status(400).json({ error: error });
        console.log(`Error al borrar la unidad de medida: ${error}`);
    }
};

module.exports = { 
    getUnits,
    getUnitById,
    createUnit,
    updateUnit,
    deleteUnit
}