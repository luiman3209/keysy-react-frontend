import axios from "axios";

// Define API base URL
const API_BASE_URL = "http://localhost:8080";

// Function to login and store the JWT
export const loginUser = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
        const token = response.data.token;

        // Store token securely
        localStorage.setItem("jwt", token);

        return token;
    } catch (error) {
        console.error("Login failed", error);
        throw error;
    }
};

// Function to get JWT token from storage
export const getAuthToken = () => {
    return localStorage.getItem("jwt");
};

// Axios instance with JWT token in headers
export const axiosAuth = axios.create({
    baseURL: API_BASE_URL,
});

// Attach JWT to every request automatically
axiosAuth.interceptors.request.use(
    (config) => {
        // Set the Content-Type header
        config.headers['Content-Type'] = 'application/json';

        console.log('HTTP Request:', {
            method: config.method?.toUpperCase(),
            url: config.url,
            headers: config.headers,
            data: config.data,
        });

        const token = getAuthToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
