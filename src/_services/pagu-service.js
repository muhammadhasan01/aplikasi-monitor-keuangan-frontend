import axios from "axios";
import {urlServer} from "_services/api";
import authHeader from "_helpers/auth-header";

export const PaguDataService = {
  getAllPagus,
  updateAlokasiPagu,
  getSisaPagu,
  getAlokasiPagu,
  getPenggunaanPagu
}

function getHttp() {
  return axios.create({
    baseURL: (urlServer + "/pagu"),
    headers: authHeader()
  });
}

function getAllPagus() {
  return getHttp().get();
}

function updateAlokasiPagu(unit, subunit, ado, year, data){
  return getHttp().post(`/${unit}/${subunit}/${ado}/${year}`, data);
}

function getSisaPagu(unit, subunit, ado, year){
  return getHttp().get(`/sisa/${unit}/${subunit}/${ado}/${year}`);
}

function getAlokasiPagu(unit, subunit, ado, year){
  return getHttp().get(`/alokasi/${unit}/${subunit}/${ado}/${year}`);
}

function getPenggunaanPagu(unit, subunit, ado, year){
  return getHttp().get(`/penggunaan/${unit}/${subunit}/${ado}/${year}`);
}
