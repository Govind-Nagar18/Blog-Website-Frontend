import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setuser] = useState(null)
    const [token, setToken] = useState(null);

    const login = (usedata, token) => {
        setuser(usedata);
        setToken(token);
    }

    const logout = () => {
        setuser(null);
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}


