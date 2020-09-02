// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors())

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8008;

app.listen(port, ()=>{
    console.log(`Server running on localhost:${port}...`)
})


//Get requests
app.get('/getData',(req, res) =>{
    try{
        res.send(projectData);
        console.log('Data sent...')
    }catch(error){
        console.log('error', error)
    }
})

//POST requests
app.post('/postData', (req, res)=>{
    const newData = {
        date: req.body.date,
        temp: req.body.temp,
        feel: req.body.feel
    }

    projectData = {};
    projectData = newData;

    console.log('data recived...');
})