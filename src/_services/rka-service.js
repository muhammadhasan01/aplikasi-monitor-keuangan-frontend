import axios from "axios";
import authHeader from "_helpers/auth-header";
import { urlServer } from "_services/api";

export const RKADataService = {
  getAllRKA,
  getRKAUnitADO,
  loadAllRKA,
  createRKA,
  ambilAlokasi,
};

function getHttp() {
  return axios.create({
    baseURL: urlServer + "/rka",
    headers: authHeader(),
  });
}

function getAllRKA() {
  return getHttp().get(``);
}

function getRKAUnitADO(unit, subunit, ADO) {
  return getHttp().get(`${unit}/${subunit}/ADO/${ADO}`);
}

function loadAllRKA(unit, subunit) {
  return getHttp().get(`/${unit}/${subunit}`);
}

function createRKA(unit, subunit, body) {
  return getHttp().post(`/${unit}/${subunit}`, body);
}

function ambilAlokasi(id, body) {
  return getHttp().post(`/tambah/alokasi/${id}`, body);
}