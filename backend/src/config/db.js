import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connIns = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `MongoDB Connected successfully! HOST: ${connIns.connection.host}`
    );
  } catch (error) {
    console.log("MongoDB Connection Errror", error);
    process.exit(1);
  }
};

export default connectDB;
