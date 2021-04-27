import axios from "axios";
import authHeader from "_helpers/auth-header";
import {urlServer} from "_services/api";

export const pengeluaranDataService = {
    inputPengeluaranRKA
}

function getHttp() {
    return axios.create({
        baseURL: (urlServer + "/pengeluaran"),
        headers: authHeader()
    });
}

function inputPengeluaranRKA(body) {
    return getHttp().post('', body);
}
