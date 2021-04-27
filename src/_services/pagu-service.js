import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:5000/pagu",
  headers: {
    "Content-type": "application/json"
  }
});

class PaguDataService {
  getAllPagus() {
    return http.get("");
  }

  updateAlokasiPagu(unit, subunit, ado, year, data) {
    return http.post(`/${unit}/${subunit}/${ado}/${year}`, data);
  }
}

export default new PaguDataService();