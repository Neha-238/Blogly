import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect(`${process.env.MONGODB_URI}/blogly`)
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.error("Database connection error:", err.message);
    });
};

export default connectDB;
