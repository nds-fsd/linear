const express = require("express");
const { connectDB } = require("./mongo/connection");
const cors = require("cors");
const generalRouter = require("./routers/index");
const app = express();
connectDB().then(() => console.log("Connected to database!"));

const dotenv = require("dotenv");
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(generalRouter);

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`Server is up and running at port ${PORT} ⚡`);
});
