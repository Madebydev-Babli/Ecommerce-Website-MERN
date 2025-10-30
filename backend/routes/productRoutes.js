const express = require('express');
const { addProduct, listProduct, removeProduct } = require('../controller/productController');
const upload = require('../middleware/multer');
const AdminAuth = require('../middleware/AdminAuth');
const productRoute = express.Router();

productRoute.post("/addproduct",upload.fields([
    {name:"image1",maxCount:1},
    {name:"image2",maxCount:1},
    {name:"image3",maxCount:1},
    {name:"image4",maxCount:1}
]),addProduct);

productRoute.get("/list",listProduct);
productRoute.post("/remove/:id",AdminAuth,removeProduct);


module.exports = productRoute;