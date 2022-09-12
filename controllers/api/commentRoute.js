const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//GET comments
router.get('/', (req, res) => {
    Comment.findAll({})
    .then(commentData => res.json(commentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

//CREATE comments

//DELETE comments