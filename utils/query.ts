// eslint-disable-next-line import/no-unresolved
import { initializeApp, cert } from "firebase-admin/app";
// eslint-disable-next-line import/no-unresolved
import { getFirestore } from "firebase-admin/firestore";

initializeApp({
  credential: cert("./.creds/firestore-service-account-key.json"),
});

const db = getFirestore();

const main = async () => {
  const activitiesRef = db.collection("z-test-activities");
  // const snapshot = await activitiesRef.where("type", "in", ["strength", "bike"]).get();
  // const snapshot = await activitiesRef.where("type", ">=", "strength").get();
  const snapshot = await activitiesRef.get();
  const items = [];
  // const items = {};
  snapshot.forEach((doc) => {
    items.push(doc.data());
    // items[doc.id] = doc.data();
  });

  console.log(JSON.stringify(items));
};

main().catch((error) => console.log(error));
