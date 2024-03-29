import {
  addDoc, collection, getDocs,
  QueryDocumentSnapshot, Firestore, query, orderBy,
  setDoc, doc, deleteDoc, limit, where,
} from "firebase/firestore";
import { Activity } from "./models";
import getDB from "./firebase";

export default class ActivitiesAPI {
  collectionName = process.env.REACT_APP_ACTIVITIES_COLLECTION_NAME
    ? process.env.REACT_APP_ACTIVITIES_COLLECTION_NAME
    : "activities";

  db: Firestore = getDB();

  docReference = (a: Activity) => {
    if (!a.id) {
      throw new Error("Activity has no ID");
    }
    return doc(this.db, this.collectionName, a.id);
  };

  list = async (after?: Activity): Promise<Activity[]> => {
    const activitiesRef = collection(this.db, this.collectionName);
    const constraints = [orderBy("startTime", "desc")];
    if (after) {
      constraints.push(where("startTime", "<", after.startTime));
    }
    constraints.push(limit(10));
    const q = query(activitiesRef, ...constraints);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs
      .map((snapshot: QueryDocumentSnapshot) => ({ id: snapshot.id, ...snapshot.data() }));
  };

  upsert = async (a: Activity): Promise<Activity> => {
    a = { ...a, source: "app" };
    if (a.id) {
      await setDoc(this.docReference(a), a);
      return a;
    }
    const docRef = await addDoc(collection(this.db, this.collectionName), a);
    return {
      id: docRef.id,
      ...a,
    };
  };

  delete = async (a: Activity): Promise<void> => deleteDoc(this.docReference(a));
}
