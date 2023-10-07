const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts')
const db = require('./config/mongoose')
// used for session cookie
const session = require('express-session')
const passport = require('passport')
const passportLocal = require('./config/passport-local-strategy')

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'))
app.use(expressLayouts)
//extract styles and scripts from the subpages into the layout
app.set('layout extractStyles',true)
app.set('layout extractScripts',true)



app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'codeial',
    //change the secret before deployment in production
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}))

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