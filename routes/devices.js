const express = require("express");
const devices = express.Router();
const deviceChange = require("../src/mqtt");
const { getStatus, setStatus } = require("../src/status");
const date = require("date-and-time");
const Timer = require("../src/timer");
const auth = require("../middleware/auth");

let mishraData = {
  mishra: "Lul",
};

devices.get("/parkIt", (req, res) => {
  res.json(mishraData).status(200);
});

devices.put("/parkit", (req, res) => {
  let received = req.body;
  mishraData = received;
  res.send(mishraData).status(200);
});

devices.get("/", auth, (req, res) => {
  const status = getStatus();
  res.json(status).status(200);
});

devices.put("/", auth, (req, res) => {
  const status = getStatus();
  const id1 = req.body.device.id;
  const isOn1 = req.body.device.isOn;
  status["id_" + id1].isOn = isOn1;
  setStatus(status);
  deviceChange();
  res.json(status).status(200);
});

devices.put("/timer", auth, (req, res) => {
  const status = getStatus();
  Timer();
  let id1 = req.body.device.id;
  let isTimerOn1 = req.body.device.isTimerOn;
  let isTimerDaily1 = req.body.device.isTimerDaily;
  let st = req.body.device.startTime;
  let et = req.body.device.stopTime;
  status["id_" + id1].startTime = st;
  status["id_" + id1].stopTime = et;

  if (!isTimerOn1) {
    status["id_" + id1].isTimerOn = false;
    status["id_" + id1].isTimerDaily = false;
  }

  if (isTimerOn1) {
    //For Local Server below Code
    // st = date.parse(st, "HH:mm", false);
    // st = date.format(st, "HH:mm", true);
    // et = date.parse(et, "HH:mm", false);
    // et = date.format(et, "HH:mm", true);

    //For Deploying Server below Code
    st = date.parse(st, "HH:mm", false);
    st = date.addHours(st, -5.5);
    st = date.format(st, "HH:mm");
    et = date.parse(et, "HH:mm", false);
    et = date.addHours(et, -5.5);
    et = date.format(et, "HH:mm");

    status["id_" + id1].isTimerOn = isTimerOn1;
    if (isTimerDaily1) {
      const now = new Date();
      let utc = date.format(now, "YYYY/MM/DD", true);
      status["id_" + id1].startTimeDaily = utc + " " + st;
      status["id_" + id1].stopTimeDaily = utc + " " + et;
      status["id_" + id1].isTimerDaily = isTimerDaily1;
    }
  }

  status["id_" + id1].UTCStartTime = st;
  status["id_" + id1].UTCStopTime = et;
  setStatus(status);
  res.json(status).status(200);
});

module.exports = devices;
