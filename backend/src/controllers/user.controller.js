const { 
    Usuario,
    Genero,
    ContactoEmergencia,
    UnidadMedida 
} = require('../model/models.js');

const bcrypt = require('bcrypt');
const saltRounds = 10;
const { createAccessToken } = require('../libs/jwt.js');

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

        
        const hashPass = await bcrypt.hash(password, saltRounds);

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
            password: hashPass,
            altura,
            peso,
            contacto_emergencia_num_doc: emergencyContact.num_doc,
            unidades_medida_id: unitsConfig.id
        });

        const token = await createAccessToken({ num_doc: newUser.num_doc });
        res.cookie('token', token);
        
        const response = {
            num_doc: newUser.num_doc,
            nombre_completo: `${newUser.nombre} ${newUser.apellido}`,
            genero: genero.nombre,
            email: newUser.email,
            password: newUser.password,
            fecha_de_nacimiento: newUser.fecha_de_nacimiento,
            altura: `${newUser.altura} ${unitsConfig.unidad_longitud}`,
            peso: `${newUser.peso} ${unitsConfig.unidad_peso}`,
            contacto_emergencia: {
                    num_doc: newUser.contacto_emergencia_num_doc,
                    nombre_completo: emergencyContact.nombre_completo,
                    email: emergencyContact.email,
                    fecha_de_nacimiento: emergencyContact.fecha_de_nacimiento,
                    genero: genero.nombre,
                    parentesco: emergencyContact.parentesco,
                    relacion: emergencyContact.relacion,
                    telefono: emergencyContact.telefono
                },
            unidades_medida: unitsConfig
            }

        res.status(201).send(JSON.stringify({response, token}), null, 2);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar el usuario', error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const userFound = await Usuario.findOne({ where: { email } });

        if (!userFound) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        console.log(`Password provided: ${password}`);
        console.log(`Password from the database: ${userFound.password}`);

        const isMatch = await bcrypt.compare(password, userFound.password);
        console.log(`Password comparison result: ${isMatch}`);

        const token = await createAccessToken({ num_doc: userFound.num_doc, email: userFound.email });
        res.cookie('token', token, { httpOnly: true, secure: true });

        if (!isMatch) {
            return res.status(400).json({
                message: "Passwords did not match",
                providedPassword: password,
                hashedPassword: userFound.password,
                token
            });
        }

        res.json({
            num_doc: userFound.num_doc,
            email: userFound.email,
            token
        })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const testBcrypt = async () => {
  const password = 'hola';
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  console.log(`Original password: ${password}`);
  console.log(`Hashed password: ${hashedPassword}`);

  const isMatch = await bcrypt.compare(password, hashedPassword);
  console.log(`Password comparison result: ${isMatch}`);
};

testBcrypt();

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
    register,
    login,
    getUsers,
    getProfile,
    editProfile,
    deleteProfile   
}