import axios from "axios";

const http = axios.create({
    baseURL: import.meta.env.VITE_API,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});

http.interceptors.request.use(async (config) => config);

http.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        throw error;
    }
);

export default http;