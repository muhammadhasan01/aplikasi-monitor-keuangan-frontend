import axios from "axios";
import authHeader from "_helpers/auth-header";
import { urlServer } from "_services/api";

export const UserDataService = {
  getUsers,
  createUser,
  getUserByID,
  updateUser,
  deleteUser,
};

function getHttp() {
  return axios.create({
    baseURL: urlServer + "/accounts",
    headers: authHeader(),
  });
}

function getUsers() {
  return getHttp().get("");
}

function createUser(data) {
  return getHttp().post("", data);
}

function getUserByID(id) {
  return getHttp().get(`/${id}`);
}

function updateUser(id, data) {
  return getHttp().put(`/${id}`, data);
}

function deleteUser(id) {
  return getHttp().delete(`/${id}`);
}