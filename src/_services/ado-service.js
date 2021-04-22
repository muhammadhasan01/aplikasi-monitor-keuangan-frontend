import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:5000/ado",
  headers: {
    "Content-type": "application/json"
  }
});

class ADODataService {
  getADOs() {
    return http.get("");
  }
  
  createADO(data) {
    return http.post("", data);
  }
}

export default new ADODataService();