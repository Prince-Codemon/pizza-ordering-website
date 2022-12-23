import dbConnect from "../../../util/mongo";
import Product from "../../../models/Product";

export default async function handler(req, res) {
  const { method, query:{id},cookies } = req;
  
  const token = cookies.token;
  
  dbConnect();
  if (method === "GET") {
    try {
      const product = await Product.findById(id)
      return res.status(200).json(product);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  if (method === "PUT") {
    // Update or create data in your database
     if (!token || token !== process.env.TOKEN) {
       return res
         .status(401)
         .json({ success: false, message: "Not authorized" });
     }
    try {
      const product = await Product.findByIdAndUpdate(req.body);
      return res.status(201).json({ success: true, data: product });
    } catch (error) {
      res.status(500).json(error.message);
    }
  } 
  if (method === "DELETE") {
    // Update or create data in your database
     if (!token || token !== process.env.TOKEN) {
       return res
         .status(401)
         .json({ success: false, message: "Not authorized" });
     }
    
    try {
      const product = await Product.deleteOne({ _id: id });
      return res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}
