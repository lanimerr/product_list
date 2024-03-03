const router = require("express").Router();
const faker = require("@faker-js/faker");
const { Product, Review } = require("../models/product");


//GET generate-fake-data...90 randomly generated items and reviews
router.get("/generate-fake-data", async (req, res, next) => {
  try {
    for (let i = 0; i < 90; i++) {
      let product = new Product();

      product.category = faker.commerce.department();
      product.name = faker.commerce.productName();
      product.price = faker.commerce.price();
      product.image = "https://via.placeholder.com/250?text=Product+Image";

      const reviewCount = Math.floor(Math.random() *3) + 1;
      for (let j = 0; j < reviewCount; j++) {
        let review = new Review({
          username: faker.internet.username(),
          text: faker.lorem.paragraph(),
        });

        product.reviews.push(review);
      }

      await product.save();
    }
    console.log("Fake data generated successfully"); 
    res.end("Fake data generated successfully");
  } catch (err) {
    console.error("Error generating fake data:", err); 
    next(err);
  }
});

//GET generated fake reviews
router.get("/generate-fake-reviews", async (req, res, next) => {
  try {
    const products = await Product.find({});
    for (const product of products) {
      for (let i = 0; i < 2; i++) {
        let review = new Review({
          username: faker.name.firstName(),
          text: faker.lorem.sentences(),
          product: product._id,
      });

        await review.save();
        product.reviews.push(review);
      }
      await product.save();
    }
    res.end("Fake reviews generated successfully");
  } catch (err) {
    next(err);
  }
});

//GET gets a list of products
router.get("/products", async (req, res, next) => {
  const perPage = 9;
  const page = req.query.page || 1;
  const category = req.query.category;
  const sort = req.query.sort;
  const item = req.query.item;

  let query = {};
  if (category && category !== "default") {
    query.category = category;
  }

  let sortOptions = {};
  if (sort === "highToLow") {
    sortOptions.price = -1;
  } else if (sort === "lowToHigh") {
    sortOptions.price = 1;
  }

  if (item) {
    query.$text = { $search: item};
  }

  try {
    const products = await Product.find(query)
      .sort(sortOptions)
      .skip(perPage * page - perPage)
      .limit(perPage)

    const total = await Product.countDocuments(query); // fetches the count of documents from the product collection
    res.send({ products, total });
  } catch (err) {
    next(err);
  }
});


//GET a specific product by its id
router.get("/products/:productId", async (req, res) => {
  const id = req.params.productId;
  const product = await Product.findById(id)
  res.json(product)
});

//GET reviews for a specific product by its id and returns it 
router.get("/products/:productId/reviews", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId).populate("reviews");
    res.send(product.reviews);
  } catch (err) {
    console.error(err);
    res.send(err);
  }
});

//creates a new product in the database
router.post("/products", (req, res) => {
  const newProduct = new Product({
    name: req.body.name, 
    price: req.body.price,
    category: req.body.category,
    image: req.body.image,
    reviews: []
  });

  newProduct.save((err, product) => {
    if (err) {
      res.send(err);
    } else {
      res.json(product);
    }
  });
});

//deletes product by its id from the database
router.delete("/products/:productId", async (req, res) => {
  try {
    const id = req.params.productId;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "product not found"});
    }
    return res.status(200).json({ message: "Product delete successfully"});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error"});
  }
});

//delete review by id
router.delete("/reviews/:reviewId", async (req, res) => {
  try {
    const id = req.params.reviewId;
    const review = await Review.findByIdAndDelete(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found"});
    }
    return res.status(200).json({ message: "Review delete successfully"});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error"});
  }
});

module.exports = router;
