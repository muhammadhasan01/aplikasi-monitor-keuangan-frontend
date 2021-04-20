import authHeader from "_helpers/auth-header";
import { urlServer } from "_services";
import axios from "axios";

export const RKADataService = {
    loadAllRKA
};

function getHttp() {
    return axios.create({
        baseURL: (urlServer + "/rka"),
        headers: authHeader()
    });
}

function loadAllRKA(unit, subunit){
    return getHttp().get(`/${unit}/${subunit}`);
}

function loadRKAADO(unit, subunit, ADO){
    return getHttp().get(`/${unit}/${subunit}/ADO/${ADO}`)
}
