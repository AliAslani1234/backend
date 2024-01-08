const express = require("express");
const axios = require("axios");
const app = express();
const connectToDb = require("./db/connect");
const cors = require("cors");
const userRoute = require("./routes/UserRoute");
const authRoute = require("./routes/authRoute");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");

const port = 3000;
const corsOptions = {
  origin: "http://localhost:8080",
  credentials: true,
};
app.use("/images", express.static("images"));
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

const start = async () => {
  try {
    await connectToDb();
    app.listen(port, console.log("running on port 3000"));
  } catch (error) {
    console.log(error);
  }
};

app.use("/api/v1/Auth", authRoute);

app.use("/api/v1/users", userRoute);

start();
