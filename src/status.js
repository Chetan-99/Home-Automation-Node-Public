let status = {};

function setStatus(arg) {
  status = arg;
}

function getStatus() {
  return status;
}

module.exports = { status, setStatus, getStatus };
