import express from "express";
import { app } from "./server";
import { router } from "./routes/routes";

const port = 3333;

app.use("/", router);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
