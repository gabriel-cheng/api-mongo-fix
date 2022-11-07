const mongoose = require('mongoose');

const User = mongoose.model('User', {
    name: String,
    cel: Number,
    idade: Number,
});

module.exports = User;
