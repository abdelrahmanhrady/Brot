import { useEffect } from "react";
import { db } from "@/backend/Firebase";
import { doc, setDoc } from "firebase/firestore";

export const useUploadUserData = (userId, userData) => {

    
  useEffect(() => {
    if (userId && userData) {
      const uploadData = async () => {
        try {
          await setDoc(doc(db, "users", userId), {
            uid: userData.uid, // User ID
            username: userData.username, // Username
            email: userData.email, // Email
            money: userData.money, // Current money
            passiveIncome: userData.passiveIncome,
            TotalPassiveCollected: userData.TotalPassiveCollected, // Passive income
            passiveLevel: userData.passiveLevel, // Passive level
            Games: userData.Games, // Number of games played
            Wins: userData.Wins, // Number of wins
            MoneyLost: userData.MoneyLost, // Total money lost
            MoneyWon: userData.MoneyWon, // Total money won
            gameHistory: userData.gameHistory, // Game history
            createdAt: userData.createdAt, // Created timestamp
            updatedAt: new Date().toISOString(),
          });
          console.log("User data uploaded successfully");
        } catch (error) {
          console.error("Error uploading user data: ", error);
        }
      };
      uploadData();
    }
  }, [userId, userData]);
    };
