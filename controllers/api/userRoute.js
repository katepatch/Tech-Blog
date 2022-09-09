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
        if (!userData) {
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
router.put('/:id', withAuth, (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(userData => {
        if (!userData[0]) {
            res.status(404).json({ message: 'Can not find user with this id'});
            return;
        }
        res.json(userData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//CREATE user
router.post('/', (req, res) => {
    User.create({
        user_name: req.body.user_name,
        email: req.body.email,
        password: req.body.password
    })
    .then(userData => {
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.user_name = userData.user_name;
            req.session.loggedIn = true;

            res.json(userData);
        });
    });
});

//LOGIN user

//LOGOUT user

//DELETE user