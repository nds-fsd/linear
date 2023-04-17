const express = require('express');
const {connectDB} =  require("./mongo/connection");
const cors = require('cors');
const userRouter = require('./routers/user.router.js')
const app = express();
connectDB().then(() => console.log("Connected to database!"))



app.use(cors());
app.use(express.json());
app.use(userRouter);

const server = app.listen(3001, () => {
    console.log('Server is up and running ⚡')
});
