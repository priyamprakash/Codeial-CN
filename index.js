const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts')
const db = require('./config/mongoose')
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')
const sassMiddleware = require('node-sass-middleware')

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'))
app.use(expressLayouts)
//extract styles and scripts from the subpages into the layout
app.set('layout extractStyles',true)
app.set('layout extractScripts',true)



app.set('view engine', 'ejs');
app.set('views', './views');

//mongo store is used to store the session cookie in DB 
app.use(session({
    name: 'codeial',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1/codial_developemnt',
        collectionName: 'sessions'
    })
}));

app.use(passport.initialize())
app.use(passport.session())
app.use(passport.setAuthenticatedUser)

//Use express route 
app.use('/', require('./routes'));


app.listen(port, function(err){

    if(err){
        console.log(`Error: ${err}`)
    }
    console.log(`Server running on port: ${port}`)
})