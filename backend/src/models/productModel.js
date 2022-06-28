import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter product Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter product Description"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter product Price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please Enter Product Category"],
  },
  Stock: {
    type: Number,
    required: [true, "Please Enter product Stock"],
    maxLength: [4, "Stock cannot exceed 4 characters"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model("Product", productSchema);
















// import { sequelize } from '../config/config.js';
// import { Model, DataTypes } from 'sequelize';

// const config = {
//   tableName: 'products',
//   sequelize: sequelize,
//   // underscored: true,
//   timestamps: false,
// };

// class productModel extends Model {
//     name;
//     description;
//     price;
//     rating;
//     images;
//     category;
//     stock;
//     numOfReviews;
//     reviews;
// }
// productModel.init({
//     /* some other properties*/
//     name:{
//         type:DataTypes.STRING,
//         allowNull: false,
//     },
//     description:{
//         type:DataTypes.STRING,
//         allowNull: false,
//     },
//     price: {
//         type: DataTypes.NUMBER,
//         allowNull: false,
//         validate:{len:[0,8]}

//     },
//     rating:{
//         type: DataTypes.NUMBER,
//         default:0,
//     },
//     images:[
//         {
//             public_id:{
//                 type: DataTypes.STRING,
//                 required: true,
//             },
//             url:{
//                 type: DataTypes.STRING,
//                 required: true,
//             }
//         }
//     ],
//     category:{
//         type:DataTypes.STRING,
//         required:true,
//     },
//     stock:{
//         type: DataTypes.NUMBER,
//         required:true,
//         maxLength:[4],
//         default:1
//     },
//     numOfReviews:{
//         type:DataTypes.NUMBER,
//         default:0,
//     },
//     reviews:[
//         {
//             name:{
//                 type: DataTypes.STRING,
//                 required:true,
//             },
//             rating:{
//                 type:DataTypes.NUMBER,
//                 required:true,
//             },
//             comment:{
//                 type: DataTypes.STRING,
//                 required:true,
//             },
//         }
//     ],
//     createdAt:{
//         type: DataTypes.DATE,
//         default:DataTypes.DATE.now,

//     }
//   },
//   config
// );
// productModel.sync({ alter: false });
// export default productModel;
