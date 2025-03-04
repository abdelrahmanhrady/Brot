import { auth, db } from "./Firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, getDocs,getDoc, collection, where, query } from "firebase/firestore";
import { signOut as firebaseSignOut } from "firebase/auth";



function isEmail(value) {
  return value.includes('@') && value.indexOf('.') > value.indexOf('@');
}

const signUp = async (email, password, username, setUserData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      username: username,
      email: email,
      money: 100,
      passiveIncome: 0,
      TotalPassiveCollected: 0,
      passiveLevel: 1,
      Games: 0,
      Wins: 0,
      MoneyLost: 0,
      MoneyWon: 0,
      gameHistory: [],
      
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    setUserData({
      uid: user.uid,
      username: username,
      email: email,
      money: 100,
      passiveIncome: 0,
      TotalPassiveCollected:0,
      passiveLevel: 1,
      Games: 0,
      Wins: 0,
      MoneyLost: 0,
      MoneyWon: 0,
      gameHistory: [],
    });

    return user.uid;
  } catch (error) {
    console.error("Error signing up:", error);
    alert("Error signing up: " + error.message);
  }
};

const logIn = async (usernameOrEmail, password, setUserData) => {
  let email = usernameOrEmail;

  try {
    if (!isEmail(usernameOrEmail)) {
      const userQuery = query(
        collection(db, "users"),
        where("username", "==", usernameOrEmail)
      );

      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        email = userDoc.data().email;
      } else {
        throw new Error("Username not found");
      }
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userDoc = await getDoc(doc(db, "users", user.uid));
    
    if (!userDoc.exists()) {
      throw new Error("User document not found");
    }

    const userData = userDoc.data();

    setUserData({
      uid: user.uid, 
      username: userData.username || '',
      email: userData.email || '',
      money: userData.money || 100,
      passiveIncome: userData.passiveIncome || 0,
      TotalPassiveCollected: userData.TotalPassiveCollected,
      passiveLevel: userData.passiveLevel || 1,
      Games: userData.Games || 0,
      Wins: userData.Wins || 0,
      MoneyLost: userData.MoneyLost || 0,
      MoneyWon: userData.MoneyWon || 0,
      gameHistory: userData.gameHistory || [],
    });

    return user.uid; 
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

const signOut = async (setUserData, router) => {
  try {
    await firebaseSignOut(auth);
    const router = useRouter();
    setUserData(null); 
  } catch (error) {
    console.error("Sign out error:", error);
  }
};

export { signUp, logIn, signOut};
