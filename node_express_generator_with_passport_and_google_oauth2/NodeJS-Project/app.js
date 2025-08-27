import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import dotenv from "dotenv";

// passport and google auth imports
import session from 'express-session';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import loginRouter from './routes/login.js';
import authRouter from './routes/auth.js';
import dashboardRouter from './routes/dashboard.js';
import logoutRouter from './routes/logout.js';

// .env variables
dotenv.config(); 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Middleware
app.use(session({
    secret: "lcys2025_secret",
    resave: false ,
    saveUninitialized: true ,
}));
// passport and google auth setup
app.use (passport.initialize());
app.use (passport.session());
const authUser = (request, accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}
const GOOGLE_OAUTH2_CALLBACK_URL = process.env.GOOGLE_OAUTH2_CALLBACK_URL;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
console.log(GOOGLE_OAUTH2_CALLBACK_URL);
console.log(GOOGLE_CLIENT_ID);
console.log(GOOGLE_CLIENT_SECRET);
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_OAUTH2_CALLBACK_URL,
    passReqToCallback: true
  }, authUser)
);

// api routes (highest level)
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/auth', authRouter);
app.use('/dashboard', dashboardRouter);
app.use('/logout', logoutRouter);

passport.serializeUser(function(user, done) {
    console.log(`\n--------> Serialize User:`);
    console.log(user);
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    console.log(`\n--------> Deserialize User:`);
    console.log(user);
    done(null, user);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;