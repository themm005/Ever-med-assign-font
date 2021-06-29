import { createContext, useState } from "react";
import localStorageService from "../service/localStorageService";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
 
    

  const payload = localStorageService.getToken()
    ? jwtDecode(localStorageService.getToken())
    : false;
  const [user, setUser] = useState(payload);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;