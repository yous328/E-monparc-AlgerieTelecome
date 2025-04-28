import axios from 'axios';

// Create an Axios instance
const api = axios.create({
    baseURL: 'http://localhost:8000/api/',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Attach token automatically if exists
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle responses globally
api.interceptors.response.use(
    (response) => {
        // If everything is OK, just return response
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // If backend says "401 Unauthorized"
            console.warn('Session expired or Unauthorized!');

            // OPTIONAL: Clear local storage and redirect to login
            localStorage.removeItem('token');

            window.location.href = '/login'; // 👈 redirect user back to login
        }

        return Promise.reject(error);
    }
);

export default api;
