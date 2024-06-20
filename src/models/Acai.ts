import { Schema, Document } from "mongoose";
import mongoose from "../database";

export interface IAcai extends Document {
  name: string;
  description: string;
  size: string;
  price: number;
}

// Esquema (Schema) Mongoose para o modelo Acai
const AcaiSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  size: { type: String, required: true },
  price: { type: Number, required: true },
});

// Modelo Mongoose para Acai
const Acai = mongoose.model<IAcai>("Acai", AcaiSchema);

export default Acai;
