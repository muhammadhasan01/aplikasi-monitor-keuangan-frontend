import axios from "axios";
import authHeader from "_helpers/auth-header";
import {urlServer} from "_services/api";

export const RKADataService = {
    getRKAUnitADO
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