import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:5000/units",
  headers: {
    "Content-type": "application/json"
  }
});

class UnitsDataService {
  getUnits() {
    return http.get("");
  }

  getDistinctUnits() {
    return http.get("/distinct");
  }

  getSubUnits() {
    return http.get("/subunits");
  }

  getUnitByID(id) {
    return http.get(`/${id}`);
  }

  getSubunits() {
    return http.get("/subunits");
  }
  /*
  createUnit(data) {
    return http.post("", data);
  }

  updateUnit(id, data) {
    return http.put(`/${id}`, data);
  }

  deleteUnit(id) {
    return http.delete(`/${id}`);
  }
  */
}

export default new UnitsDataService();