const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/mongopractice')
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((error) => {
        console.log('MongoDB connection failed:');
        console.log(error.message);
    });

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String
});

module.exports = mongoose.model('user', userSchema);