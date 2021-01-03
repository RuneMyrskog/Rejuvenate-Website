const path = require('path');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

//DEVELOPMENT
process.env.USERNAME = "Rune";
process.env.PASSWORD = "CSC309REJUVENATE";

//mongoose connection
const { mongoose } = require('./db/mongoose');
mongoose.set('bufferCommands', false);  // don't buffer db requests if the db server isn't connected - minimizes http requests hanging if this is the case.
mongoose.set('useFindAndModify', false); // for some deprecation issues

//db models


//start app
const app = express();

app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET || "HARDCODED_SECRET",
    cookie: {
        expires: 60000000, // have to log in after ~1 year (not 10 minutes) without server interaction
        httpOnly: true,
    },

    saveUninitialized: false,
    resave: false, // may have to change
}));

const sessionChecker = (req, res, next) => {
    if (req.session.user) {
        res.redirect('/home');
    } else {
        next();
    }
}

//import api routes
app.use(require('./api_routes/users'));
app.use(require('./api_routes/posts'));
app.use(require('./api_routes/login'));
app.use(require('./api_routes/statistics'));


/*** Routes to serve webpage **********************************/

//for root and /login, check for existing session, if no session, continue to login page
// app.get('/', sessionChecker, (req, res) => {
//     console.log("rerouting to login")
//     res.redirect('/login')
// })

//have to define afer '/' route or else it will override our get method for '/'
app.use(express.static(path.join(__dirname, 'build')));

// login and register routes are accessible without any authentication
app.get('/login', sessionChecker, (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'build', 'index.html'));
})

app.get('/register', sessionChecker, (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'build', 'index.html'));
})


// for all other routes, check if user is logged in, if not, redirect to /login
app.get('*', (req, res) => {
    //res.status(200).sendFile(path.join(__dirname, 'build', 'index.html')); 
    if (req.session.user) {
        res.status(200).sendFile(path.join(__dirname, 'build', 'index.html'));
    } else {
        res.redirect('/login');
    }
});

/*** Start Listening on PORT **********************************/
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server listening at http://localhost:${PORT}...`);
})

