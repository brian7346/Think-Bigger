import axios from "axios";
import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from "./types";
import { async } from "q";

export const loginUserAction = (userData, history) => ({
  type: SET_USER,
  payload: userData,
  history
});

export const tryLoginUserAction = async userData => {
  const res = await axios.post("/login", userData);

  const FBIdToken = `Bearer ${res.data.token}`;

  localStorage.setItem("FBIdToken", FBIdToken);

  // Set out token for each request
  // Добавляем токен, чтобы его отправлять с каждым запросом
  axios.defaults.headers.common["Authorization"] = FBIdToken;
  return res.data;
};

export const getUserDataAction = async () => {
  const res = await axios.get("/user");
  return res;
};
