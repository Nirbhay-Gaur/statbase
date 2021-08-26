import mongoose from "mongoose";
// DB Config
export default async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URL || "mongodb://localhost/StatBase",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database is disconnected: " + error);
  }
};
