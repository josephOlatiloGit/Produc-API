const mongoose = require("mongoose")

const productShema = mongoose.Schema(
    {
        productname: { tyrpe: String, require: { true: "Please Enter a Product Name" } },
        quantity: { type: Number, require: true, default: 0 },
        price: { type: Number, require: true, },
        image: { type: String, require: false, }
    }, {
    timestamps: true
}
)

const Product = mongoose.model("Product", productShema)

module.exports = Product;