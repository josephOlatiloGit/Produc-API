const express = require("express")
const mongoose = require("mongoose")
const Product = require("./productModule")



const app = express()
app.use(express.json())

app.get("/Homepage", (req, res) => {
    res.send("API Home Page")
})

app.post("/product", async (req, res) => {
    try {
        const product = await Product.creat(req.body)
        return res.status(200).send(product)
    } catch (error) {
        console.log(error)
        return res.status(500).send({ msg: "Something Went wrong" })
    }
})


// TO CONNECT APPLICATION TO DATA BASE
async function connectDB() {
    try {
        const connection = await mongoose.connect("mongodb://127.0.0.1:27017/productApi")
        app.listen(3000, () => {
            console.log("API Running on Port 3000")
        })
        console.log("DB connected succesfully")
    } catch (error) {
        console.log(error)
    }
}
connectDB()