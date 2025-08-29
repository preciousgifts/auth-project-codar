const adminMiddleware = (req, res, next) => {
  if (req.profileInfo.role !== "admin") {
    console.log("Access denied! Admin right required.");
    return res.status(403).json({
      success: false,
      message: "Access denied! Admin right required.",
    });
  }

  next();
};

export default adminMiddleware;
