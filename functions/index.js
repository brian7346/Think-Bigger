const functions = require("firebase-functions");
const express = require("express");
const app = express();
const firebase = require("firebase");
const firebaseConfig = require("./config/firebaseConfig");
const FBAuth = require("./utils/FBAuth");
const { getAllPosts, createPost } = require("./handlers/posts");
const {
  registerUser,
  loginUser,
  uploadImage,
  addUserDetails
} = require("./handlers/users");

firebase.initializeApp(firebaseConfig);

// @route  GET /posts
// @desc   Get posts / Получение всех постов
// @access Public
app.get("/posts", getAllPosts);

// @route  POST /post
// @desc   Create post / Создание поста
// @access Private
app.post("/post", FBAuth, createPost);

// @route  POST api/register
// @desc   Registration / Регистрация
// @access Public
app.post("/register", registerUser);

// @route  POST api/login
// @desc   Login / Вход
// @access Public
app.post("/login", loginUser);

// @route  POST api/user/image
// @desc   Upload image / Загрузить картинку
// @access Private
app.post("/user/image", FBAuth, uploadImage);

// @route  POST api/user
// @desc   Add details / Добавляет детали к профилю
// @access Private
app.post("/user", FBAuth, addUserDetails);

exports.api = functions.region("europe-west1").https.onRequest(app);
