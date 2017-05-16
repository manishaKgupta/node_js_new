const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.models('User');
const auth = require('../auth');

router.param('username', (req, res, next, username) =>{
    User.findOne({username: username}).then((user) => {
        if (!user) {
            return res.sendStatus(404);
        }

        req.profile = user;

        return next();
    }).catch(next);
});

module.exports = router;
