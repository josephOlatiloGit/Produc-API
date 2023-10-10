const mongoose = require("mongoose")

const productShema = mongoose.Schema(
    {
        // id: { type: Number, required: true },
        productname: { type: String, require: { true: "Please Enter a Product Name" } },
        quantity: { type: Number, required: true, default: 0 },
        price: { type: Number, required: true, },
        image: { type: String, required: false, }
    }, {
    timestamps: true
}
)

const Product = mongoose.model("Product", productShema)

module.exports = Product;