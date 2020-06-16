const request = require('request')

const geocode = (address, callback) => {   
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWFsdGVkZXJrYWx0ZSIsImEiOiJja2JnY2ZmdGIxNDV6MzBwOG82aXRzMjVyIn0.XWCB6eqI_JwtKC5elT3pUQ'

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('unable to connect to service', undefined)
        } else if (body.features.length === 0) {
            callback('unable to find location', undefined)
        } else {

            const data = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            }
           
            callback(undefined, data)
        }
    })
}

module.exports = geocode