const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.models('User');
const auth = require('../auth');

module.exports = router;
