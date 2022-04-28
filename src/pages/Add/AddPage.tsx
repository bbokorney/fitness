import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  collection, addDoc,
} from "firebase/firestore";
import getDB from "../../lib/firebase";

const db = getDB();

const AddPage = () => {
  const [distance, setDistance] = useState("");
  const onDistanceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDistance(e.target.value);
  };

  const onClickSave = async () => {
    try {
      const parsed = parseFloat(distance);
      const docRef = await addDoc(collection(db, "activities"), {
        distance: parsed,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <>
      <Typography variant="h6">
        Add Activity
      </Typography>

      <TextField
        id="outlined-basic"
        label="Distance"
        variant="outlined"
        value={distance}
        onChange={onDistanceInputChange}
      />

      <Button onClick={onClickSave} variant="contained">Save</Button>
    </>
  );
};

export default AddPage;
