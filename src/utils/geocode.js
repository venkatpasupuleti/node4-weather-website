const request = require('request')
const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicGFzdXB1bGV0aTY1IiwiYSI6IlkzTkFrancifQ.O1W-x7PhABBR9Cxo5grikw&limit=1'
    console.log(url)
    request({url : url, json : true}, (error, {body}) => {
           if (error)
           {
               callback('Unable to conect Location services', undefined)
           }else if(body.features.length === 0)
           {
                  callback('Unable to find location and try another search  and longitude', undefined)
           } else{
                callback(undefined, {
                    latitude: body.features[0].center[1],
                    longitude : body.features[0].center[0],
                    location : body.features[0].place_name
                })
           }

    }) 


}


module.exports = geoCode