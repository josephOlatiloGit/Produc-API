const express = require("express")
const mongoose = require("mongoose")
const Product = require("./modules/productModule.js")

// Product API

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/Homepage", (req, res) => {
    res.send("API Home Page")
})



//To Get all Products form the DB:
app.get("/products", async (req, res) => {
    try {
        const products = await Product.find({})
        return res.status(200).send(products)
    } catch (error) {
        console.log(error)
        return res.status(500).send({ 'msg': "Something went wrong" })
    }
})
//Rout to Fetch data by ID:
app.get("/product/:id", async (req, res) => {
    const { id } = req.params
    try {
        const product = await Product.findById(id)
        return res.status(200).send(product)
    } catch (error) {
        console.log(error)
        return res.status(500).send({ 'msg': "Product Not Found" })

    }
})

// Rout To Update Data from the DB"
app.put("/product/:id", async (req, res) => {
    const { id } = req.params
    try {
        const product = await Product.findByIdAndUpdate(id, req.body)
        if (!product) {
            return res.status(404).send({ "msg": `can not find product with ID ${id}` })
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).send(updatedProduct)

    } catch (error) {
        return res.status(500).send({ 'msg': "Something went wrong" })
    }
})

//To create new product to DB:
app.post("/products", async (req, res) => {
    try {
        const products = await Product.create(req.body)
        return res.status(200).send(products)
    } catch (error) {
        console.log(error)
        return res.status(500).send({ 'msg': "Failed to save Product" })

    }


})
//To Delete product By ID:
app.delete("/product/:id", async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndDelete(id, req.body)
        if (!product) {
            return res.status(404).send({ message: `cannont find product with ${"ID", id}` })
        }
        return res.status(200).send({ message: "Deleted succesfully" })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ "msg": "Something went wrong" })

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