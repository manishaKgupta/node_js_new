'use strict';

const router = require('express').Router();
const passport = require('passport');
const mongoose = require('mongoose');
const Article = mongoose.model('Article');
const User = mongoose.model('User');
const auth = require('../auth');

router.post('/', auth.required, (req, res, next) => {
    User.findById(req.payload.id).then(user => {
        if (!user) {
            return res.sendStatus(401);
        }

        const article = new Article(req.body.article);
        article.author = user;

        return article.save().then(_ => {
            console.log(article.author);
            return res.json({article: article.toJSONFor(user)});
        });
    }).catch(next);
});

module.exports = router;
