const express = require("express");
const connectToMongoDB = require("./dbconnection");
const productRouter = require("./src/modules/products/product.routes");
const cartRouter = require("./src/modules/cart/cart.routes");
const authRouter = require("./src/modules/auth/auth.routes");
const cors = require("cors");

const app = express();
app.use(cors({
  origin: ['https://node-tfi.web.app', 'http://localhost:4200',],
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json());

initServer = async () => {
  await connectToMongoDB();
  app.use(productRouter, cartRouter, authRouter);
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
}


initServer();