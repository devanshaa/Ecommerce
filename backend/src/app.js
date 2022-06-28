import app from './server.js';
import dotenv from "dotenv";
dotenv.config();
const port = Number(process.env.PORT || 3001);
const server = app.listen(port, () => {
  console.log("Express server started on port: " + port);
});

//Unhandled Promise Rejection
process.on("unhandledRejection",err => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to unhandled promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});