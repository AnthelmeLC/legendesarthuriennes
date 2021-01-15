const express = require("express");
const bodyParser = require("body-parser");
const {Sequelize} = require("sequelize");
const DBinstance = require("./DBinstance");

const userRoutes = require("./routes/user");
const storyTypeRoutes = require("./routes/stroryType");
const storyRoutes = require("./routes/story");

const app = express();

DBinstance.authenticate()
.then(() => console.log("Connexion à la base de données réussie."))
.catch(() => console.log("Connexion à la base de données échouée."));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Reqested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});

app.use(bodyParser.json());

app.use("/api/auth", userRoutes);
app.use("/api/storyTypes", storyTypeRoutes);
app.use("/api/stories", storyRoutes);

module.exports = app;