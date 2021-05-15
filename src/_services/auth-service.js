import axios from "axios";
import authHeader from "_helpers/auth-header";
import { urlServer } from "_services/api";

export const AuthDataService = {
  sendResetLink,
  resetPassword,
};

function getHttp() {
  return axios.create({
    baseURL: urlServer + "/auths",
    headers: authHeader(),
  });
}

function sendResetLink(body) {
  return getHttp().post("/send-reset-link", body);
}

function resetPassword(body) {
  return getHttp().post("/reset-password", body);
}
