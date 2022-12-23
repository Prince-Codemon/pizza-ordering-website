import dbConnect from "../../../util/mongo";
import Product from "../../../models/Product";

export default async function handler(req, res) {
  const { method, cookies } = req;
  const token = cookies.token;
  await dbConnect();
  if (method === "GET") {
    try {
      const products = await Product.find({});
      return res.status(200).json(products);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  if (method === "POST") {
    // Update or create data in your database
    if (!token || token !== process.env.TOKEN) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });
    }
    
    try {
      const product = await Product.create(req.body);
      return res.status(201).json({ success: true, data: product });
    } catch (error) {
      res.status(500).json(error.message);
    }
  } else {
    // Handle any other HTTP method
    res.status(200).json({ name: "John Doe" });
  }
}
