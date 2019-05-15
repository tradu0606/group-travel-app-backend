const express = require('express');
const router = express.Router();
const userController = require('./UserControllers');

router.post('/login', userController.createLogin);
router.post('/sign-up', userController.createSignUp, (req, res, next) => {
    console.log(req.user)
});
router.get('/logout', userController.logout);
router.get('/:id', userController.show);
router.get('/test', userController.test)

module.exports = router;