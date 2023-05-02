// const userRouter = require('./routers/user.router.js')
// const projectRouter= require('./routers/project.router.js')
// const taskRouter= require('./routers/task.router.js')
const express = require('express');
const {connectDB} =  require("./mongo/connection");
const cors = require('cors');
const generalRouter= require('./routers/index')
const app = express();
connectDB().then(() => console.log("Connected to database!"))


const dotenv = require("dotenv")
dotenv.config()





// app.use(userRouter);
// app.use(projectRouter);
// app.use(taskRouter);
app.use(cors());
app.use(express.json());
app.use(generalRouter);



const PORT=3001
const server = app.listen(PORT, () => {
    console.log(`Server is up and running at port ${PORT} ⚡`)
});
