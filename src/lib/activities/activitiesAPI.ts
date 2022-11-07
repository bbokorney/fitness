import {
  addDoc, collection, getDocs, QueryDocumentSnapshot, Firestore, query, orderBy,
} from "firebase/firestore";
import { Activity } from "./models";
import getDB from "./firebase";

export default class ActivitiesAPI {
  collectionName = process.env.REACT_APP_ACTIVITIES_COLLECTION_NAME
    ? process.env.REACT_APP_ACTIVITIES_COLLECTION_NAME
    : "activities";

  db: Firestore = getDB();

  list = async (): Promise<Activity[]> => {
    const activitiesRef = collection(this.db, this.collectionName);
    const q = query(activitiesRef, orderBy("startTime", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs
      .map((doc: QueryDocumentSnapshot) => ({ id: doc.id, ...doc.data() }));
  };

  upsert = async (a: Activity): Promise<Activity> => {
    a = { ...a, source: "app" };
    const docRef = await addDoc(collection(this.db, this.collectionName), a);
    return {
      id: docRef.id,
      ...a,
    };
  };
}
