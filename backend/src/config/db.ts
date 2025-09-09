import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const connIns = await mongoose.connect(process.env.MONGODB_URL as string);
    console.log(
      `MongoDB!! Connected successfully HOST: ${connIns.connection.host}`
    );
  } catch (error) {
    console.error("Error!!! Connecting with MongoDB.", error);
    process.exit(1);
  }
};

export default connectDB;
