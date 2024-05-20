const { Usuario, Genero, ContactoEmergencia, UnidadMedida } = require('../model/models.js'); // Asegúrate de importar tus modelos

const register = async (req, res) => {
    try {
        const {
            num_doc,
            nombre,
            apellido,
            fecha_de_nacimiento,
            generos_id,
            email,
            password,
            altura,
            peso,
            contacto_emergencia,
            unidades_medida
        } = req.body;

        console.log(req.body);

        // Validar que los campos requeridos estén presentes
        if (!num_doc || !nombre || !apellido || !fecha_de_nacimiento || !generos_id || !email || !password || !altura || !peso || !contacto_emergencia || !unidades_medida) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Verificar si el género existe
        const genero = await Genero.findByPk(generos_id);
        if (!genero) {
            return res.status(404).json({ message: 'Género no encontrado' });
        }

        // Crear o verificar el contacto de emergencia
        let emergencyContact = await ContactoEmergencia.findByPk(contacto_emergencia.num_doc);
        if (!emergencyContact) {
            emergencyContact = await ContactoEmergencia.create(contacto_emergencia);
        } else {
            await emergencyContact.update(contacto_emergencia);
        }

        // Crear o verificar la unidad de medida
        let unitsConfig = await UnidadMedida.findOne({
            where: {
                unidad_longitud: unidades_medida.unidad_longitud,
                unidad_peso: unidades_medida.unidad_peso,
                unidad_presion_arterial: unidades_medida.unidad_presion_arterial,
                unidad_glucosa_sangre: unidades_medida.unidad_glucosa_sangre,
                unidad_frecuencia_cardiaca: unidades_medida.unidad_frecuencia_cardiaca,
                unidad_temperatura: unidades_medida.unidad_temperatura
            }
        });

        if (!unitsConfig) {
            unitsConfig = await UnidadMedida.create(unidades_medida);
        }

        // Crear el usuario
        const newUser = await Usuario.create({
            num_doc,
            nombre,
            apellido,
            fecha_de_nacimiento,
            generos_id,
            email,
            password,
            altura,
            peso,
            contacto_emergencia_num_doc: emergencyContact.num_doc,
            unidades_medida_id: unitsConfig.id
        });

        res.status(201).send(JSON.stringify(newUser), null, 2);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar el usuario', error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Usuario.findOne({ where: { email, password } });
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const gender = await Genero.findByPk(user.generos_id);
        const emergencyContact = await ContactoEmergencia.findByPk(user.contacto_emergencia_num_doc);
        const unitsConfig = await UnidadMedida.findByPk(user.unidades_medida_id);

        const response = {
            num_doc: user.num_doc,
            nombre_completo: `${user.nombre} ${user.apellido}`,
            genero: gender.nombre,
            email: user.email,
            fecha_de_nacimiento: user.fecha_de_nacimiento,

            altura: `${user.altura} ${unitsConfig.unidad_longitud}`,
            peso: `${user.peso} ${unitsConfig.unidad_peso}`,

            contacto_emergencia: {
                num_doc: emergencyContact.num_doc,
                nombre: emergencyContact.nombre_completo,
                parentesco: emergencyContact.parentesco,
                genero: emergencyContact.nombre,
                telefono: emergencyContact.telefono
            },
            config_unidades: {
                longitud: unitsConfig.unidad_longitud,
                peso: unitsConfig.unidad_peso,
                presion_arterial: unitsConfig.unidad_presion_arterial,
                glucosa_sangre: unitsConfig.unidad_glucosa_sangre,
                frecuencia_cardiaca: unitsConfig.unidad_frecuencia_cardiaca,
                temperatura: unitsConfig.unidad_temperatura
            },
        };
        res.status(200).send(JSON.stringify({
            msg: 'Inicio de sesión exitoso',
            user: response
            }), null, 2);
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
    }
}

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

const getProfile = async (req, res) => {
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

const editProfile = async (req, res) => {
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

const deleteProfile = async (req, res) => {
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
    getProfile,
    editProfile,
    deleteProfile,
    register,
    login
}