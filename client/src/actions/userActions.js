import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER
} from "./types";
import axios from "axios";

export const loginUserAction = (userData, history) => async dispatch => {
  dispatch({ type: LOADING_UI });
  try {
    const res = await axios.post("/login", userData);

    setAuthorizationHeader(res.data.token);
    dispatch(getUserData());

    history.push("/");
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  }
};

export const registerUserAction = (newUserData, history) => async dispatch => {
  dispatch({ type: LOADING_UI });
  try {
    const res = await axios.post("/register", newUserData);

    setAuthorizationHeader(res.data.token);
    dispatch(getUserData());
    history.push("/");
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  }
};

export const logoutUserAction = () => dispatch => {
  localStorage.removeItem("FBIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = () => async dispatch => {
  dispatch({ type: LOADING_USER });
  try {
    const res = await axios.get("/user");

    dispatch({
      type: SET_USER,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};

export const uploadImageAction = formData => async dispatch => {
  dispatch({ type: LOADING_USER });
  try {
    await axios.post("/user/image", formData);
    dispatch(getUserData());
  } catch (err) {
    console.log(err);
  }
};

export const editUserDetailsAction = userDetails => async dispatch => {
  dispatch({ type: LOADING_USER });
  try {
    await axios.post("/user", userDetails);
    dispatch(getUserData());
  } catch (err) {
    console.log(err);
  }
};

const setAuthorizationHeader = token => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};
