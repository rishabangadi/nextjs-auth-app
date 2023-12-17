import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB connected successfully!");
    });

    connection.on("error", (err) => {
      console.log("MongoDB connected error: ", err);
      process.exit(1);
    });
  } catch (error) {
    console.log("Error in database connection\n", error);
  }
}
