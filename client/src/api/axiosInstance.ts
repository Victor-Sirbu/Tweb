import axios from "axios";

// URL-ul backend-ului

const BASE_URL = "https://localhost:44324";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor
// La fiecare request, daca exista un token JWT salvat in localStorage,
// il ataseaza automat in header-ul Authorization

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
// Gestioneaza erorile globale in baza HTTP Status Code

axiosInstance.interceptors.response.use(
    (response) => response, // daca raspunsul e ok, il returnam normal
    (error) => {
        if (!error.response) {
            console.error("Eroare de retea – serverul nu raspunde.");
            return Promise.reject(error);
        }

        const { status } = error.response;

        switch (status) {
            case 400:
                console.error("Bad Request (400):", error.response.data);
                break;
            case 401:
                // Token expirat sau invalid → stergem datele si redirectam la login
                localStorage.removeItem("token");
                window.location.href = "/login";
                break;
            case 403:
                console.error("Acces interzis (403).");
                break;
            case 404:
                console.error("Resursa negasita (404):", error.config?.url);
                break;
            case 500:
                console.error("Eroare server (500).");
                break;
            default:
                console.error(`Eroare HTTP ${status}:`, error.response.data);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
