const { getUserDetails, verifyToken } = require("../src/verifiedEmails");

function verifyDetails(token) {
  const details = verifyToken(token);
  if (!details) return false;
  const userDetails = getUserDetails();
  for (let i = 0; i < userDetails.length; i++) {
    if (userDetails[i].email === details.email) {
      return userDetails[i];
    }
  }
  return false;
}

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided");
  const userDetail = verifyDetails(token);
  if (!userDetail) return res.status(400).send("Invalid token");
  req.authAdmin = userDetail.admin;
  req.authEmail = userDetail.email;
  req.authName = userDetail.Name;
  next();
}

module.exports = auth;
