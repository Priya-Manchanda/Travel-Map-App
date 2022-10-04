const express = require("express");
const mongoConnect = require("./db");
mongoConnect();
const pinRoute = require("./routes/pin");
const UserRoute = require("./routes/user");
const app = express();
app.use(express.json());
app.use("/api/pin", pinRoute);
app.use("/api/user", UserRoute);
app.listen(6000, () => {
  console.log("Server running on port 6000");
});
