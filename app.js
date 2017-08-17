var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var index = require('./routes/index');
var users = require('./routes/users');
var restrooms = require('./routes/restrooms');
var statuses = require('./routes/statuses');
var headcounts = require('./routes/headcounts');
var actions = require('./routes/actions');
var api = require('./routes/api');
var login = require('./routes/login');
var app = express();
var passport        = require('passport'),
    LocalStrategy   = require('passport-local').Strategy,
    session         = require('express-session');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));


app.use('/', index);
app.use('/users', users);
app.use('/restrooms', restrooms);
app.use('/api', api);
app.use('/statuses', statuses);
app.use('/headcounts', headcounts);
app.use('/actions', actions);
app.use('/login', login);


// hardcoded users, ideally the users should be stored in a database
var users = [{"id":111, "username":"stephen", "password":"password"}];
 
// passport needs ability to serialize and unserialize users out of session
passport.serializeUser(function (user, done) {
    done(null, users[0].id);
});
passport.deserializeUser(function (id, done) {
    done(null, users[0]);
});
 
// passport local strategy for local-login, local refers to this app
passport.use('local-login', new LocalStrategy(
    function (username, password, done) {
        if (username === users[0].username && password === users[0].password) {
            return done(null, users[0]);
        } else {
            return done(null, false, {"message": "User not found."});
        }
    })
);
 
// body-parser for retrieving form data
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
 
// initialize passposrt and and session for persistent login sessions
app.use(session({
    secret: "tHiSiSasEcRetStr",
    resave: true,
    saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

var abc;
// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        abc = req.path;
        console.log(req.path);
        return next();
    }
    abc = req.path;
    console.log(req.path);
    next();
}

function isLoggedInCont(req, res, next) {
    if (req.isAuthenticated())
        return next();
}
 
app.get("/", isLoggedIn, function (req, res) {
    res.send("index", {
        isAuthenticated: true,
        username: users[0].username
    });
});


app.get("/restrooms", isLoggedIn, function (req, res) {
    res.send("restroomto", {
        isAuthenticated: true,
        username: users[0].username
    });
});

app.get("/checklogin", isLoggedInCont, function (req, res) {
    res.send(true);
});
 
// api endpoints for login, content and logout
app.get("/login", function (req, res) {
    res.send("login");
});
app.post("/login", 
    passport.authenticate("local-login", { failureRedirect: "/login"}),
    function (req, res) {
        res.redirect(abc || '/');
        delete abc;
});

app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});








// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;