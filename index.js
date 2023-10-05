const express = require('express');
const app = express();
const port = 8000;

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