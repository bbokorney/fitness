import { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {
  collection, getDocs, QueryDocumentSnapshot,
} from "firebase/firestore";
import { Activity } from "../../models/Activity";
import getDB from "../../lib/firebase";

const db = getDB();

const LogPage = () => {
  const [activities, setActivites] = useState<QueryDocumentSnapshot<Activity>[]>([]);

  const onClickRefresh = async () => {
    const querySnapshot = await getDocs(collection(db, "activities"));
    const a: QueryDocumentSnapshot<Activity>[] = [];
    querySnapshot.forEach((doc) => {
      a.push(doc as QueryDocumentSnapshot<Activity>);
    });
    setActivites(a);
  };

  const renderedActivities = activities.map((a) => (
    <ListItem key={a.id}>
      <ListItemText>{a.data().distance}</ListItemText>
    </ListItem>
  ));
  return (
    <>
      <Typography variant="h6">
        Activity Log
      </Typography>
      <Button onClick={onClickRefresh} variant="contained">Refresh</Button>
      <List>
        {renderedActivities}
      </List>
    </>
  );
};

export default LogPage;
