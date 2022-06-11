// eslint-disable-next-line import/no-unresolved
import { initializeApp, cert } from "firebase-admin/app";
// eslint-disable-next-line import/no-unresolved
import { getFirestore } from "firebase-admin/firestore";

initializeApp({
  credential: cert("./.creds/firestore-service-account-key.json"),
});

const db = getFirestore();

const main = async () => {
  const activitiesRef = db.collection("activities");
  // const snapshot = await activitiesRef.where("type", "in", ["strength", "bike"]).get();
  const snapshot = await activitiesRef.where("type", ">=", "strength").get();
  snapshot.forEach((doc) => {
    console.log(doc.id, "=>", doc.data());
  });
};

main().catch((error) => console.log(error));
