const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//define paths for Express config
const staticPath = path.join(__dirname, '../public/');
const viewspath = path.join(__dirname, '../templates/views/');
const partialpath = path.join(__dirname, '../templates/partials/');

//Setup HandleBars engine and view location
app.set('view engine', 'hbs');
app.set('views',viewspath);
hbs.registerPartials(partialpath);

// setup static directory
app.use(express.static(staticPath));

//home
app.get('',(req, res) => {
    // res.send('Hello from Express..  You are at home page...!!!!!');
    res.render('index',{
        title: 'Home Page',
        name: 'Siddharth '
    });
});

// /help
app.get('/help',(req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Siddharth '

    });
});

// /about
app.get('/about',(req, res) => {
    res.render('about',{
        title: 'About Page',
        name: 'Siddharth '

    });
});

// /weather
app.get('/weather',(req, res) => {
    if(!req.query.address){
        return res.send({
            error : 'Please provide the address'
        });
    } else {
        geocode(req.query.address,(error,data) => {
            if(error){
                return res.send({error});
             }
             forecast(data.latitude , data.longitude, (error, forecastdata) => {
                if(error)
                    return res.send({error});
                res.send({
                    location : data.location,
                    foreCast : forecastdata
                });
            });
        });
    }
});

// error pages
app.get('*',(req, res) => {
    res.render('404',{
        title: 'Error Page',
        name: 'Siddharth',
        errorMessage: 'Page Not Found'
    });
});


app.listen(3000,()=>{
    console.log('Server start at port 3000');
})