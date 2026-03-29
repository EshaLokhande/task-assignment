const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    // check token exists
    if (!token) {
      return res.status(401).json({ message: "No token, access denied" });
    }

    // verify token
    const decoded = jwt.verify(token, "secretkey");

    // attach user data to request
    req.user = decoded;

    next(); // go to next step (controller)
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;