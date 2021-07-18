const mqtt = require("mqtt");
let client = mqtt.connect("mqtt://broker.emqx.io");
const { getStatus, setStatus } = require("./status");
const { writeToFirebase } = require("./db");
const config = require("../config.json");

client.on("connect", function () {
  client.subscribe(config.mqttChannel, function (err) {
    if (!err) {
      console.log("Connected");
    }
  });
});

let count = 0;

client.on("message", function (topic, message) {
  const status = getStatus();
  rStatus = message.toString();

  if (rStatus[0] === "S" && rStatus[1] === "T") {
    let data = {};
    for (let i = 2; i <= 5; i++) {
      let temp = rStatus[i] === "1" ? true : false;
      data["id_" + (i - 1).toString()] = temp;
      status["id_" + (i - 1).toString()].isOn = temp;
    }
    setStatus(status);
    writeToFirebase(data, { isOnline: true }, true);
  }

  if (rStatus[0] === "S" && rStatus[1] !== "T") {
    count = 0;
    let data = {};
    for (let i = 1; i <= 4; i++) {
      let temp = rStatus[i] === "1" ? true : false;
      let localId = "id_" + i.toString();
      status[localId].isOn = temp;
      data[localId] = temp;
    }
    setStatus(status);
    writeToFirebase(data, { isOnline: true }, false);
  } else {
    if (rStatus[0] === "D" && count === 4) {
      count = 0;
      let data = {};
      for (let i = 1; i <= 4; i++) {
        data["id_" + i.toString()] = rStatus[i] =
          status["id_" + i.toString()].isOn;
      }
      setStatus(status);
      writeToFirebase(data, { isOnline: false }, false);
    }
    count++;
  }
});

const deviceChange = () => {
  const status = getStatus();
  sendString = "D";
  for (let i = 1; i <= 4; i++) {
    sendString += status["id_" + i.toString()].isOn ? "1" : "0";
  }

  client.publish(config.mqttChannel, sendString, {
    qos: 0,
    retain: false,
  });
};

module.exports = deviceChange;
