const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'please Enter your email'],
        unique: [true, 'Check '],
        validate: [isEmail, 'please  Enter a valid Email']
    },
    password: {
        type: String,
        required: [true, 'please Enter your passord'],
        minlenght: [6, 'password must be mor then 6 cherecter '],
    }
});
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email })
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error("Incorrect Password");

    }
    throw Error("User is not exist");

}
const User = mongoose.model('authuser', userSchema);
module.exports = User;

