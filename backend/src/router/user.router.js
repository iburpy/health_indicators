const express = require('express');
const router = express.Router();
const { authRequired } = require('../middlewares/token.validation.js');
const { registerSchema, loginSchema } = require('../schemas/auth.schema.js');
const { validate } = require('../middlewares/validator.middleware.js');

const {
    login,
    register,
    logout,
    verifyToken,
    getProfile,
    editProfile
} = require('../controllers/user.controller.js');
router.use(express.json());

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/logout', authRequired, logout);
router.get('/profile/:num_doc', authRequired, getProfile);
router.get('/verify', verifyToken);
router.put('/profile/edit/:num_doc', authRequired, editProfile);

module.exports = router;