const express = require("express");
const auth = express.Router();
const authUser = require("../middleware/auth");
const {
  addEmails,
  deleteEmails,
  verifyAppToken,
  getDetails,
} = require("../src/verifiedEmails");

auth.put("/addUser", authUser, (req, res) => {
  if (req.authAdmin) {
    let email = req.body.email;
    let name = req.body.name;
    if (!email) return res.status(400).send("Bad Request");
    const token = addEmails(email, name);
    return res
      .set({ "x-auth-token": token })
      .status(200)
      .send("Added Successfully");
  }
  res.status(401).send("Not Authorized");
});

auth.get("/getUserDetails", authUser, (req, res) => {
  const userDetails = getDetails();
  res.status(200).json(userDetails);
});

auth.put("/getToken", (req, res) => {
  const appToken = req.header("x-auth-token");
  if (!appToken) return res.status(400).send("Not Authorized");
  const email = req.body.email;
  if (!email) return res.status(401).send("Bad Request");
  const result = verifyAppToken(appToken, email);
  if (result === 400) return res.status(400).send("Not Authorised");
  res.status(200).json({ loginToken: result });
});

auth.put("/verifyLogin", authUser, (req, res) => {
  result = { email: req.authEmail, Name: req.authName, admin: req.authAdmin };
  res.status(200).json(result);
});

auth.put("/delUser", authUser, (req, res) => {
  if (req.authAdmin) {
    let email = req.body.email;
    const result = deleteEmails(email);
    if (result === 401) return res.status(401).send("Bad Request");
    if (result === 200) return res.status(200).send("Deleted Successfully");
  }
  res.status(401).send("Not Authorized");
});

module.exports = auth;
