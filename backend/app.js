const express = require("express");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const path = require("path");
require("dotenv").config();

const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauce");

mongoose.connect(process.env.RANDOM_MONGODB)
  .then(() =>  console.log("Connexion à MongoDB réussie !"))
  .catch((error) => console.log(error, "Connexion à MongoDB échouée !"))

const app = express();
const limiter = rateLimit({
  max: 100,
  windowMs: 15 * 60 * 1000,
  message: "Trop de requêtes de cette IP"
});

app.use(limiter);
app.use(helmet({crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
})

app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;