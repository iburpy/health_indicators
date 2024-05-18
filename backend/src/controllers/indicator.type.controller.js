const { TipoIndicador } = require('../model/models.js');

const getIndicatorTypes = async (req, res) => {
    try {
        const indicatorTypes = await TipoIndicador.findAll();
        if (!indicatorTypes || indicatorTypes.length === 0) {
            res.status(404).send(
                JSON.stringify({ error: 'Tipos de indicadores no encontrados' },
                null, 2
            ));
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(
                JSON.stringify({ found: indicatorTypes.length, indicatorTypes },
                null, 2
            ));
        }
    } catch (error) {
        res.status(400).json({ error: error });
        console.log(`Error al encontrar tipos de indicadores: ${error}`);
    }
}

const getIndicatorTypeById = async (req, res) => {
    try {
        const indicatorType = await TipoIndicador.findByPk(req.params.id);
        if (!indicatorType || indicatorType.length === 0) {
            res.status(404).send(
                JSON.stringify({ error: 'Tipo de indicador no encontrado' },
                null, 2
            ));
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(
                JSON.stringify({ found: 1, indicatorType },
                null, 2
            ));
        }
    } catch (error) {
        res.status(400).json({ error: error });
        console.log(`Error al encontrar tipo de indicador: ${error}`);
    }
}

const createIndicatorType = async (req, res) => {
    try {
        const indicatorType = await TipoIndicador.create(req.body);
        if(!indicatorType) {
            res.status(404).json({ error: 'Tipo de indicador no creado' });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(
                JSON.stringify({ created: { indicatorType } },
                null, 2
            ));
        }
    } catch (error) {
        res.status(400).json({ error: error });
        console.log(`Error al crear tipo de indicador: ${error}`);
    }
}

const updateIndicatorType = async (req, res) => {
    try {
        const indicatorType = await TipoIndicador.update(req.body, {
        where: { id: req.params.id }
        });
        if(!indicatorType || indicatorType.length === 0) {
            res.status(404).json({ error: 'Tipo de indicador no actualizado' });
        } else {
            res.status(200).send(
                JSON.stringify({ updated: { indicatorType } },
                null, 2
            ));
        }
    } catch (error) {
        res.status(400).json({ error: error });
        console.log(`Error al actualizar tipo de indicador: ${error}`);	
    }
}

const deleteIndicatorType = async (req, res) => {
    try {    
        const indicatorType = await TipoIndicador.destroy({
        where: { id: req.params.id }
        });
        if(!indicatorType || indicatorType.length === 0) {
            res.status(404).json({ error: 'Tipo de indicador no eliminado' });
        } else {    
            res.status(200).send(
                JSON.stringify({ deleted: { indicatorType } },
                null, 2
            ));
        }
    } catch (error) {
        console.log(`Error al borrar tipo de indicador: ${error}`);
    }
}

module.exports = {
    getIndicatorTypes,
    getIndicatorTypeById,
    createIndicatorType,
    updateIndicatorType,
    deleteIndicatorType
}