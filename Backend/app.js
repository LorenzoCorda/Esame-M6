require("dotenv").config();
const cors = require("cors");
const express = require("express");
const PORT = 9099;
const startServer = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");

//import routes
const authorRoute = require("./routes/routesAuthors/authors");
const postRoute = require("./routes/routesPosts/post");
const authRoute = require("./routes/routesAuth/auth");
const oauthRoute = require("./routes/routesOauth/oauth");

const app = express();

app.use(
  cors({
    origin: ["https://esame-m6.vercel.app", "http://localhost:5173"],
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);
app.use(express.json());

app.use("/authors", authorRoute);
app.use("/posts", postRoute);
app.use("/auth", authRoute);
app.use("/", oauthRoute);

app.use(errorHandler);

startServer(PORT, app);
