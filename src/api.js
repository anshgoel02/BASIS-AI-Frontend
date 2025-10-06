import axios from "axios";

const api = axios.create({
    // baseURL: "https://basis-ai-backend.onrender.com",
    baseURL: "http://localhost:10000"
});

export default api;