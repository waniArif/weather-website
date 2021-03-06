const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

const port = process.env.PORT || 3000;

// Define paths for Express configuration
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Routing
app.get("", (req, res) => {
  res.render("index", {
    //name of the template file without extension, index
    title: "Weather",
    name: "war",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",

    name: "Wani Arif Rasool",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "Please reach for help at waniarifrasool@gmail.com.",
    title: "Help",
    name: "Wani Arif Rasool",
  });
});

// sending from the app.js file only...
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address is missing...",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "search term is missing!",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 help",
    name: "Wani Arif Rasool",
    message: "help page not found!",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Wani Arif Rasool",
    message: "404 PAGE NOT FOUND",
  });
});

// Server Starts
app.listen(port, () => {
  console.log(`"Server is up on port ${port}"`);
});
