const { Usuario } = require('../model/models.js');

const getUsers = async (req, res) => {
    try {
        const users = await Usuario.findAll();
        if(!users || users.length === 0) {
            res.status(404).send(
                JSON.stringify({ error: 'No se encontraron usuarios.' },
                null, 2
            ));
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(
                JSON.stringify({ found: users.length, users },
                null, 2
            ));
        }
    } catch (error) {
        res.status(400).json({ error: error });
        console.log(`Error al encontrar usuarios: ${error}`);
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await Usuario.findByPk(req.params.num_doc);
        if(!user || user.length === 0) {
            res.status(404).json({ error: 'Usuario no encontrado' });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(
                JSON.stringify({ found: user },
                null, 2
            ))
        }
    } catch (error) {
        res.status(400).json({ error: error });
        console.log(`Error al encontrar usuario: ${error}`);
    }
};

const createUser = async (req, res) => {
    try {
        const user = await Usuario.create(req.body);
        if(!user) {
            res.status(404).json({ error: 'Usuario no creado' });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(
                JSON.stringify({ created: { user } },
                null, 2
            ));
        }
    } catch (error) {
        res.status(400).json({ error: error });
        console.log(`Error al crear usuario: ${error}`);
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await Usuario.update(req.body, {
            where: { num_doc: req.params.num_doc }
        });
        if(!user || user.length === 0) {
            res.status(404).json({ error: 'Usuario no actualizado' });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(
                JSON.stringify({ updated: { user } },
                null, 2
            ));
        }
    } catch (error) {
        res.status(400).json({ error: error });
        console.log(`Error al actualizar usuario: ${error}`);
    }
};

const deleteUser = async (req, res) => {
    try {
        const usr_body = req.body;
        const user = await Usuario.destroy({
            where: { num_doc: req.params.num_doc }
        });
        if(!user || user.length === 0) {
            res.status(404).json({ error: 'Usuario no eliminado' });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(
                JSON.stringify({ is_deleted: user, usr_body },
                null, 2
            ));
        }
    } catch (error) {
        res.status(400).json({ error: error });
        console.log(`Error al borrar usuario: ${error}`);
    }
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}