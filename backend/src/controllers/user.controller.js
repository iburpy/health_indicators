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
            email, password,
            contacto_emergencia, unidades_medida
        } = req.body;

        // Check for required fields
        if (!num_doc || !nombre || !apellido || !fecha_de_nacimiento || !generos_id || !email || !password || !contacto_emergencia || !unidades_medida) {
            return res.status(400).json(['Todos los campos son obligatorios']);
        }

        // Check if the user already exists
        const userFound = await Usuario.findOne({ where: { email } });
        if (userFound) return res.status(400).json({ message: "Este correo ya está en uso." });

        // Hash the password
        const hashPass = await bcrypt.hash(password, saltRounds);

        // Check for valid gender
        const gender = await Genero.findByPk(generos_id);
        if (!gender) return res.status(404).json(['Género no encontrado']);

        // Handle emergency contact: Create the emergency contact directly
        let emergencyContact = await ContactoEmergencia.create(contacto_emergencia);

        // Handle units of measurement: Create the units of measurement directly
        let unitsConfig = await UnidadMedida.create(unidades_medida);

        // Create the new user
        const newUser = new Usuario({
            num_doc, nombre, apellido,
            fecha_de_nacimiento, generos_id,
            email, password: hashPass,
            contacto_emergencia_num_doc: emergencyContact.num_doc,
            unidades_medida_id: unitsConfig.id
        });
        const savedUser = await newUser.save();

        // Create the token
        const token = await createAccessToken({ num_doc: savedUser.num_doc });
        res.cookie('token', token, { httpOnly: true });

        // Build the response
        const response = {
            num_doc: newUser.num_doc,
            nombre_completo: `${newUser.nombre} ${newUser.apellido}`,
            genero: gender.genero,
            email: newUser.email,
            fecha_de_nacimiento: newUser.fecha_de_nacimiento,
            contacto_emergencia: {
                num_doc: newUser.contacto_emergencia_num_doc,
                nombre_completo: emergencyContact.nombre_completo,
                email: emergencyContact.email,
                telefono: emergencyContact.telefono,
                genero: gender.nombre,
                parentesco: emergencyContact.parentesco,
                relacion: emergencyContact.relacion,
            },
            unidades_medida: unitsConfig
        };

        res.status(201).json({ response, token });
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

// Bueno el error está en la autenticación
// Cuando un user se registra y logea, se crea un token.
// Pero cuando un user logeado quiere ver su perfil mediante GET /profile
// La cookie se borra y no permite ver el perfil.

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
    editProfile
   // deleteProfile   
}