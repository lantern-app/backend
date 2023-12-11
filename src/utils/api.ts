import axios from "axios";

const api = axios.create({
  baseURL: "https://api.aladhan.com/v1/",
});

export default api;
