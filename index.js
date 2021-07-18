const express = require("express");
const cors = require("cors");
const devices = require("./routes/devices");
const auth = require("./routes/auth");
const app = express();
const { initialize } = require("./src/db");
const Timer = require("./src/timer");
const { initializeUsers } = require("./src/verifiedEmails");
const PORT = process.env.PORT || 3000;

async function startUp() {
  const statusResult = await initialize();
  const userResult = await initializeUsers();
  if (statusResult && userResult) Timer();
  console.log("Initialized");
}

startUp();

app.use(cors());
app.use(express.json());
app.use("/api/devices", devices);
app.use("/api/auth", auth);

const server = app.listen(PORT, () =>
  console.log(`Listening on Port: ${PORT}`)
);

module.exports = server;
