import * as functions from "firebase-functions";
// eslint-disable-next-line import/no-unresolved
import {initializeApp} from "firebase-admin/app";
// eslint-disable-next-line import/no-unresolved
import {getFirestore, DocumentData} from "firebase-admin/firestore";

initializeApp();
const db = getFirestore();

export const helloWorld = functions.https.onRequest(async (_, response) => {
  // functions.logger.info("request", {request: request});
  // functions.logger.info("response", {response: response});
  functions.logger.info("Hello logs!", {structuredData: true});

  const activitiesRef = db.collection("z-test-activities");
  // const snapshot = await activitiesRef.where("type", "in", ["strength", "bike"]).get();
  // const snapshot = await activitiesRef.where("type", ">=", "strength").get();
  const snapshot = await activitiesRef.get();
  const items : DocumentData[] = [];
  // const items = {};
  snapshot.forEach((doc) => {
    items.push(doc.data());
    // items[doc.id] = doc.data();
  });

  console.log(JSON.stringify(items));
  response.send("Hello from Firebase!");
});
