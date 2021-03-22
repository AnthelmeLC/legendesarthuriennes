const express = require("express");
const bodyParser = require("body-parser");
const {Sequelize} = require("sequelize");
const DBinstance = require("./DBinstance");
const path = require("path");

const userRoutes = require("./routes/user");
const storyTypeRoutes = require("./routes/stroryType");
const storyRoutes = require("./routes/story");
const bibliographyRoutes = require("./routes/bibliography");
const mailRoutes = require("./routes/mail");

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

app.use(express.static('dist'));

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/auth", userRoutes);
app.use("/api/storyTypes", storyTypeRoutes);
app.use("/api/stories", storyRoutes);
app.use("/api/bibliography", bibliographyRoutes);
app.use("/api/mail", mailRoutes)

module.exports = app;