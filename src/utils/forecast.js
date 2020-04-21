const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=3f2f246464f4082808d462cc8509a8a5&query='+latitude+','+longitude+''
    request({url , json :true}, (error, {body}) => {
        
        if(error)
        {
            callback('Unable to conect weather API', undefined)
        }else if(body.error){
            console.log('Unable to find locatation', error)
        }else{
            callback(undefined, body.current.weather_descriptions[0] +'until evening and breezy through out the day. it is currently '+body.current.temperature+' degree out there is '+body.current.feelslike+' % chance of rain')
        }
        console.log(url)
    })
}




  module.exports = forecast