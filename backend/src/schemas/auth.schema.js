const { z } = require('zod');

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

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(100),
});

module.exports = { registerSchema, loginSchema };
