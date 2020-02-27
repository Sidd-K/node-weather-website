const request = require('request');

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic2lkZGkiLCJhIjoiY2s2OTBwZHBnMDU2azNtazl3bWZpMDNvayJ9.1kTZfV7ucCq664Xx4oNu2g&limit=1'; 
    request({url: url, json: true},(error, response) => {
        if(error){
            callback('Unable to connect to network!!');
        } else if(response.body.features.length ===0){
            callback('Unable to find location. Try another search');
        }else{
            const data = {
                location : response.body.features[0].place_name,
                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0]
        }
            callback('', data)
        }
    });
};

module.exports = geoCode;