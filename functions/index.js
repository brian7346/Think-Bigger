const functions = require("firebase-functions");
const express = require("express");
const app = express();
const firebase = require("firebase");
const firebaseConfig = require("./config/firebaseConfig");
const FBAuth = require("./utils/FBAuth");
const { db } = require("./utils/admin");
const {
  getAllPosts,
  createPost,
  getPost,
  commentOnPost,
  likePost,
  unlikePost,
  deletePost
} = require("./handlers/posts");
const {
  registerUser,
  loginUser,
  uploadImage,
  addUserDetails,
  getAuthenticatedUser,
  getUserDetails,
  markNotificationsRead
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

// @route  GET /user/:handle
// @desc  Get user details / Получить информацио о пользователе
// @access Private
app.get("/user/:handle", FBAuth, getUserDetails);

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

// @route  DELETE /post/:postId
// @desc  Delete post / Удалить пост
// @access Private
app.delete("/post/:postId", FBAuth, deletePost);

// @route  POST /notifications
// @desc  Delete post / Удалить пост
// @access Private
app.post("/notifications", FBAuth, markNotificationsRead);

exports.api = functions.region("europe-west1").https.onRequest(app);
exports.createNotificationOnLike = functions
  .region("europe-west1")
  .firestore.document("likes/{id}")
  .onCreate(snapshot => {
    return db
      .doc(`/posts/${snapshot.data().postId}`)
      .get()
      .then(doc => {
        if (
          doc.exists &&
          doc.data().userHandle !== snapshot.data().userHandle
        ) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: "like",
            read: false,
            postId: doc.id
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  });

exports.deleteNotificationOnUnLike = functions
  .region("europe-west1")
  .firestore.document("likes/{id}")
  .onDelete(snapshot => {
    return db
      .doc(`/notifications/${snapshot.id}`)
      .delete()
      .catch(err => {
        console.error(err);
        return;
      });
  });

exports.createNotificationOnComment = functions
  .region("europe-west1")
  .firestore.document("comments/{id}")
  .onCreate(snapshot => {
    return db
      .doc(`/posts/${snapshot.data().postId}`)
      .get()
      .then(doc => {
        if (
          doc.exists &&
          doc.data().userHandle !== snapshot.data().userHandle
        ) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: "comment",
            read: false,
            postId: doc.id
          });
        }
      })
      .catch(err => {
        console.error(err);
        return;
      });
  });

exports.onUserImageChange = functions
  .region("europe-west1")
  .firestore.document("/users/{userId}")
  .onUpdate(change => {
    if (change.before.data().imageUrl !== change.after.data().imageUrl) {
      const batch = db.batch();
      return db
        .collection("posts")
        .where("userHandle", "==", change.before.data().handle)
        .get()
        .then(data => {
          data.forEach(doc => {
            const post = db.doc(`/posts/${doc.id}`);
            batch.update(post, { userImage: change.after.data().imageUrl });
          });
          return batch.commit();
        });
    } else return true;
  });

exports.onPostDelete = functions
  .region("europe-west1")
  .firestore.document("/posts/{postId}")
  .onDelete((snapshot, context) => {
    const postId = context.params.postId;
    const batch = db.batch();
    return db
      .collection("comments")
      .where("postId", "==", postId)
      .get()
      .then(data => {
        data.forEach(doc => {
          batch.delete(db.doc(`/comments/${doc.id}`));
        });
        return db
          .collection("likes")
          .where("postId", "==", postId)
          .get();
      })
      .then(data => {
        data.forEach(doc => {
          batch.delete(db.doc(`/likes/${doc.id}`));
        });
        return db
          .collection("notifications")
          .where("postId", "==", postId)
          .get();
      })
      .then(data => {
        data.forEach(doc => {
          batch.delete(db.doc(`/notifications/${doc.id}`));
        });
        return batch.commit();
      })
      .catch(err => console.error(err));
  });
