const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const User = require("../mongo/schemas/user.schema");
const jwtSecret = process.env.JWT_SECRET;

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const data = req.body;
  // * Make sure request has the email
  if (!data.email) {
    return res.status(400).json({ error: { register: "Email not recieved" } });
  }
  const existingUser = await User.findOne({ email: data.email });
  // * If the user is found, return an error because there is already a user registered
  if (existingUser) {
    return res
      .status(400)
      .json({ error: { email: "Email already registered" } });
  } else {
    if (!data.email.match(emailRegex)) {
      return res.status(400).json({ error: { email: "Insert a valid email" } });
    }
    const newUser = new User({
      email: data.email,
      password: data.password,
      firstname: data.firstname,
      lastname: data.lastname,
      pronouns: data.pronouns,
      teamrole: data.teamrole,
      birthday: data.birthday,
      profilepic: data.profilepic,
    });
    const savedUser = await newUser.save();
    if (savedUser) {
      return res.status(201).json({
        token: savedUser.generateJWT(),
        user: {
          email: savedUser.email,
          firstname: savedUser.firstname,
          lastname: savedUser.lastname,
          pronouns: savedUser.pronouns,
          teamrole: savedUser.teamrole,
          birthday: savedUser.birthday,
          id: savedUser._id,
          profilepic: data.profilepic,
        },
      });
    } else {
      return res
        .status(500)
        .json({ error: { firstName: "Error creating new User :(", err } });
    }
  }
});

// ! --------------------------------------

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // * Validate, email and password were provided in the request
  if (!email || !password) {
    return res
      .status(400)
      .json({ error: { login: "Missing email or password" } });
  }
  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res
        .status(400)
        .json({ error: { email: "User not found, please Register" } });
    }
    // * Validate password with bcrypt library
    if (!foundUser.comparePassword(password)) {
      return res.status(400).json({ error: { password: "Invalid Password" } });
    }
    // * if everything is ok, return the new token and user data

    return res.status(200).json({
      token: foundUser.generateJWT(),
      user: {
        email: foundUser.email,
        name: foundUser.name,
        lastname: foundUser.lastname,
        firstname: foundUser.firstname,
        pronouns: foundUser.pronouns,
        birthday: foundUser.birthday,
        teamrole: foundUser.teamrole,
        profilepic: foundUser.profilepic,
        id: foundUser._id,
      },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: { register: "Error Login in :(", error: err.message } });
  }
});

const jwtMiddleware = (req, res, next) => {
  // Recogemos el header "Authorization". Sabemos que viene en formato "Bearer XXXXX...",
  // así que nos quedamos solo con el token y obviamos "Bearer "
  const authHeader = req.headers["authorization"];

  if (!authHeader)
    return res.status(401).json({ error: "Unauthorized MISSING HEADER" });
  const token = authHeader.split(" ")[1];
  // Si no hubiera token, respondemos con un 401
  if (!token)
    return res.status(401).json({ error: "Unauthorized and missing token" });

  let tokenPayload;

  try {
    // Si la función verify() funciona, devolverá el payload del token
    tokenPayload = jwt.verify(token, jwtSecret);
  } catch (error) {
    // Si falla, será porque el token es inválido, por lo que devolvemo error 401
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Guardamos los datos del token dentro de req.jwtPayload, para que esté accesible en los próximos objetos req
  req.jwtPayload = tokenPayload;
  next();
};

const jwtVerifier = (token, callback) => {
  jwt.verify(token, jwtSecret, callback);
};

module.exports = {
  authRouter,
  jwtMiddleware,
  jwtVerifier
};
