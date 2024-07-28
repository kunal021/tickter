/* eslint-disable react/prop-types */
import { createContext, useEffect, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = sessionStorage.getItem("user");
        const currentSession = sessionStorage.getItem("session");
        // console.log(JSON.parse(currentUser));
        setUser(JSON.parse(currentUser));
        setSession(JSON.parse(currentSession));
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const isAuthenticated = user?.role === "authenticated";

  return (
    <UserContext.Provider
      value={{ user, loading, error, isAuthenticated, session }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};

export default UserProvider;
