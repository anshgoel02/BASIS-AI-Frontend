import axios from "axios";

const api = axios.create({
    baseURL: "https://sap-basis-backend.onrender.com",
});

export default api;