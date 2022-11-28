import * as functions from "firebase-functions";
// eslint-disable-next-line import/no-unresolved
import {initializeApp} from "firebase-admin/app";
// eslint-disable-next-line import/no-unresolved
import {getFirestore} from "firebase-admin/firestore";
// eslint-disable-next-line import/no-unresolved
import {getStorage} from "firebase-admin/storage";

initializeApp({
  storageBucket: "apps-2a1d8.appspot.com",
});

const db = getFirestore();
const bucket = getStorage().bucket();

export const runBackup =
  functions.pubsub.schedule("every day 00:00").onRun(async () => {
    const activitiesRef = db.collection("activities");
    const snapshot = await activitiesRef.get();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const items: any[] = [];
    snapshot.forEach((doc) => {
      items.push({...doc.data(), id: doc.id});
    });

    const contents = items;
    const now = new Date();
    // eslint-disable-next-line max-len
    const fileName = `backups/fitness/${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}-${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}.json`;
    await bucket.file(fileName).save(JSON.stringify({activities: contents}));
    const message = `Backup saved to ${fileName}`;
    console.log(message);
  });
