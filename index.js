const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts')

app.use(express.static('./assets'))
app.use(expressLayouts)
//extract styles and scripts from the subpages into the layout
app.set('layout extractStyles',true)
app.set('layout extractScripts',true)

//Use express route 
app.use('/', require('./routes'));

app.set('view engine', 'ejs');
app.set('views', './views');


app.listen(port, function(err){

    if(err){
        console.log(`Error: ${err}`)
    }
    console.log(`Server running on port: ${port}`)
})