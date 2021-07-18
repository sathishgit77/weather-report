const request = require("postman-request")

const geocode = (address, callback) => {
    const goeLocationrequestUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoic2F0aGlzaHNrYzc3IiwiYSI6ImNrcXV1MDZndTA3d2syb3BtOWxwMGU2YmQifQ.b80N3EihZTIGl6Pgi48Kwg&limit=1"
    request({url: goeLocationrequestUrl, json: true}, (error, { body }) => {
        if (error) {
            callback("Not able to fetch the geolocation", undefined)
        } else if (body.features == 0){
            callback("Invalid location", undefined)
        } else {
            const {center, place_name} = body.features[0]
            callback(undefined, {
                latitude: center[1],
                longitude: center[0],
                location: place_name
            })
        }
    })
}

module.exports = geocode