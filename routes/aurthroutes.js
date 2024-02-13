const { Router } = require('express');
const auth = require('../Controller/aurthcontroller');
const router = Router();
router.get('/singup', auth.singup_get);
router.post('/singup', auth.singup_post);
router.get('/login', auth.login_get);
router.post('/login', auth.login_Post);
router.get('/logout', auth.logout_get);


module.exports=router;
