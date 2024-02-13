const express = require('express');
const cookieparser = require('cookie-parser');
const mongoose = require('mongoose');
const authroute = require('./routes/aurthroutes');
const app = express();
const jwt = require('jsonwebtoken');
const User=require('./module/user');

const { ruqireAuth, checkUser } = require('./midleware/authMiddleware');
app.use(express.static('public'));
app.use(cookieparser());

app.use(express.json());
app.use(authroute);
app.set('view engine', 'ejs');

const dbURI = 'mongodb+srv://MILI7655UEI6YETU:g1kFRJ4blL9VHQmh@cluster0.km53z32.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI).then((result) => {
    app.listen(4000);
    console.log('server is runing in port number 4000');
}).catch((err) => {
    console.log(err);
});




app.get('*', checkUser);
app.get('/', (req, res) => {

    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'sal;dkfj;asldkfjl;sadkjflskadf', async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                res.render('login');

            }
            else {
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;

                res.render('dashboard');
            }
        });

    }

});
app.get('/dashboard', ruqireAuth, (req, res) => {

    res.render('dashboard');
});
