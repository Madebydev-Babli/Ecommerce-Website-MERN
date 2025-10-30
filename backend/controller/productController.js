const Product = require("../model/productModel");
const uploadOnCloudinary = require("../config/cloudinary");

const addProduct = async (req,res) => {
    try {
        const {name,description,price,category,subCategory,sizes,bestSeller} = req.body;

    const image1 = req.files.image1 ? await uploadOnCloudinary(req.files.image1[0].path) : null;
    const image2 = req.files.image2 ? await uploadOnCloudinary(req.files.image2[0].path) : null;
    const image3 = req.files.image3 ? await uploadOnCloudinary(req.files.image3[0].path) : null;
    const image4 = req.files.image4 ? await uploadOnCloudinary(req.files.image4[0].path) : null;

    let productData = {
        name,
        description,
        price:Number(price),
        category,
        subCategory,
        sizes:JSON.parse(sizes),
        bestSeller: bestSeller === "true" ? true : false,
        date:Date.now(),
        image1,
        image2,
        image3,
        image4
    }

    const product = await Product.create(productData);
    
    return res.status(201).json({ success: true, product });
    } catch (error) {
        console.log("AddProduct error");
        return res.status(500).json({ success: false, message: `AddProduct error${error}` });
    }
}



const listProduct = async (req,res) => {
    try {
        const product = await Product.find({});
        return res.status(201).json(product);
    } catch (error) {
        console.log("ListProduct error")
        return res.status(500).json({message:`ListProduct error${error}`})
    }
}


const removeProduct = async (req,res) => {
    try {
        let { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        return res.status(201).json(product);
    } catch (error) {
        console.log("RemoveProduct error")
        return res.status(500).json({message:`RemoveProduct error${error}`}) 
    }
}
module.exports = { addProduct, listProduct, removeProduct };


