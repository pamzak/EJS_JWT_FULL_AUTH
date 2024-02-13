const User = require('../module/user');
const jwt = require('jsonwebtoken');

module.exports.singup_get = (req, res) => {
    res.render('singup');
}

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {
        email: '',
        password: ''
    }
    if (err.message) {
        errors.email = 'That email is not register';
        errors.password = 'That password is not register';
        return errors;

    }
    if (err.code === 11000) {
        errors.password = 'User is Already Exist';
        return errors;
    }
    if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });


    }
    return errors;
}


const maxAage = 1 * 60 * 60;

const createtoken = (id) => {
    return jwt.sign({ id }, 'sal;dkfj;asldkfjl;sadkjflskadf', { expiresIn: maxAage });
}

module.exports.singup_post = async (req, res) => {
    const { email, password } = req.body;


    try {

        const user = await User.create({
            email, password
        });


        if (user) {
            const token = createtoken(user._id);
            res.cookie('jwt', token, { httpOnly: true, maxAage: maxAage })
           
           
            res.status(201).json({ user: user._id });
        }

    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });


    }



}

module.exports.logout_get=(req,res)=>{
    res.cookie('jwt','',{maxAage:1});
    res.render('/');
}


module.exports.login_get = (req, res) => {
    res.render('login');
}




module.exports.login_Post = async (req, res) => {

    const { email, password } = req.body;
    try {
     
        const user = await User.login(email, password);
        const token = createtoken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAage: maxAage })
       
       
        res.status(200).json({ user: user._id })

    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });


    }


}
