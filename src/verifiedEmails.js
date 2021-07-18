const jwt = require("jsonwebtoken");
const { uploadUsersToDb } = require("./db");
const firebase = require("./firebaseConfig");
const db = firebase.database();

const schema = function (email, Name, admin = false) {
  return { email, Name, admin };
};

let userDetails = [];

async function initializeUsers() {
  let users = {};
  const result = await db
    .ref("Users")
    .once("value")
    .then((snapshot) => {
      users = snapshot.val();
    });
  for (let i = 0; i < users["UsersDetails"].length; i++) {
    userDetails.push(users["UsersDetails"][i]);
  }
  return true;
}

function getDetails() {
  let result = {};
  for (let i = 0; i < userDetails.length; i++) {
    result[i] = userDetails[i];
  }
  return result;
}

function genToken(email) {
  let index = 0;
  let i = 0;
  let token = "";
  for (i = 0; i < userDetails.length; i++) {
    if (email === userDetails[i].email) {
      index = i;
      token = jwt.sign(
        {
          email: userDetails[index].email,
          admin: userDetails[index].admin,
          name: userDetails[index].Name,
        },
        "esp8266"
      );
      return token;
    }
  }
  return false;
}

function getUserDetails() {
  return userDetails;
}

function getToken(email) {
  let flag = false;
  for (let i = 0; i < userDetails.length; i++) {
    if (userDetails[i].email === email) {
      flag = true;
      break;
    }
  }
  if (flag) return genToken(email);
  if (!flag) return false;
}

function addEmails(email, Name) {
  let flag = false;
  for (let i = 0; i < userDetails.length; i++) {
    if (userDetails[i].email === email) {
      flag = true;
      break;
    }
  }
  if (!flag) {
    userDetails.push(schema(email, Name));
  }
  uploadUsersToDb(getDetails());
  return getToken(email);
}

function deleteEmails(email) {
  let flag = false;
  let newUserDetails = [];
  for (let i = 0; i < userDetails.length; i++) {
    if (userDetails[i].email === email) {
      flag = true;
    } else {
      newUserDetails.push(userDetails[i]);
    }
  }
  userDetails = newUserDetails;
  if (!flag) return 401;
  uploadUsersToDb(userDetails);
  return 200;
}

function verifyToken(token) {
  try {
    return jwt.verify(token, "esp8266");
  } catch (er) {
    return false;
  }
}

function verifyAppToken(appToken, email) {
  const result = verifyToken(appToken);
  if (!result.isApp) return 400;
  const token = genToken(email);
  if (!token) return 400;
  return token;
}

module.exports = {
  getUserDetails,
  addEmails,
  deleteEmails,
  getToken,
  verifyAppToken,
  verifyToken,
  getDetails,
  initializeUsers,
};
