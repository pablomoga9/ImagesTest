const routes = require('express').Router();
const userController = require('../controllers/userControllers');

routes.post('/signup',userController.signup);
routes.post('/login',userController.login);
routes.get('/getUser',userController.getUser);
routes.get('/logout',userController.logout);
routes.get('/checkUser',userController.checkUser);

module.exports = routes;