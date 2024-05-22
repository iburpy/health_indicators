const express = require('express');
const router = express.Router();

const {
    login,
    register,
    getUsers,
    getProfile,
    editProfile,
   // deleteProfile
} = require('../controllers/user.controller.js');

router.use(express.json());

router.post('/register', register);
router.post('/login', login);
router.get('/users', getUsers);
router.get('/profile/:id', getProfile);
router.put('/profile/edit/:id', editProfile);
//router.delete('/profile/delete/:id', deleteProfile);

module.exports = router;