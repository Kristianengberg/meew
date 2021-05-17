const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./routes/userRoute");
const registerRoute = require("./routes/registerRoute");
const loginRoute = require("./routes/loginRoute");
const mongoose = require("mongoose");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRoute);
app.use(registerRoute);
app.use(loginRoute);

app.get("/", (req, res) => {

});


mongoose.connect(process.env.DATABASE_URL, { useUnifiedTopology: true }, { useNewUrlParser: true }, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("connected to DB");
});

app.listen(8080, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Server is running on port", 8080);
});