const express = require('express');
const { getCurrentUser, getAdmin } = require('../controller/userController')
const isAuth = require('../middleware/isAuth');
const AdminAuth = require('../middleware/AdminAuth');
const userRoute = express.Router();


userRoute.get("/getcurrentuser",isAuth,getCurrentUser);
userRoute.get("/getadmin",AdminAuth,getAdmin);

module.exports = userRoute;