import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "./utils";
import { doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

/**
 * Function to create a Firebase account
 */
export async function createFirebaseAccount(formData) {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    confirmPassword,
    imageFile,
  } = formData;

  if (password !== confirmPassword) {
    throw new Error("Passwords do not match.");
  }

  try {
    // 1. Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // 2. Upload the image to Firebase Storage
    const storageRef = ref(storage, `profile_images/${user.uid}`);
    await uploadBytes(storageRef, imageFile);

    // 3. Get the download URL of the uploaded image
    const imageLink = await getDownloadURL(storageRef);

    // 4. Save the user data to Firestore
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      firstName,
      lastName,
      email,
      phoneNumber,
      imageLink,
      createdAt: new Date(),
    });
    console.log("create user=> ", user);

    // 5. Save user data to local storage
    localStorage.setItem(
      "user",
      JSON.stringify({
        uid: user.uid,
        email: user.email,
      })
    );

    console.log("localstorage user=> ", localStorage.getItem("user"));

    console.log("User account created successfully with image link.");
    return user;
  } catch (error) {
    console.error("Error creating account:", error);
    throw error;
  }
}

/**
 * Function to sign in a user
 */
export async function signInUser(email, password) {
  try {
    // Sign in the user
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    // console.log(userCredential);
    // Fetch user data from Firestore or local storage as needed
    // Here, you can retrieve the image link or other info as necessary
    const userData = {
      uid: user.uid,
      email: user.email,
      // Add other fields as necessary (like firstName, lastName, etc.)
    };

    // 3. Save user data to local storage
    localStorage.setItem("user", JSON.stringify(userData));

    console.log("User signed in successfully:", user);
    return user;
  } catch (error) {
    console.error("Error signing in:", error.message);
    throw error;
  }
}

/**
 * Function to sign out the user
 */
export async function logoutUser() {
  try {
    await signOut(auth);
    localStorage.removeItem("user"); // Clear user data from local storage
    console.log("User signed out successfully.");
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
}

/**
 * Function to get the current user's image URL from Firebase Storage
 */
export async function getUserImageURL(userId) {
  try {
    const imageRef = ref(storage, `profile_images/${userId}`);
    const imageUrl = await getDownloadURL(imageRef);
    console.log(imageUrl);

    return imageUrl;
  } catch (error) {
    console.error("Error fetching user image URL:", error);
    throw error;
  }
}
