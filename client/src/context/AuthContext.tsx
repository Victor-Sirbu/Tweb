import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export type UserRole = "admin" | "user";

export interface User {
    name: string;
    email: string;
    role: UserRole;
    photo?: string;
}

interface AuthContextType {
    user: User | null;
    userId: string | null;
    userEmail: string | null;
    login: (user: User, token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
    isAdmin: boolean;
}

function parseJwt(token: string): Record<string, string> {
    try {
        const payload = token.split(".")[1];
        return JSON.parse(atob(payload));
    } catch {
        return {};
    }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(() => {
        const saved = localStorage.getItem("user");
        return saved ? JSON.parse(saved) : null;
    });

    const [userId, setUserId] = useState<string | null>(() => {
        const token = localStorage.getItem("token");
        if (!token) return null;
        const decoded = parseJwt(token);
        return decoded["sub"]
            || decoded["id"]
            || decoded["userId"]
            || decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
            || null;
    });

    const [userEmail, setUserEmail] = useState<string | null>(() => {
        const token = localStorage.getItem("token");
        if (!token) return null;
        const decoded = parseJwt(token);
        const stored = localStorage.getItem("user");
        const storedEmail = stored ? (() => { try { return JSON.parse(stored)?.email; } catch { return null; } })() : null;
        return decoded["email"]
            || decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]
            || storedEmail
            || null;
    });

    const login = (userData: User, token: string) => {
        const decoded = parseJwt(token);

        const id = decoded["sub"]
            || decoded["id"]
            || decoded["userId"]
            || decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
            || null;

        const email = decoded["email"]
            || decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]
            || userData.email
            || null;

        setUser(userData);
        setUserId(id);
        setUserEmail(email);

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        setUserId(null);
        setUserEmail(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{
            user,
            userId,
            userEmail,
            login,
            logout,
            isAuthenticated: user !== null,
            isAdmin: user?.role === "admin"
        }}>
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
}
