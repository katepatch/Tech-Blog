const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//GET all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['[password]'] }
    })
    .then(userData => res.json(userData))
    .catch(err => {
        res.status(500).json(err);
        console.log(err);
    });
});

//GET single user

//UPDATE user

//CREATE user

//LOGIN user

//LOGOUT user

//DELETE user