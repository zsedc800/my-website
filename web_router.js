const express = require('express');
const { sign, site, articleController } = require('./controller');
const { auth } = require('./middleware');
const apiAuth = require('./api/v1/middleware');
const router = express.Router();

router.get('/', site.index);

router.get('/signup', sign.showSignup);
router.post('/signup', sign.signup);

router.get('/signin', sign.showLogin);
router.post('/signin', sign.login);

router.get('/post',[apiAuth.tryAuth, auth.adminRequired], articleController.show);

module.exports = router;