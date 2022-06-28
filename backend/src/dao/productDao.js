import Product from '../models/productModel.js';

export const createProducts = async(params) =>{
    return await Product.create(params.body);
}

export const getProducts = async() =>{
    return Product.find();
}

export const searchProducts = async(params)=>{
    return Product.findById(params);
}

export const getCount = async() =>{
    return Product.countDocuments();
}

export const updateProducts = async(id, params)=>{
    return Product.findByIdAndUpdate(id,params,{
        new:true,
        runValidators:true
    });
}

export const deleteProducts = async(param) =>{
    return await param.remove();
}
export const getProductById = async(param) =>{
    return await Product.findById(param);
}

export default getProducts;
