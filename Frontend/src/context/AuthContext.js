import { createContext, useState, useContext} from "react";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  
  const storedUser = JSON.parse(localStorage.getItem("user"))
  
  const [user, setUser] = useState(storedUser);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user",
                JSON.stringify({id: userData.id, username:userData.username}))
  }

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user")
    localStorage.removeItem("pokemonList")
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
