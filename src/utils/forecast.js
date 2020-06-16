const request = require('request')

const forecast = (latitude, longtitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=93eff1ae8a02a56b1329b0418aa886b3&query=' + latitude + ',' + longtitude

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('unable to connect to service')
        } else if (body.error) {
            callback('wrong coordinates')
        } else {
            callback(undefined, body.current.temperature)
        }
    })
}

module.exports = forecast