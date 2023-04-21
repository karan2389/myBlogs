const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const User = require("./models/User");
const Post = require("./models/Post");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const fs = require("fs");
const uploadMiddleware = multer({ dest: "uploads/" });

const app = express();

const salt = bcrypt.genSaltSync(10);
const secret = "kugtutihvuyruhgg"; 
 
dotenv.config(); 

app.use(cors({ credentials: true, origin: "https://64423d90e7bf0324e8549160--cool-empanada-e7d70a.netlify.app/" }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));  
 
//MONGODB CONNECTION
const connect = async () => {
  try { 
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to mongodb.");
  } catch (error) {
    console.error(error);
  } 
}; 

//ROUTES
//REGISTER
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (error) {
    res.status(400).json(error);
  }
});
//LOGIN
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    //logged in
    jwt.sign({ username: userDoc._id }, secret, {}, (err, token) => {   
      if (err) throw err;
      res.cookie("token", token).json({
        id: userDoc._id,
        username, 
      });
    });
  } else {
    res.status(400).json("wrong credentials");
  }
});
//CHECKING IF LOGGED IN
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

//LOGOUT
app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

//ADD NEW POST
app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { title, summary, content } = req.body;

  const postDoc = await Post.create({
    title,
    summary,
    content,
    file: newPath,
  });
  res.json(postDoc);
});

// GET POSTS
app.get("/post", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 }).limit(10);
  res.json(posts);
});

//GET A POST
app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id);
  res.json(postDoc);
});

//SERVER SETUP
app.listen(4000, () => {
  connect();
  console.log("Connected to backend!!");
});
