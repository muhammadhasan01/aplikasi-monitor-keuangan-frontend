import axios from "axios";
import authHeader from "_helpers/auth-header";
import { urlServer } from "_services/api";

export const ADODataService = {
  getDistinctADO,
};

function getHttp() {
  return axios.create({
    baseURL: urlServer + "/ado",
    headers: authHeader(),
  });
}

function getDistinctADO() {
  return getHttp().get("");
}