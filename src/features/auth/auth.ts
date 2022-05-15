import {
  getAuth,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";
import { updateUser } from "./authSlice";
import { store } from "../../app/store";

const { dispatch } = store;

const auth = getAuth();
const provider = new GoogleAuthProvider();

onAuthStateChanged(auth, (user) => {
  if (user) {
    const { uid, email, displayName } = user;
    dispatch(updateUser({ id: uid, email, displayName }));
  } else {
    dispatch(updateUser(null));
  }
});

export const signUserIn = () => {
  signInWithRedirect(auth, provider);
};

export const signUserOut = () => {
  signOut(auth).catch((error) => {
    console.log("Sign-out error:", error);
  });
};
