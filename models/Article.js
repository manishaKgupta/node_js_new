'use strict';

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const slug = require('slug');

const ArticleSchema = new mongoose.Schema({
    slug: {
        type: String,
        lowercase: true,
        unique: true
    },
    title: String,
    description: String,
    body: String,
    favoritesCount: {
        type: Number,
        default: 0
    },
    tagList: [{type: String}],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, {timestamps: true});

ArticleSchema.plugin(uniqueValidator, {message: 'is already taken'});

mongoose.model('Article', ArticleSchema);
