const request = require('request');

const forecast = ((lat,long, callback) => {
    const url = 'https://api.darksky.net/forecast/312b9619c3a99e5622de08db068535f7/'+ encodeURIComponent(lat) + ',' + encodeURIComponent(long) +'?units=si';
    request({url:url, json: true},(error, response) => {
        if(error){
            callback('Network Problem.!!!');
        } else if(response.body.error){
            callback(response.body.error);
        } else {
            const data = {
                temp : response.body.currently.apparentTemperature,
                rainPrecip : response.body.currently.precipProbability,
                summary :  response.body.daily.data[0].summary
            }
            callback('',data.summary + ' It is currently '+ data.temp + ' degrees out. The high today is ' + response.body.daily.data[0].temperatureHigh + ' with low of '+ response.body.daily.data[0].temperatureLow  + '. There is a rain probability of ' + data.rainPrecip + ' %');
        }
    });
});

module.exports = forecast;