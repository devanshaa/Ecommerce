import dotenv from "dotenv";
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to the uncaught execption`);
  process.exit(1);
})

dotenv.config();
import mongoose from "mongoose";
const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ohhwauy.mongodb.net/?retryWrites=true&w=majority`;
const createConnection = ()=> mongoose
  .connect(URI, {
    //useCreateIndex: true,
    //useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((data) => {
    console.log("Successfully connected to database");
  });
export default {
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
};

export {createConnection};


// export default {
//   node_env: process.env.NODE_ENV,
//   app_port: process.env.PORT,
//   db: {
//     name: process.env.DB_NAME,
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_USER_PWD,
//     dialect: "mongoose",
//     dialectOptions: {
//       dateStrings: true,
//       typeCast: true,
//     },
//     timezone: "+05:30",
//   },
//   JWT_SECRET_KEY:process.env.JWT_SECRET_KEY,
// };
