const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");

const app = express();
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
    },
  })
);

// Middleware to parse JSON and url-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use("/public", express.static("public"));

// Set Template Engine
app.set("view engine", "ejs");

// Mount the routes
app.use("/", routes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
