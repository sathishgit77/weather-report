const request = require("postman-request")

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=c1af6f33c7773a7355c68ed37f7b6155&query=" + latitude + ", " + longitude + "&units=f"
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback("Not able to fetch weather information!", undefined)
        } else if (body.error) {
            callback("Unable to find the location!", undefined)
        } else {
            const {weather_descriptions, temperature, feelslike} = body.current;
            callback(undefined, {
                weather: weather_descriptions[0],
                temperature,
                feelslike
            })
        }
    })
}

module.exports = forecast