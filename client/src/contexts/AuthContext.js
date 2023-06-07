import { useState, createContext, useContext, useEffect } from "react";
import { fetchMe, fetchLogout } from "../api";
import { Flex, Spinner } from "@chakra-ui/react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const me = await fetchMe();
        setLoggedIn(true); // fetchMe'den veri döndüğünde loggedIn state'i true oluyor
        setUser(me); //fetchMe ile dönen veriyi user state'ne atıyoruz
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    })();
  }, []);

  // ilk giriş işlemini gerçekleştiren fonksiyon
  const login = (data) => {
    setLoggedIn(true);
    setUser(data.user);

    localStorage.setItem("access-token", data.accessToken);
    localStorage.setItem("refresh-token", data.refreshToken);
  };

  const logout = async () => {
    setLoggedIn(false);
    setUser(null);

    await fetchLogout();
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
  };

  // context içerisinden componentlere gönderilen veriler
  const values = {
    user,
    login,
    logout,
    loggedIn,
  };

  // loading state'i ile beraber fetch esnasında kullanıcıya loading spinnerı göstermek için (chakra-ui kullanıldı)
  if (loading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          size="xl"
          color="red"
        />
      </Flex>
    );
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

// context için custom hook
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
