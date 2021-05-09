import axios from "axios";
import authHeader from "_helpers/auth-header";
import { urlServer } from "_services/api";

export const UnitsDataService = {
    getUnits,
    getDistinctUnits,
    getSubUnits,
    getUnitByID
}

function getHttp() {
    return axios.create({
        baseURL: (urlServer + "/units"),
        headers: authHeader()
    });
}

function getUnits() {
    return getHttp().get("");
}

function getDistinctUnits() {
    return getHttp().get("/d");
}

function getSubUnits() {
    return getHttp().get("/subunits");
}

function getUnitByID(id) {
    return getHttp().get(`/${id}`);
}