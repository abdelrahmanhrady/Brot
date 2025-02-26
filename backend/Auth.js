import { auth, db } from "./Firebase"; // Import auth and db
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore"; // For writing to Firestore
import { useRouter } from "next/router";




const signUp = async (email, password, username) => {
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    console.log("User signed up:", user);

    // Save the username and other info to Firestore
    await setDoc(doc(db, "users", user.uid), {
      username: username,
      email: email,
    });
    return user; // Return user data for further use
    
  } catch (error) {
    console.error("Error signing up:", error.message);
    throw error; // Rethrow the error so it can be handled in the component
  }
};

export { signUp };