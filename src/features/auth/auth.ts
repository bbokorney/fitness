import {
  getAuth,
  onAuthStateChanged,
  signInWithRedirect,
  signInWithPopup,
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
    const { uid } = user;
    dispatch(updateUser({ id: uid }));
  } else {
    console.log("Not logged in, according to state change");
    dispatch(updateUser(null));
  }
});

export const signIn = () => {
  signInWithRedirect(auth, provider);
};

export default signIn;

export const signInPopup = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("Sign in success:", result);
    }).catch((error) => {
      console.log("Sign in failure:", error);
    });
};
