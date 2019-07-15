const functions = require("firebase-functions");
const express = require("express");
const app = express();
const firebase = require("firebase");
const firebaseConfig = require("./config/firebaseConfig");
const FBAuth = require("./utils/FBAuth");
const {
  getAllPosts,
  createPost,
  getPost,
  commentOnPost,
  likePost,
  unlikePost
} = require("./handlers/posts");
const {
  registerUser,
  loginUser,
  uploadImage,
  addUserDetails,
  getAuthenticatedUser
} = require("./handlers/users");

firebase.initializeApp(firebaseConfig);

// @route  POST api/register
// @desc   Registration / Регистрация
// @access Public
app.post("/register", registerUser);

// @route  POST /login
// @desc   Login / Вход
// @access Public
app.post("/login", loginUser);

// @route  POST /user/image
// @desc   Upload image / Загрузить картинку
// @access Private
app.post("/user/image", FBAuth, uploadImage);

// @route  POST /user
// @desc   Add details / Добавляет детали к профилю
// @access Private
app.post("/user", FBAuth, addUserDetails);

// @route  GET /user
// @desc   Get Auth user / Получает пользователя, который вошел
// @access Private
app.get("/user", FBAuth, getAuthenticatedUser);

// @route  GET /posts
// @desc   Get posts / Получение всех постов
// @access Public
app.get("/posts", getAllPosts);

// @route  POST /post
// @desc   Create post / Создание поста
// @access Private
app.post("/post", FBAuth, createPost);

// @route  GET /post/:postId
// @desc   Get post by id / Получение поста по id
// @access Public
app.get("/post/:postId", getPost);

// @route  POST /post/:postId/comment
// @desc   Create comment / Создание комента
// @access Private
app.post("/post/:postId/comment", FBAuth, commentOnPost);

// @route  GET /post/:postId/like
// @desc  Like post / Поставить лайк
// @access Private
app.get("/post/:postId/like", FBAuth, likePost);

// @route  GET /post/:postId/unlike
// @desc  Unlike post / Поставить лайк
// @access Private
app.get("/post/:postId/unlike", FBAuth, unlikePost);

exports.api = functions.region("europe-west1").https.onRequest(app);
