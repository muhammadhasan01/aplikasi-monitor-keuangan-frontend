import axios from "axios";
import authHeader from "_helpers/auth-header";
import {urlServer} from "_services/api";

export const PaguDataService = {
    getAllPagus,
    updateAlokasiPagu,
}

function getHttp() {
    return axios.create({
        baseURL: (urlServer + "/pagu"),
        headers: authHeader()
    });
}

function getAllPagus() {
  return getHttp().get("");
}

function updateAlokasiPagu(unit, subunit, ado, year, data) {
  return getHttp().post(`/${unit}/${subunit}/${ado}/${year}`, data);
}