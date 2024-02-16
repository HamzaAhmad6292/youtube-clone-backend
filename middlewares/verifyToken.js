const jwt = require("jsonwebtoken");
const secret = "HamzaTheGreat"; // Same secret used for token generation

// Middleware function to verify JWT token
const verifyToken = (req, res, next) => {
  // Get auth header value
  const authToken = req.headers["authorization"];

  // Check if authToken is undefined
  if (typeof authToken !== "undefined") {
    // Split authToken by space
    const tokenArray = authToken.split(" ");
    const token = tokenArray[1]; // Get token from array

    // Verify token
    jwt.verify(token, secret, (err, authData) => {
      if (err) {
        // Token verification failed
        res.status(403).json({ errors: "Token is not valid" });
      } else {
        // Token verification successful
        req.authData = authData;
        next(); // Move to the next middleware
      }
    });
  } else {
    // If authToken is undefined, return Forbidden
    res.status(403).json({ errors: "Token is not provided" });
  }
};

module.exports = verifyToken;
