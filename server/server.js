const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");


mongoose.connect("mongodb://127.0.0.1/products", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

app.use(cors());

const mainRoutes = require("./routes/main");

app.use(mainRoutes);

const PRODUCTS_PER_PAGE =10;

app.get("/products", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const skip = (page - 1) * PRODUCTS_PER_PAGE;
        const products = await Product.find().skip(skip).limit(PRODUCTS_PER_PAGE);
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/products/total", async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments();
        const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
        res.status(200).json({ totalPages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!'});
});

app.listen(8000, () => {
    console.log("Node.js listening on port " + 8000);
});