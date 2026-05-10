// const postRoutes = require("./routes/postRoutes");
// const authRoutes =require("./routes/authRoutes");
// app.use(postRoutes);
// app.use(authRoutes);
const express = require('express');
const app = express();

const path = require('path');
const cookieParser = require("cookie-parser");

// ROUTES
const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes");

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// VIEW ENGINE
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// STATIC FILES
app.use(express.static(path.join(__dirname, "public")));

// ROUTES
app.use(postRoutes);
app.use(authRoutes);

// HOME ROUTE
app.get("/", (req, res) => {
   res.render("home");
});

// TEST ROUTE
app.get("/test", (req, res) => {
   res.send("working");
});

module.exports = app;