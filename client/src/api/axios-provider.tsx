import React, { useMemo } from "react";
import axios from "axios";
import type { AxiosInstance } from "axios";
import { AxiosContext } from "./context";
import { createApi } from "./create-api";

interface AxiosProviderProps {
    children: React.ReactNode;
    baseURL: string;
}

export function AxiosProvider({ children, baseURL }: AxiosProviderProps) {
    const client: AxiosInstance = useMemo(() => {
        const instance = axios.create({
            baseURL,
            headers: {
                "Content-Type": "application/json",
            },
        });

        // Request interceptor — ataseaza JWT-ul automat la fiecare request
        instance.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem("token");
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Response interceptor — gestioneaza erorile globale
        instance.interceptors.response.use(
            (response) => response,
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
                        localStorage.removeItem("token");
                        window.location.replace("/login");
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

        return instance;
    }, [baseURL]);

    const api = useMemo(() => createApi(client), [client]);
    const value = useMemo(() => ({ client, api }), [client, api]);

    return (
        <AxiosContext.Provider value={value}>
            {children}
        </AxiosContext.Provider>
    );
}
