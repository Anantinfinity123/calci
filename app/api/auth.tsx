import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { firebaseConfig } from "../config/firebase";

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
if (typeof window !== "undefined") {
  // Only initialize Firebase Analytics when window is defined (i.e., in the browser)
  const analytics = getAnalytics(app);
}

export async function googleLogin() {
  try {
    const result = await signInWithPopup(auth, provider);
    return { result };
  } catch (err) {
    throw new Error("err.message");
  }
}
export async function logout() {
  const res = await auth.signOut();

  return res;
}
export async function signUpWithEmail(payload: {
  email: string;
  password: string;
}) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      payload.email,
      payload.password
    );
    return { user: userCredential.user };
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function loginWithEmail(payload: {
  email: string;
  password: string;
}) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      payload.email,
      payload.password
    );
    return { user: userCredential.user };
  } catch (error: any) {
    throw new Error(error.message);
  }
}
