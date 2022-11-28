// eslint-disable-next-line import/no-unresolved
import { getFirestore } from "firebase-admin/firestore";

// eslint-disable-next-line import/no-unresolved
const { initializeApp, cert } = require("firebase-admin/app");
// eslint-disable-next-line import/no-unresolved
const { getStorage } = require("firebase-admin/storage");

initializeApp({
  credential: cert("./.creds/firestore-service-account-key.json"),
  storageBucket: "apps-2a1d8.appspot.com",
});

const db = getFirestore();
const bucket = getStorage().bucket();

const main = async () => {
  const activitiesRef = db.collection("activities");
  const snapshot = await activitiesRef.get();
  const items = [];
  snapshot.forEach((doc) => {
    items.push({ ...doc.data(), id: doc.id });
  });

  const contents = items;
  const now = new Date();
  // eslint-disable-next-line max-len
  const fileName = `backups/fitness/${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}-${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}.json`;
  await bucket.file(fileName).save(JSON.stringify({ items: contents }));

  // const [files] = await bucket.getFiles();

  // console.log("Files:");
  // files.forEach((file) => {
  //   console.log(file.name);
  // });
};

main().catch((error) => console.log(error));
