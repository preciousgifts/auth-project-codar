import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  //split the token from the array
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("Access Denied, No token provided. Please Login to continue");
    res.status(401).json({
      success: false,
      message: "Access Denied, No token provided. Please Login to continue",
    });
  }

  //decode the token

  try {
    const decodeTokenInfo = jwt.verify(token, process.env.SECRET_KEY);
    req.profileInfo = decodeTokenInfo;
  } catch (error) {
    console.log("Access denied. Please login to continue");
    return res.status(500).json({
      success: false,
      message: "Access denied. Please login to continue",
    });
  }

  //   console.log(req.profileInfo);

  next();
};

export default authMiddleware;
