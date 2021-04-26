import axios from "axios";
import authHeader from "_helpers/auth-header";
import {urlServer} from "_services/api";

export const RKADataService = {
    getRKAUnitADO,
    loadAllRKA,
    createRKA
}

function getHttp() {
    return axios.create({
        baseURL: (urlServer + "/rka"),
        headers: authHeader()
    });
}

function getRKAUnitADO(unit, subunit, ADO) {
    return getHttp().get(`${unit}/${subunit}/ADO/${ADO}`);
}

function loadAllRKA(unit, subunit){
    return getHttp().get(`/${unit}/${subunit}`);
}

function createRKA(unit, subunit, data){
    return getHttp().post(`/${unit}/${subunit}`);
}
