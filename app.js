require("dotenv").config;
const express = require("express");
const session = require("express-session");
const routes = require('./routes/routes')

const app = express();
app.use(
  session({
    sercet: "my-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,
    },
  })
);

// Middleware to parse JSON and url-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Make the public folder serve static files
app.use("/public", express.static("public"));

// Initialize View Template Engine
app.set('view engine', 'ejs');

// Initialize Routes
app.use('/', routes)

// Run Server Locally
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
