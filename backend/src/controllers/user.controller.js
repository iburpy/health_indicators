const JWT_SECRET = require('../libs/token.config.js');
const saltRounds = 10;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createAccessToken } = require('../libs/jwt.js');

const { 
    Usuario,
    Genero,
    ContactoEmergencia,
    UnidadMedida 
} = require('../model/models.js');

const register = async (req, res) => {
    try {
        const {
            num_doc, nombre, apellido,
            fecha_de_nacimiento, generos_id,
            email, password, altura, peso,
            contacto_emergencia, unidades_medida
        } = req.body;
        
        const hashPass = await bcrypt.hash(password, saltRounds);
        if (
            !num_doc || !nombre || !apellido || 
            !fecha_de_nacimiento || !generos_id || 
            !email || !password || !altura || !peso || 
            !contacto_emergencia || !unidades_medida
        ) return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        
        const genero = await Genero.findByPk(generos_id);
        if (!genero) return res.status(404).json({ message: 'Género no encontrado' });
        
        let emergencyContact = await ContactoEmergencia.findByPk(contacto_emergencia.num_doc);
        if (!emergencyContact) emergencyContact = await ContactoEmergencia.create(contacto_emergencia);
        else await emergencyContact.update(contacto_emergencia);

        let unitsConfig = await UnidadMedida.findOne({
            where: {
                unidad_longitud: unidades_medida.unidad_longitud, unidad_peso: unidades_medida.unidad_peso,
                unidad_presion_arterial: unidades_medida.unidad_presion_arterial, unidad_glucosa_sangre: unidades_medida.unidad_glucosa_sangre,
                unidad_frecuencia_cardiaca: unidades_medida.unidad_frecuencia_cardiaca,unidad_temperatura: unidades_medida.unidad_temperatura
            }
        }); if (!unitsConfig) unitsConfig = await UnidadMedida.create(unidades_medida);
        
        const newUser = new Usuario({
            num_doc, nombre, apellido,
            fecha_de_nacimiento, generos_id,
            email, password: hashPass, altura, peso,
            contacto_emergencia_num_doc: emergencyContact.num_doc, unidades_medida_id: unitsConfig.id
        }); const savedUser = await newUser.save();

        const token = await createAccessToken({ num_doc: savedUser.num_doc });
        res.cookie('token', token);
        
        const response = {
            num_doc: newUser.num_doc,
            nombre_completo: `${newUser.nombre} ${newUser.apellido}`,
            genero: genero.genero, email: newUser.email,
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

        const userFound = await Usuario.findOne({ where: { email } });
        if (!userFound) return res.status(400).json({message: "User not found"});
        
        const passMatch = await bcrypt.compare(password, userFound.password);
        if (!passMatch) return res.status(401).json({ message: 'La contraseña es incorrecta.' });

        const token = await createAccessToken({ numDoc: userFound.num_doc, email: userFound.email });
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none' });

        res.json({num_doc: userFound.num_doc, email: userFound.email, token: token});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
// const testBcrypt = async () => {
//   const password = 'hola';
//   const hashedPassword = await bcrypt.hash(password, saltRounds);
//   console.log(`Original password: ${password}`);
//   console.log(`Hashed password: ${hashedPassword}`);

//   const isMatch = await bcrypt.compare(password, hashedPassword);
//   console.log(`Password comparison result: ${isMatch}`);
// };

const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.send(false);

  jwt.verify(token, process.env.JWT_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401);

    const userFound = await Usuario.findById(user.num_doc);
    if (!userFound) return res.sendStatus(401);

    return res.json({
      numDoc: userFound.num_doc,
      email: userFound.email,
      token: token
    });
  });
};

const logout = (req, res) => {
    try {
        res.cookie('token', "", { expires: new Date(0) });
        return res.sendStatus(200, 'Logged out');
    } catch (error) {
        console.log(`Error al cerrar sesión: ${error}`);
        res.status(500).json({ message: error.message });
    }
};

// const getUsers = async (req, res) => {
//     try {
//         const users = await Usuario.findAll();
//         if(!users || users.length === 0) {
//             res.status(404).send(
//                 JSON.stringify({ error: 'No se encontraron usuarios.' },
//                 null, 2
//             ));
//         } else {
//             res.setHeader('Content-Type', 'application/json');
//             res.status(200).send(
//                 JSON.stringify({ found: users.length, users },
//                 null, 2
//             ));
//         }
//     } catch (error) {
//         res.status(400).json({ error: error });
//         console.log(`Error al encontrar usuarios: ${error}`);
//     }
// }



const getProfile = async (req, res) => {
    try {
        const user = await Usuario.findByPk(req.user.num_doc);
        if(!user || user.length === 0) res.status(404).json({ error: 'Usuario no encontrado' });
        else {
            res.setHeader('Content-Type', 'application/json');
            console.log(user);
            res.status(200).send(JSON.stringify({ found: user }, null, 2))
        }
    } catch (error) {
        res.status(400).json({ error: error });
        console.log(`Error al encontrar usuario: ${error}`);
    }
};

const editProfile = async (req, res) => {
    try {
        const user = await Usuario.update(req.body, {
            where: { num_doc: req.user.num_doc }
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


//Esta parte se puede configurar para agregar la opcion de eliminar la cuenta del usuario
//const deleteProfile = async (req, res) => {
  /*  try {
        const user = await Usuario.destroy({
            where: { num_doc: req.user.num_doc }
        });
        if(!user || user.length === 0) {
            res.status(404).json({ error: 'Usuario no eliminado' });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(
                JSON.stringify({ is_deleted: user ? true : false },
                null, 2
            ));
        }
    } catch (error) {
        res.status(400).json({ error: error });
        console.log(`Error al borrar usuario: ${error}`);
    }
};*/

module.exports = {
    register,
    login,
    verifyToken,
    logout,
    // getUsers,
    getProfile,
    editProfile,
   // deleteProfile   
}