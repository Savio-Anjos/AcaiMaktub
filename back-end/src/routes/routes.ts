import { Router, Request, Response } from "express";
import Acai, { IAcai } from "../models/Acai";

export const router = Router();

router.get("/", (req: Request, res: Response) => {
  return res.send("Hello World!");
});

//Rota para criar um novo Açaí
router.post("/acai", async (req: Request, res: Response) => {
  try {
    const { name, description, size, price, imageUrl } = req.body;

    const newAcai: IAcai = new Acai({
      name,
      description,
      size,
      price,
      imageUrl,
    });

    const savedAcai = await newAcai.save();

    return res.status(201).json(savedAcai);
  } catch (error) {
    console.error("Error creating acai:", error);
    return res.status(500).json({ error: "Failed to create acai" });
  }
});

//Rota para listar todos os Açaís
router.get("/acai", async (req: Request, res: Response) => {
  const acais = await Acai.find();

  if (acais.length === 0) {
    return res.status(404).json({ error: "No acais found" });
  }

  return res.status(200).json(acais);
});

//Rota para atualizar um Açaí
router.put("/acai/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { name, description, size, price, imageUrl } = req.body;

    const updatedAcai = await Acai.findByIdAndUpdate(
      id,
      {
        name,
        description,
        size,
        price,
        imageUrl,
      },
      { new: true }
    );

    if (!updatedAcai) {
      return res.status(404).json({ error: "Acai not found" });
    }

    return res.status(200).json(updatedAcai);
  } catch (error) {
    console.error("Error updating aca:", error);
    return res.status(500).json({ error: "Failed to update acai" });
  }
});

//Rota para atualizar o preço do Açai
router.patch("/acai/:id/price", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { price } = req.body;

    if (!price) {
      return res.status(400).json({ error: "Price is required" });
    }

    const updatedAcai = await Acai.findByIdAndUpdate(
      id,
      {
        price,
      },
      { new: true }
    );

    if (!updatedAcai) {
      return res.status(404).json({ error: "Acai not found" });
    }

    return res.status(200).json({ updatedAcai });
  } catch (error) {
    console.error("Error updating acai:", error);
    return res.status(500).json({ error: "Failed to update acai" });
  }
});

//Rota para deletar um Açaí
router.delete("/acai/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedAcai = await Acai.findByIdAndDelete(id);

    if (!deletedAcai) {
      return res.status(404).json({ error: "Acai not found" });
    }

    return res.status(200).json({ message: "Acai deleted successfully" });
  } catch (error) {
    console.error("Error deleting acai:", error);

    return res.status(500).json({ error: "Failed to delete acai" });
  }
});
