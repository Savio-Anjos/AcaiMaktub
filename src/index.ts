import express, { Request, Response } from "express";
import mongoose from "mongoose";

const app = express();
const port = 3333;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  mongoose.connect(
    "mongodb+srv://juniorctba1:nVe6gI9fXLtWnFR1@acaiteria-api.5zoj8qn.mongodb.net/?retryWrites=true&w=majority&appName=acaiteria-api"
  );
  console.log(`App listening at http://localhost:${port}`);
});
