import {
  getAuth,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";
import { updateUser } from "./authSlice";
import { store } from "../../app/store";

console.log("Setting up auth");

const { dispatch } = store;

const auth = getAuth();
const provider = new GoogleAuthProvider();

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Logged in, according to state change");
    const { uid, email, displayName } = user;
    dispatch(updateUser({ id: uid, email, displayName }));
  } else {
    console.log("Not logged in, according to state change");
    dispatch(updateUser(null));
  }
});

export const signUserIn = () => {
  signInWithRedirect(auth, provider);
};

export const signUserOut = () => {
  signOut(auth).then(() => {
    console.log("Sign-out successful");
  }).catch((error) => {
    console.log("Sign-out error:", error);
  });
};
