const firebase = require("./firebaseConfig");
const db = firebase.database();
const date = require("date-and-time");
let { setStatus, getStatus } = require("./status");

async function initialize() {
  let dbStatus = {};
  const result = await db
    .ref("LocalStatus")
    .once("value")
    .then((snapshot) => {
      dbStatus = snapshot.val();
      setStatus(dbStatus["status"]);
    });
  return true;
}

function setFullStatus() {
  const status = getStatus();
  db.ref("LocalStatus").set({
    status,
  });
}

function uploadUsersToDb(UsersDetails) {
  db.ref("Users").set({
    UsersDetails,
  });
}

function writeToFirebase(Status, online, user = false) {
  db.ref("Devices").set({
    Status,
    online,
  });
  let now = new Date();
  now = date.addHours(now, 5.5);
  let logTime = date.format(now, "hh:mm A, ddd DD MMM");
  if (user) {
    db.ref("Activities").push().set({
      Email: "Device Touch",
      Name: "Device Touch",
      id: "1",
      State: Status["id_1"],
      Time: logTime,
    });
  }
  if (user) {
    db.ref("Activities").push().set({
      Email: "Device Touch",
      Name: "Device Touch",
      id: "2",
      State: Status["id_2"],
      Time: logTime,
    });
  }
  if (user) {
    db.ref("Activities").push().set({
      Email: "Device Touch",
      Name: "Device Touch",
      id: "3",
      State: Status["id_3"],
      Time: logTime,
    });
  }
  if (user) {
    db.ref("Activities").push().set({
      Email: "Device Touch",
      Name: "Device Touch",
      id: "4",
      State: Status["id_4"],
      Time: logTime,
    });
  }
}

module.exports = {
  writeToFirebase,
  initialize,
  setFullStatus,
  uploadUsersToDb,
};
