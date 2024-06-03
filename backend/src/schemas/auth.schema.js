const { z } = require('zod');

// Esquema para el registro de usuarios
const registerSchema = z.object({
    num_doc: z.string().min(1).max(50),
    nombre: z.string().min(1).max(50),
    apellido: z.string().min(1).max(50),
    fecha_de_nacimiento: z.date(),
    generos_id: z.number().int(),
    email: z.string().email(),
    password: z.string().min(1).max(100),
    contacto_emergencia_num_doc: z.string().min(1).max(50),
    unidades_medida_id: z.number().int(),
});

// Esquema para el inicio de sesión
const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1).max(100),
});

module.exports = { registerSchema, loginSchema };
