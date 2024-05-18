const router = require('express').Router();
const express = require('express');
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/user.controller.js');

router.use(express.json());

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/create/users', createUser);
router.put('/edit/users/:id', updateUser);
router.delete('/delete/users/:id', deleteUser);

module.exports = router;