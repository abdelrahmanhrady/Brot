import { createContext, useState, useContext, useEffect } from "react";
import { auth, db } from "../../backend/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      try {
        if (user) {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            setUserData({
              uid: user.uid,
              username: "",
              email: user.email,
              money: 100,
              passiveIncome: 0,
              TotalPassiveCollected: 0,
              passiveLevel: 1,
              Games: 0,
              Wins: 0,
              MoneyLost: 0,
              MoneyWon: 0,
              gameHistory: [],
            });
          }
        } else {
          setUserData(null);
        }
      } catch (error) {
        console.error("Auth state error:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
