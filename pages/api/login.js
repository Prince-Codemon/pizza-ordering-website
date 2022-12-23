import cookie from "cookie";
const handler = (req, res) => {
  const { method } = req;
  if (method === "POST") {
    const { username, password } = req.body;
    console.log(username, password);
    console.log(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD);
    
    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", process.env.TOKEN, {
          sameSite: "strict",
          path: "/",
          maxAge: 60 * 60,
        })
      );
      return res.status(200).json({success:"success"});
    } else {
      return res.status(401).json("wrong credentials");
    }
  }
};
export default handler;
