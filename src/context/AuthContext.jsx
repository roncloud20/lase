import { createContext, useContext, useState } from "react";
import axios from "axios";
const AuthContext = createContext(); 

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState(() => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        return { token, user };
    });

    const login = (token, user) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setAuthState({ token, user });
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        // axios.defaults.headers.common["Authorization"] = "";
        delete axios.defaults.headers.common["Authorization"];
        setAuthState({ token: null, user: null });
    };

    return (
        <AuthContext.Provider value={{
            authToken: authState.token,
            user: authState.user,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);