import axios from "axios";
import authHeader from "_helpers/auth-header";
import {urlServer} from "_services/api";

export const UnitsDataService = {
    getDistinctUnits,
    getSubUnits,
    getUnitByID
}

function getHttp() {
    return axios.create({
        baseURL: (urlServer + "/accounts"),
        headers: authHeader()
    });
}

function getDistinctUnits() {
    return getHttp().get("/distinct");
}

function getSubUnits() {
    return getHttp().get("/subunits");
}

function getUnitByID(id) {
    return getHttp().get(`/${id}`);
}