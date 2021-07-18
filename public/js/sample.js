const weatherForm = document.querySelector("form")
const locationInput = document.querySelector("form #location")
const message1 = document.querySelector("#message1")
const message2 = document.querySelector("#message2")

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    message1.textContent = "Loading..."
    message2.textContent = ""
    const address = locationInput.value
    fetch("http://localhost:3000/weather?address=" + address).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error
                message2.textContent = ""
            } else {
                message1.textContent = "Your Location is ..." + data.address
                message2.textContent = "It's temperature is ..." + data.temperature
            }
        })
    })
})