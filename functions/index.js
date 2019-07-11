const functions = require("firebase-functions");
const express = require("express");
const app = express();
const firebase = require("firebase");
const firebaseConfig = require("./config/firebaseConfig");
const FBAuth = require("./utils/FBAuth");
const { getAllPosts, createPost } = require("./handlers/posts");
const { registerUser, loginUser, uploadImage } = require("./handlers/users");

firebase.initializeApp(firebaseConfig);

// @route  GET /posts
// @desc   Get posts / Получение всех постов
// @access Public
app.get("/posts", getAllPosts);

// @route  POST /post
// @desc   Create post / Создание поста
// @access Private
app.post("/post", FBAuth, createPost);

// @route  GET api/register
// @desc   Registration / Регистрация
// @access Public
app.post("/register", registerUser);

// @route  GET api/login
// @desc   Login / Вход
// @access Public
app.post("/login", loginUser);

// @route  GET api/user/image
// @desc   Upload image / Загрузить картинку
// @access Private
app.post("/login", FBAuth, uploadImage);

exports.api = functions.region("europe-west1").https.onRequest(app);
