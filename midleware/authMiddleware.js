const jwt = require('jsonwebtoken');
const User = require('../module/user');
const ruqireAuth = (req, res, next) => {
    console.log('start');
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, 'sal;dkfj;asldkfjl;sadkjflskadf', (err, decodedToken) => {
            if (err) {
                res.redirect('/login');
            }
            else {

                next();
            }
        });
    }
    else {
        res.redirect('/login');

    }

}
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, 'sal;dkfj;asldkfjl;sadkjflskadf', async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                next();


            }
            else {
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;

                next();

            }

        });

    }
    else {
        res.locals.user = null;
        next();

    }
}

module.exports ={
    ruqireAuth ,checkUser};
