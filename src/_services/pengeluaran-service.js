import axios from "axios";
import authHeader from "_helpers/auth-header";
import { urlServer } from "_services/api";

export const pengeluaranDataService = {
  getAllPengeluaran,
  getPengeluaran,
  inputPengeluaranRKA,
  removePengeluaran,
  undoPengeluaran,
};

function getHttp() {
  return axios.create({
    baseURL: urlServer + "/pengeluaran",
    headers: authHeader(),
  });
}

function getAllPengeluaran() {
  return getHttp().get("");
}

function getPengeluaran(id) {
  return getHttp().get(`/${id}`);
}

function inputPengeluaranRKA(body) {
  return getHttp().post("", body);
}

function removePengeluaran(id) {
  return getHttp().delete(`/${id}`);
}

function undoPengeluaran(id) {
  return getHttp().delete(`/undo/${id}`);
}
