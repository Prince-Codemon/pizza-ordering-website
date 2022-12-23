import dbConnect from "../../../util/mongo";
import Order from "../../../models/Order";

const handler = async (req, res) => {
  const { method, query:{id} } = req;
    await dbConnect();

  if (method === "GET") {
    try {
      const order = await Order.findById(id);
        return res.status(201).json(order);
    } catch (error) {
        res.status(500).json(error.message);
        }
        
  }
  if (method === "PUT") {
    
    const { status } = JSON.parse(req.body);
    
    
    try {
      const order = await Order.findByIdAndUpdate(id,{$set:{"status":status}},{new: true})
      
      return res.status(200).json(order);
    } catch (error) {
      res.status(500).json(error.message);
    }

  }
  if (method === "DELETE") {
  }
};

export default handler