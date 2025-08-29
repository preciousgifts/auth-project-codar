const frontDeskMiddleware = (req, res, next) => {
  if (req.profileInfo.role !== "front_desk") {
    console.log("Access denied! front desk right required");
    return res.status(403).json({
      success: false,
      message: "Access denied! front desk right required.",
    });
  }

  next();
};

export default frontDeskMiddleware;
