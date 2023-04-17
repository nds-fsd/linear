const express = require('express');
const User = require('../mongo/schemas/user.schema.js')
const userRouter = express.Router();


userRouter.get('/users', async (req,res) => {
  try{
    const allUsers = await User.find()
    if(allUsers.length === 0){
    res.status(404).json({message: "No hay usuarios"})
    }
    res.status(200).json(allUsers)  
  }catch(e){
    res.status(500).json({message : e})
  }
})


userRouter.post('/users' , async (req, res) => {
  console.log("Paso por aqui")
  const { name, lastname, email, password } = req.body
  const data = { name, lastname, email, password }
  const newUser = new User(data);
  await newUser.save()
  res.json(newUser)
});


userRouter.get('/users/:id', async (req, res) => {
  const selectedUser = await User.findById(req.params.id);
  res.json(selectedUser);
});



userRouter.patch('/users/:id', async (req, res) => {
  const selectedUser = await User.findByIdAndUpdate(req.params.id, req.body);
  res.json(selectedUser);
});


userRouter.delete('/users/:id',  async (req, res) => {
  const selectedUser = await User.findByIdAndDelete(req.params.id);
  res.json(selectedUser); 
});


module.exports = userRouter;