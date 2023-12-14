const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const validateMongoDbId = require('../utils/validateMongodbld');
const User = require('../models/useModel');


//[post] create Product
const createProduct= asyncHandler(async(req, res)=>{
    try{
        if(req.body.title){
            req.body.slug = slugify(req.body.title);
        }
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    }catch(error){
        throw new Error(error);
    }
});

//[put] update Product
const updateProduct = asyncHandler(async(req, res) =>{
    const id = req.Product;
    validateMongoDbId(id);
    try {
        if(req.body.title){
            req.body.slug = slugify(req.body.title);
        }
        const updateProduct = await Product.findOneAndUpdate( {id} , req.body,{
            new: true,
        });
        res.json(updateProduct);
    } catch (error) {
        throw new Error(error);        
    }
});

// [DELETE] delete Product
const deleteProduct = asyncHandler(async(req, res) =>{
    const id = req.Product;
    validateMongoDbId(id);
    try {
        const deleteProduct = await Product.findByIdAndDelete(id);
        res.json(deleteProduct);
    } catch (error) {
        throw new Error(error);        
    }
});

// Get a product
const getaProduct = asyncHandler(async(req, res)=>{
    const {id} = req.params;
    validateMongoDbId(id);
    try{
        const findProduct = await Product.findById(id).populate("color");
        res.json(findProduct)
    }catch(error){
        throw new Error(error)
    }
})

// get all product
const getAllProduct = asyncHandler(async(req, res) =>{
    try{
        // filtering
        const queryObj = {...req.query };
        const excludeFields = ["page", "sort", "limit", "fields"];
        excludeFields.forEach((el)=> delete queryObj[el]);
        console.log(queryObj);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        

        let query = Product.find( JSON.parse(queryStr));

        // soring

        if(req.query.sort){
            const sortBy = req.query.sort.split(",").join(" ");
            query = query.sort(sortBy);
        }else{
            query =query.sort("-createdAt");
        }

        // limiting the fields

        if(req.query.fields){
            const fields = req.query.fields.split(",").join(" ");
            query = query.select(fields);

        }else{
            query = query.select('-__v')
        }

        // pagination
        const page = req.query.page;
        const limit = req.query.limit;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);
        if(req.query.page){
            const productCount = await Product.countDocuments();
            if(skip >= productCount) throw new Error('This Page does not exists');
        };
        console.log(page, limit, skip);

        const product = await query;
        res.json(product);
    }catch(error){
        throw new Error(error)
    }
});

//
const addToWishList = asyncHandler(async(req, res) =>{
    const {_id} = req.user;
    const {prodId} = req.body;
    try {
        const user = await User.findById(_id);
        const alreadyadded = user.wishlist.find((id) => id.toString() === prodId);
        if(alreadyadded){
            let user = await User.findByIdAndUpdate(_id,{
                $pull: {wishlist: prodId},
            },{
                new: true,
            });
            res.json(user);
        }else{
            let user = await User.findByIdAndUpdate(_id,{
                $push: {wishlist: prodId},
            },{
                new: true,
            });
            res.json(user);
        }
    } catch (error) {
        throw new Error(error);
    }
});

// 
const rating = asyncHandler(async(req, res)=>{
    const {_id} = req.user;
    const {star, prodId, comment} = req.body;
    try {
        const product = await Product.findById(prodId);
        let alreadyRated = product.ratings.find(
            (userId) => userId.postedby.toString() === _id.toString()
        );
        if(alreadyRated){
            const updateRating = await Product.updateOne({
                ratings: {$elemMatch: alreadyRated}
            },{
                $set:{"ratings.$.star": star, "ratings.$.comment": comment}
            },{
                new: true
            });
        }else{
            const rateProduct = await Product.findByIdAndUpdate(prodId,{
                $push: {
                    ratings: {
                        star: star,
                        comment: comment,
                        postedby: _id,
                    },
                },
            },{
                new: true,
            });
        }
        const getallRatings = await Product.findById(prodId);
        let totalRating = getallRatings.ratings.length;
        let ratingsum = getallRatings.ratings
            .map((item) => item.star)
            .reduce((prev, curr) =>prev + curr, 0);
        let actuaRanting = Math.round(ratingsum/totalRating);
        let finalproduct =  await Product.findByIdAndUpdate(
            prodId,
            {
            totalrating: actuaRanting,
            },{
                new: true
            }
        );
        res.json(finalproduct);
    } catch (error) {
        throw new Error(error);
    }
});



module.exports= 
{ 
    createProduct, 
    getaProduct,
    getAllProduct,
    updateProduct,
    deleteProduct,
    addToWishList,
    rating,
};