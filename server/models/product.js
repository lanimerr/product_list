const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    username: String, 
    text: String,
    product: { type: Schema.Types.ObjectId, ref: "Product" },
});

const ProductSchema = new Schema({
    category: String,
    name: String,
    price: Number,
    image: String,
    reviews: [ReviewSchema],
});

module.exports = {
    Product: mongoose.model("Product", ProductSchema),
    Review: mongoose.model("Review", ReviewSchema)
};