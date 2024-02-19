const jwt = require("jsonwebtoken");
const secret = "HamzaTheGreat"; 

const verifyToken = (req, res, next) => {
  const authToken = req.headers["authorization"];

  if (typeof authToken !== "undefined") {
    const tokenArray = authToken.split(" ");
    const token = tokenArray[1]; // Get token from array

    jwt.verify(token, secret, (err, authData) => {
      if (err) {
        res.status(403).json({ errors: "Token is not valid" });
      } else {
        req.user = decodedToken.user;
        next(); 
      }
    });
  } else {
    res.status(403).json({ errors: "Token is not provided" });
  }
};

module.exports = verifyToken;
