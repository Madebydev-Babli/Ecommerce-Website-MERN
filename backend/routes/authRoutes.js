const express = require('express');
const Router = express.Router();
const { registration, login, logout, googleLogin, adminLogin } = require('../controller/authController');

Router.post('/registration',registration);
Router.post('/login',login);
Router.get('/logout',logout);
Router.post('/googlelogin',googleLogin);
Router.post('/adminlogin',adminLogin);



module.exports = Router;
