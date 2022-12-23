import dbConnect from "../../../util/mongo";
import Order from "../../../models/Order";

const handler = async (req, res) => {
  const { method } = req;
  await dbConnect();
  if (method === "GET") {
    try {
      const orders = await Order.find();
      return res.status(201).json(orders);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  if (method === "POST") {
    try {
      const order = await Order.create(req.body);
      return res.status(201).json(order);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
};

export default handler;
