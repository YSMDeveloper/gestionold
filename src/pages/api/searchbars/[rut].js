import { dbConnect } from "../../../utils/mongoose";
import Customer from "../../../models/Customer";

dbConnect();

export default async (req, res) => {
  const { method, body, query } = req;

  switch (method) {
    case "GET":
      try {
        const { rut } = query;
        const pattern = new RegExp(rut, "i"); // construye una expresión regular que busca el patrón de búsqueda en cualquier parte del campo rut
        const customers = await Customer.find({ rut: pattern });
        if (!customers) return res.status(404).json({ msg: "Customers not found" });
        return res.status(200).json(customers);
      } catch (error) {
        return res.status(500).json({ msg: error.message });
      }
    default:
      return res.status(400).json({ msg: "This method is not supported" });
  }
};