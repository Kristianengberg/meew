const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./routes/userRoute");
const registerRoute = require("./routes/registerRoute");
const loginRoute = require("./routes/loginRoute");
const wheelRoute = require("./routes/wheelRoute");
const mongoose = require("mongoose");
const session = require("express-session");

const server = require("http").createServer(app);
const io = require("socket.io")(server);
const escapeHtml = require("html-escaper").escape;

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

io.on("connection", (socket) => {
  console.log("socket connected");
  socket.on("userWin", (data) => {
    console.log("received data ", data);
    io.emit("userWonData", { segmentNumber: escapeHtml(data.segmentNumber) });
  });

  socket.on("disconnect", () => {
    console.log("socket disconnected");
  });
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(userRoute);
app.use(registerRoute);
app.use(loginRoute);
app.use(wheelRoute);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/login/login.html");
});

app.get("/index", (req, res) => {
  res.sendFile(__dirname + "/public/index/index.html");
});

app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/public/register/register.html");
});

mongoose.connect(
  process.env.DATABASE_URL,
  { useUnifiedTopology: true },
  { useNewUrlParser: true },
  (error) => {
    if (error) {
      console.log(error);
    }
    console.log("connected to DB");
  }
);

server.listen(8080, (error) => {
  if (error) {
    console.log(error);
  }
  console.log("Server is running on port", 8080);
});
