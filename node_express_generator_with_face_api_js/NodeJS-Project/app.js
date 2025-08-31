import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";

import loginRouter from "./routes/login.route.js";
import faceRouter from "./routes/face.route.js";
import dashboardRouter from "./routes/dashboard.route.js";
import logoutRouter from "./routes/logout.route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json()); // ← THIS IS CRITICAL

// Add session middleware
app.use(session({
    secret: 'your-secret-key', // Change this to a random string
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// body parser
app.use(express.urlencoded({ extended: false }));

// static files
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/login", loginRouter);
app.use("/face", faceRouter);
app.use("/dashboard", dashboardRouter);
app.use("/logout", logoutRouter);

// default redirect
app.get("/", (req, res) => res.redirect("/login"));

export default app;
