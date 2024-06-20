import mongoose from "mongoose";

const dbUri =
  "mongodb+srv://juniorctba1:nVe6gI9fXLtWnFR1@acaiteria-api.5zoj8qn.mongodb.net/?retryWrites=true&w=majority&appName=acaiteria-api";

mongoose
  .connect(dbUri, {})
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
