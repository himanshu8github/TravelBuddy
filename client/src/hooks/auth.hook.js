
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import useAuthStore from "../store/authstore";

const useSyncAuth = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
        });
      } else {
        logout();
      }
    });

    return () => unsubscribe();
  }, []);
};

export default useSyncAuth;
