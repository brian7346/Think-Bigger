import axios from "axios";
import { SET_USER } from "./types";

export const loginUserAction = (userData, history) => ({
  type: SET_USER,
  payload: userData,
  history
});

export const tryLoginUserAction = async userData => {
  const res = await axios.post("/login", userData);
  setAuthHeader(res.data.token);
  return res.data;
};

export const getUserDataAction = async () => {
  const res = await axios.get("/user");
  return res;
};

export const redisterUserAction = (newUserData, history) => ({
  type: SET_USER,
  payload: newUserData,
  history
});

export const tryRedisterUserAction = async newUserData => {
  const res = await axios.post("/register", newUserData);
  setAuthHeader(res.data.token);
  return res.data;
};

const setAuthHeader = token => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);

  // Set out token for each request
  // Добавляем токен, чтобы его отправлять с каждым запросом
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};
