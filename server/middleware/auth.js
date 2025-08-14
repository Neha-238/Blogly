// import jwt from "jsonwebtoken";

// const auth = (req, res, next) => {
//   const token = req.headers.authorization;

//   try {
//     jwt.verify(token, process.env.JWT_SECRET);
//     next();
//   } catch (error) {
//     res.json({
//       success: false,
//       message: "Invalid token",
//     });
//   }
// };

// export default auth;

import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Authorization token missing",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded token payload to req.user
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export default auth;
