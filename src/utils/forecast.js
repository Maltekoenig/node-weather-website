const request = require('request')

const forecast = (latitude, longtitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=93eff1ae8a02a56b1329b0418aa886b3&query=' + latitude + ',' + longtitude

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('unable to connect to service')
        } else if (body.error) {
            callback('wrong coordinates')
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' 
            + body.current.feelslike + ' degrees out. The humidity is ' + body.current.humidity + '%.')
        }
    })
}

module.exports = forecast