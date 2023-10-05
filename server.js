const express = require("express")



const app = express()
app.use(express.json())

app.get("/", (req, res) => {
    res.send("API Home Page")
})

app.listen(3000, () => {
    console.log("API Running on Port 3000")
})