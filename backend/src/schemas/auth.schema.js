const { z } = require('zod');

const registerSchema = z.object({
    num_doc: z.string().min(1).max(50),
    nombre: z.string().min(1).max(50),
    apellido: z.string().min(1).max(50),
    generos_id: z.number().int(),
    email: z.string().email(),
    password: z.string().min(6).max(100)
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(100),
});

module.exports = { registerSchema, loginSchema };
