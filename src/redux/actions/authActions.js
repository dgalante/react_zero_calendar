import { types } from "../types/types";
import { requestWithOutToken, requesWithToken } from "../../helpers/httpClient";
import Swal from "sweetalert2";

export const startLogin = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await requestWithOutToken(
        "/auth",
        { email, password },
        "POST"
      );
      saveToken(response.data.token);
      const { uid, name } = response.data;
      dispatch(login({ uid, name }));
    } catch (error) {
      Swal.fire("Error", error.data.message);
      console.error("login error > ", error.data);
    }
  };
};

export const startRegister = (name, email, password) => {
  return async (dispatch) => {
    try {
      const response = await requestWithOutToken(
        "/auth/new",
        { name, email, password },
        "POST"
      );
      saveToken(response.data.token);
      dispatch(
        login({
          uid: response.data.uid,
          name: response.data.name,
        })
      );
    } catch (error) {
      Swal.fire("Error", "Error al crear el usuario");
      console.error("login error > ", error);
    }
  };
};

const saveToken = (token) => {
  localStorage.setItem("token", token);
  localStorage.setItem("token-init-date", new Date().getTime());
};

const login = (user) => ({
  type: types.AUTH_LOGIN,
  payload: user,
});

export const startChecking = () => {
  return async (dispatch) => {
    try {
      const response = await requesWithToken("/auth/renew", {}, "GET");
      saveToken(response.data.token);
      dispatch(
        login({
          uid: response.data.uid,
          name: response.data.name,
        })
      );
    } catch (error) {
      dispatch(checkingFinish());
    }
  };
};

const checkingFinish = () => ({
  type: types.AUTH_CHECKING_FINISH,
});

export const logout = () => {
  localStorage.clear();
  return {
    type: types.AUTH_LOGOUT,
  };
};
