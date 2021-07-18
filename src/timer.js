const deviceChange = require("./mqtt");
const { getStatus, setStatus } = require("./status");
const date = require("date-and-time");
const { setFullStatus } = require("./db");

let st1 = true,
  st2 = true,
  st3 = true,
  st4 = true;

function Timer() {
  const status = getStatus();
  const now = new Date();
  let nowformat = date.format(now, "YYYY/MM/DD HH:mm", true);
  let addOnce = date.format(now, "YYYY/MM/DD", true);

  if (status.id_1.isTimerOn && !status.id_1.isTimerDaily) {
    let st = status.id_1.UTCStartTime;
    st = addOnce + " " + st;
    let et = status.id_1.UTCStopTime;
    et = addOnce + " " + et;

    if (st <= nowformat && st1) {
      status.id_1.isOn = true;
      st1 = false;
      setStatus(status);
      console.log("Device 1 Started");
    }

    if (et <= nowformat && nowformat >= st) {
      st1 = true;
      status.id_1.isOn = false;
      status.id_1.isTimerOn = false;
      setStatus(status);
      console.log("Device 1 Stopped");
    }
  }

  if (status.id_1.isTimerOn && status.id_1.isTimerDaily) {
    st = status.id_1.startTimeDaily;
    et = status.id_1.stopTimeDaily;

    if (st <= nowformat && st1) {
      status.id_1.isOn = true;
      let next = date.addDays(now, +1);
      next = date.format(next, "YYYY/MM/DD", true);
      status.id_1.startTimeDaily = next + " " + status.id_1.UTCStartTime;
      console.log("Device 1 Started");
      setStatus(status);
      st1 = false;
    }

    if (et <= nowformat && nowformat > status.id_1.UTCStartTime) {
      st1 = true;
      let next = date.addDays(now, +1);
      next = date.format(next, "YYYY/MM/DD", true);
      status.id_1.stopTimeDaily = next + " " + status.id_1.UTCStopTime;
      status.id_1.isOn = false;
      status.id_1.isTimerOn = false;
      setStatus(status);
      console.log("Device 1 Stopped");
    }
  }

  if (status.id_2.isTimerOn && !status.id_2.isTimerDaily) {
    let st = status.id_2.UTCStartTime;
    st = addOnce + " " + st;
    let et = status.id_2.UTCStopTime;
    et = addOnce + " " + et;

    if (st <= nowformat && st2) {
      status.id_2.isOn = true;
      st2 = false;
      setStatus(status);
      console.log("Device 2 Started");
    }

    if (et <= nowformat && nowformat >= st) {
      st2 = true;
      status.id_2.isOn = false;
      status.id_2.isTimerOn = false;
      setStatus(status);
      console.log("Device 2 Stopped");
    }
  }

  if (status.id_2.isTimerOn && status.id_2.isTimerDaily) {
    st = status.id_2.startTimeDaily;
    et = status.id_2.stopTimeDaily;

    if (st <= nowformat && st2) {
      status.id_2.isOn = true;
      let next = date.addDays(now, +1);
      next = date.format(next, "YYYY/MM/DD", true);
      status.id_2.startTimeDaily = next + " " + status.id_2.UTCStartTime;
      setStatus(status);
      console.log("Device 2 Started");
      st2 = false;
    }

    if (et <= nowformat && nowformat > status.id_2.UTCStartTime) {
      st2 = true;
      let next = date.addDays(now, +1);
      next = date.format(next, "YYYY/MM/DD", true);
      status.id_2.stopTimeDaily = next + " " + status.id_2.UTCStopTime;
      status.id_2.isOn = false;
      status.id_2.isTimerOn = false;
      setStatus(status);
      console.log("Device 2 Stopped");
    }
  }

  if (status.id_3.isTimerOn && !status.id_3.isTimerDaily) {
    let st = status.id_3.UTCStartTime;
    st = addOnce + " " + st;
    let et = status.id_3.UTCStopTime;
    et = addOnce + " " + et;

    if (st <= nowformat && st3) {
      status.id_3.isOn = true;
      st3 = false;
      setStatus(status);
      console.log("Device 3 Started");
    }

    if (et <= nowformat && nowformat >= st) {
      st3 = true;
      status.id_3.isOn = false;
      status.id_3.isTimerOn = false;
      setStatus(status);
      console.log("Device 3 Stopped");
    }
  }

  if (status.id_3.isTimerOn && status.id_3.isTimerDaily) {
    st = status.id_3.startTimeDaily;
    et = status.id_3.stopTimeDaily;

    if (st <= nowformat && st3) {
      status.id_3.isOn = true;
      let next = date.addDays(now, +1);
      next = date.format(next, "YYYY/MM/DD", true);
      status.id_3.startTimeDaily = next + " " + status.id_3.UTCStartTime;
      console.log("Device 3 Started");
      setStatus(status);
      st3 = false;
    }

    if (et <= nowformat && nowformat > status.id_3.UTCStartTime) {
      st3 = true;
      let next = date.addDays(now, +1);
      next = date.format(next, "YYYY/MM/DD", true);
      status.id_3.stopTimeDaily = next + " " + status.id_3.UTCStopTime;
      status.id_3.isOn = false;
      status.id_3.isTimerOn = false;
      setStatus(status);
      console.log("Device 3 Stopped");
    }
  }

  if (status.id_4.isTimerOn && !status.id_4.isTimerDaily) {
    let st = status.id_4.UTCStartTime;
    st = addOnce + " " + st;
    let et = status.id_4.UTCStopTime;
    et = addOnce + " " + et;

    if (st <= nowformat && st4) {
      status.id_4.isOn = true;
      st4 = false;
      console.log("Device 4 Started");
      setStatus(status);
    }

    if (et <= nowformat && nowformat >= st) {
      st4 = true;
      status.id_4.isOn = false;
      status.id_4.isTimerOn = false;
      setStatus(status);
      console.log("Device 4 Stopped");
    }
  }

  if (status.id_4.isTimerOn && status.id_4.isTimerDaily) {
    st = status.id_4.startTimeDaily;
    et = status.id_4.stopTimeDaily;

    if (st <= nowformat && st4) {
      status.id_4.isOn = true;
      let next = date.addDays(now, +1);
      next = date.format(next, "YYYY/MM/DD", true);
      status.id_4.startTimeDaily = next + " " + status.id_4.UTCStartTime;
      console.log("Device 4 Started");
      setStatus(status);
      st4 = false;
    }

    if (et <= nowformat && nowformat > status.id_4.UTCStartTime) {
      st4 = true;
      let next = date.addDays(now, +1);
      next = date.format(next, "YYYY/MM/DD", true);
      status.id_4.stopTimeDaily = next + " " + status.id_4.UTCStopTime;
      status.id_4.isOn = false;
      status.id_4.isTimerOn = false;
      setStatus(status);
      console.log("Device 4 Stopped");
    }
  }
  deviceChange();
  setFullStatus();
  setTimeout(Timer, 2500);
}

module.exports = Timer;
