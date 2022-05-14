import {
  addDoc, collection, getDocs, QueryDocumentSnapshot, Firestore,
} from "firebase/firestore";
import { Activity } from "./models";
import getDB from "./firebase";

export default class ActivitiesAPI {
  collectionName = "activities";

  db: Firestore = getDB();

  list = async (): Promise<Activity[]> => {
    const querySnapshot = await getDocs(collection(this.db, this.collectionName));
    return querySnapshot.docs
      .map((doc: QueryDocumentSnapshot) => ({ id: doc.id, ...doc.data() }));
  };

  upsert = async (a: Activity): Promise<Activity> => {
    const docRef = await addDoc(collection(this.db, this.collectionName), a);
    return {
      id: docRef.id,
      ...a,
    };
  };
}
