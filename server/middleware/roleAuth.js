/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const isAdmin = (req, res, next) => {
  if (req.user?.role !== "ADMIN") {
    return res.status(403).json({ message: "Unauthorized! Admins Only" });
  }
  next(); // Allow to proceed to controller
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const isUser = (req, res, next) => {
  if (req.user?.role !== "USER") {
    return res.status(403).json({ message: "Unauthorized! Users Only" });
  }
  next(); // Allow to proceed to controller
};
