import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:5000/ado",
  headers: {
    "Content-type": "application/json"
  }
});

class PaguDataService {
  getAllPagus() {
    return http.get("");
  }
}

export default new PaguDataService();