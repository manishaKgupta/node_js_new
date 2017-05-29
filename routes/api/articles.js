'use strict';

const router = require('express').Router();
const passport = require('passport');
const mongoose = require('mongoose');
const Article = mongoose.model('Article');
const User = mongoose.model('User');
const auth = require('../auth');

router.param(':article', (req, res, next, slug) => {
    Article.findOne({slug: slug})
        .populate('author')
        .then(article => {
            if (!article) {
                return res.sendStatus(404);
            }

            req.article = article;

            return next();
        })
        .catch(next);
});

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

router.get('/:article', auth.optional, (req, res, next) => {
    Promise.all([
        req.payload ? User.findById(req.payload.id) : null,
        req.article.populate('author').execPopulate()
    ]).then(results => {
        const user = results[0];

        return res.json({article: req.article.toJSONFor(user)});
    }).catch(next);
});

module.exports = router;
