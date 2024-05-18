const { MetaSalud } = require("../model/models.js");

const getHealthGoals = async (req, res) => {
    try {
        const healthGoals = await MetaSalud.findAll();
        if (!healthGoals || healthGoals.length === 0) {
            res.status(404).send(
                JSON.stringify({ error: 'Metas de salud no encontradas' },
                null, 2
            ));
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(
                JSON.stringify({ found: healthGoals.length, healthGoals },
                null, 2
            ));
        }
    } catch (error) {
        res.status(400).json({ error: error });
        console.log(`Error al encontrar metas de salud: ${error}`);
    }
}

const getHealthGoalById = async (req, res) => {
    try {
        const healthGoal = await MetaSalud.findByPk(req.params.id);
        if(!healthGoal || healthGoal.length === 0) {
            res.status(404).json({ error: 'Meta de salud no encontrada' });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(
                JSON.stringify({ found: healthGoal },
                null, 2
            ))
        }
    } catch (error) {
        res.status(400).json({ error: error });
        console.log(`Error al encontrar meta de salud: ${error}`);
    }
}

const createHealthGoal = async (req, res) => {
    try {
        const healthGoal = await MetaSalud.create(req.body);
        if(!healthGoal) {
            res.status(404).json({ error: 'Meta de salud no creada' });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(
                JSON.stringify({ created: { healthGoal } },
                null, 2
            ));
        }
    } catch (error) {
        res.status(400).json({ error: error });
        console.log(`Error al crear meta de salud: ${error}`);
    }
}

const updateHealthGoal = async (req, res) => {
    try {
        const healthGoal = await MetaSalud.update(req.body, {
            where: { id: req.params.id }
        });
        if(!healthGoal) {
            res.status(404).json({ error: 'Meta de salud no actualizada' });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(
                JSON.stringify({ updated: { healthGoal } },
                null, 2
            ));
        }
    } catch (error) {
        console.log(`Error al actualizar meta de salud: ${error}`);
    }
}

const deleteHealthGoal = async (req, res) => {
    try {
        const healthGoal = await MetaSalud.destroy({
            where: { id: req.params.id }
        });
        if(!healthGoal || healthGoal.length === 0) {
            res.status(404).json({ error: 'Meta de salud no eliminada' });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(
                JSON.stringify({ is_deleted: healthGoal },
                null, 2
            ));
        }
    } catch (error) {
        console.log(`Error al borrar meta de salud: ${error}`);
    }
}

module.exports = {
    getHealthGoals,
    getHealthGoalById,
    createHealthGoal,
    updateHealthGoal,
    deleteHealthGoal
};
