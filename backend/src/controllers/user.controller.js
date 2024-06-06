const {JWT_SECRET} = require('../libs/token.config.js');
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

        if (!num_doc || !nombre || !apellido || !fecha_de_nacimiento || !generos_id || !email || !password || !contacto_emergencia || !unidades_medida) {
            return res.status(400).json(['Todos los campos son obligatorios']);
        }

        const userFound = await Usuario.findOne({ where: { email } });
        if (userFound) return res.status(400).json({ message: "Este correo ya está en uso." });

        const hashPass = await bcrypt.hash(password, saltRounds);

        const gender = await Genero.findByPk(generos_id);
        if (!gender) return res.status(404).json(['Género no encontrado']);

        let emergencyContact = await ContactoEmergencia.create(contacto_emergencia);
        let unitsConfig = await UnidadMedida.create(unidades_medida);

        const newUser = new Usuario({
            num_doc, nombre, apellido,
            fecha_de_nacimiento, generos_id,
            email, password: hashPass,
            contacto_emergencia_num_doc: emergencyContact.num_doc,
            unidades_medida_id: unitsConfig.id
        });
        const savedUser = await newUser.save();

        const token = await createAccessToken({ num_doc: savedUser.num_doc });
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none' });

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

        const token = await createAccessToken({ 
            numDoc: userFound.num_doc,
            email: userFound.email,
            name: `${userFound.nombre} ${userFound.apellido}`,
            birthdate: userFound.fecha_de_nacimiento,
        });
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none' });

        res.json({
            numDoc: userFound.num_doc,
            email: userFound.email,
            name: `${userFound.nombre} ${userFound.apellido}`,
            birthdate: userFound.fecha_de_nacimiento,
            token: token});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const verifyToken = async (req, res) => {
    const { token } = req.headers;
    console.log(req.headers.token)
    console.log(JWT_SECRET)
    if (!token) return res.status(401).json({message:"No Autorizado"});
    jwt.verify(token, JWT_SECRET, async (err, user) => {
        console.log(err)
      if (err) return res.status(401).json({message:"No Autorizado"});
      console.log({user})
      const UserFound = await Usuario.findOne({ where: { num_doc: user.numDoc } });
      if (!UserFound) return res.status(401).json({message:"No Autorizado"});
  
      res.status(200).send(JSON.stringify({ 
                    numDoc: UserFound.num_doc,
                    name: `${UserFound.nombre} ${UserFound.apellido}`,
                    email: UserFound.email,
                    birthdate: UserFound.fecha_de_nacimiento,
            }, null, 2))
    });
};

const logout = (req, res) => {
    try {
        res.cookie('token', "", { expires: new Date(0) });
        return res.status(200).json({ message: 'Logged out' });
    } catch (error) {
        console.log(`Error al cerrar sesión: ${error}`);
        res.status(500).json({ message: error.message });
    }
};

const getProfile = async (req, res) => {
    try {
        const user = await Usuario.findByPk(req.params.num_doc);
        const contacto_emergencia = await ContactoEmergencia.findOne({ where: { num_doc: user.contacto_emergencia_num_doc } });
        const genero = await Genero.findByPk(user.generos_id);
        const unidades_medida = await UnidadMedida.findByPk(user.unidades_medida_id);
        if(!user) res.status(404).json({ error: 'Usuario no encontrado' });
        else {
            res.setHeader('Content-Type', 'application/json');
            console.log(user);
            res.status(200).send(JSON.stringify({ 
                    numDoc: user.num_doc,
                    name: `${user.nombre} ${user.apellido}`,
                    email: user.email,
                    birthdate: user.fecha_de_nacimiento,
                    gender: genero.nombre,
                    emergencyContact: { contacto_emergencia },
                    unitsConfig: { unidades_medida }
            }, null, 2))
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(`Error al encontrar usuario: ${error}`);
    }
};

const editProfile = async (req, res) => {
    try {
        const [updated] = await Usuario.update(req.body, {
            where: { num_doc: req.user.num_doc }
        });
        if(updated === 0) {
            res.status(404).json({ error: 'Usuario no actualizado' });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({ message: 'Usuario actualizado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(`Error al actualizar usuario: ${error}`);
    }
};

module.exports = {
    register,
    login,
    verifyToken,
    logout,
    getProfile,
    editProfile
};