import { Router, Request, Response } from "express";
import mongoose from "../database";
import Acai, { IAcai } from "../models/Acai";

export const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
