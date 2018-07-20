const express = require("express"),
    path = require("path"),
    bodyParser = require("body-parser"),
    cors = require('cors'),
    mongoose = require("mongoose"),
    config = require("./config/database");

//Connect to db
mongoose.Promise = global.Promise;
mongoose.connect(config.database).then(
    () => {
        console.log("Database is connected. ʕง•ᴥ•ʔง")
    },
    err => {
        console.log("Cannot connect to the database. ʕノ•ᴥ•ʔノ ︵ ┻━┻" + err)
    }
);

//Initialize app
const app = express();

//Prettify JSON
// app.set("json spaces", 40);

//Body parser middleware
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

app.use(cors());

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

const port = process.env.PORT || 3000;

//Routes
const pages = require("./routes/pages");
const users = require("./routes/users");

app.use("/pages", pages);
app.use("/users", users);

//Start server
const server = app.listen(port, function () {
    console.log("Server running on port " + port + ", and...")
})