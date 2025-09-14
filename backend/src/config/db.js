import mongoose from "mongoose";

async function connectDB() {
  try {
    const connIns = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `MongoDB connected successfully! HOST: ${connIns.connection.host}`
    );
  } catch (error) {
    console.error(`ERROR!!! Connecting with MongoDB.`, error);
    process.exit(1);
  }
}

export default connectDB;
