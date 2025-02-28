import axios from "axios";

// Define API base URL
const API_BASE_URL = "http://localhost:8080";

// Function to login and store the JWT
export const loginUser = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
        const token = response.data.token;

        // Store token and timestamp
        const tokenData = {
            token: token,
            timestamp: Date.now(), // Current timestamp in milliseconds
        };

        localStorage.setItem("jwtData", JSON.stringify(tokenData));

        return token;
    } catch (error) {
        console.error("Login failed", error);
        throw error;
    }
};

// Function to get JWT token from storage
export const getAuthToken = () => {
    const jwtDataString = localStorage.getItem("jwtData");

    if (!jwtDataString) {
        return null; // No token data found
    }

    const jwtData = JSON.parse(jwtDataString);

    if (!jwtData || !jwtData.token || !jwtData.timestamp) {
        localStorage.removeItem("jwtData"); // Remove invalid data
        return null;
    }

    const expirationTime = 10 * 60 * 1000; // 10 minutes in milliseconds
    const currentTime = Date.now();

    if (currentTime - jwtData.timestamp > expirationTime) {
        localStorage.removeItem("jwtData"); // Remove expired token
        return null; // Token expired
    }

    return jwtData.token; // Return the valid token
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
