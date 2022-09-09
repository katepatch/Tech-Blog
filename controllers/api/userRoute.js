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
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'post_text', 'created_at']
            },
            {
                model: Comment, 
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            }
        ]
    })
    .then(userData => {
        if(!userData) {
            res.status(404).json({ message: 'Can not find user'});
            return;
        }
        res.json(userData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//UPDATE user

//CREATE user

//LOGIN user

//LOGOUT user

//DELETE user