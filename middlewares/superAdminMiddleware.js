import jwt from "jsonwebtoken";
const superAdminMiddleware = (req, res, next) => {
  if (req.profileInfo.role !== "super_admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied! SuperAdmin right required.",
    });
  }
  next();
};

export default superAdminMiddleware;
