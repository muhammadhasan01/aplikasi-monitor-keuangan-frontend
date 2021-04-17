import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:5000/pagu",
  headers: {
    "Content-type": "application/json"
  }
});

class ADODataService {
  getADOs() {
    return http.get("");
  }
}

export default new ADODataService();