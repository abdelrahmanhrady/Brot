import { doc, setDoc, getDoc, getDocs, collection, query, where } from "firebase/firestore"
import { database } from "./Firebase"


const getUserData = async () => {
    const user = auth.currentUser; // Get the current authenticated user
  
    if (user) {
    
        const userDocRef = doc(db, "users", user.uid); 
        const docSnap = await getDoc(userDocRef); 
  
        if (docSnap.exists()) {
        
          return docSnap.data(); 
        } else {
          console.log("No such user document!");
          return null;
        }
    }
   
  };
  
  export { getUserData };