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
    login: (user: User, token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
    isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(() => {
        // Citim userul din localStorage la initializare (persista dupa refresh)
        const saved = localStorage.getItem("user");
        return saved ? JSON.parse(saved) : null;
    });

    const login = (userData: User, token: string) => {
        setUser(userData);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{
            user,
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
