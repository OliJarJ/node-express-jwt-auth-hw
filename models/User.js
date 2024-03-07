const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        unique: true,
        minlength: [6, 'Minimum password length is 6 characters']
    },
});

//fire a function after doc saved db
userSchema.post('save', function (doc, next) {
console.log('new user was created and saved', doc);
})

//fire a function before a doc is saved to db
userSchema.pre('save', async function (next) {
   console.log('user about to be created and save', this);
   const salt = await bcrypt.genSalt();
   this.password = await bcrypt.hash(this.password, salt)
   next();
});

const User = mongoose.model('user', userSchema); //must be singular

module.exports = User;