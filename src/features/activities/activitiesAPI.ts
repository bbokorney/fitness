import {
  collection, getDocs, QueryDocumentSnapshot, Firestore,
} from "firebase/firestore";
import { Activity } from "./models";
import getDB from "./firebase";

export default class ActivitiesAPI {
  db: Firestore = getDB();

  list = async (): Promise<Activity[]> => {
    const querySnapshot = await getDocs(collection(this.db, "activities"));
    return querySnapshot.docs
      .map((doc: QueryDocumentSnapshot) => ({ id: doc.id, data: doc.data() }));
  };
}
