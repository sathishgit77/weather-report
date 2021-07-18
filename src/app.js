const path = require("path")
const express = require("express")
const hbs = require("hbs")
const forecast = require("./utils/forecast")
const geocode = require("./utils/geocode")

const app = express()
const port = process.env.PORT || 3000

const publicPath = path.join(__dirname, "../public")
const templatePath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

app.set('view engine', 'hbs')
app.set('views', templatePath)
app.use(express.static(publicPath))

hbs.registerPartials(partialsPath)

app.get("", (req, res) => {
    res.render("index", {
        "title": "Weather",
        "name": "Sathish Kumar"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        "title" : "About",
        "name" : "Sathish Kumar",
        "text": "This page is about the site"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        "title" : "Help",
        "helpText" : "This page is to help you.",
        "name": "Sathish Kumar"
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.address || req.query.address == "") {
        return res.send({
            "error": "Please provice a valid address!"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                "error": error
            })
        }

        forecast(latitude, longitude, (error, {temperature, feelslike}) => {
            if (error) {
                return res.send({
                    "error": error
                })
            }

            res.send({
                "address": location,
                "temperature": temperature,
                "feelslike": feelslike
            })
        })
    })
})

app.get("/help/*", (req, res) => {
    res.render("404", {
        "title": "404 Page",
        "name": "Sathish help data 404",
        "text": "Help data article not found"
    })
})

app.get("*", (req, res) => {
    res.render("404", {
        "title": "404 Page",
        "name": "Sathish 404",
        "text": "404 not found"
    })
})

app.listen(port, () => {
    console.log("Server is up at " + port)
})