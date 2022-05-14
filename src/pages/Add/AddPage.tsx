import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectActivites,
  upsertActivity,
} from "../../features/activities/activitiesSlice";

const AddPage = () => {
  const dispatch = useAppDispatch();
  const { status, errorMessage } = useAppSelector(selectActivites);

  const [distance, setDistance] = useState("");
  const [distanceError, setDistanceError] = useState("");

  const onDistanceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseFloat(e.target.value);
    if (Number.isNaN(parsed)) {
      setDistanceError("Distance must be a number");
    } else {
      setDistanceError("");
    }
    setDistance(e.target.value);
  };

  const onClickSave = async () => {
    if (distanceError !== "") {
      return;
    }
    const parsed = parseFloat(distance);
    dispatch(upsertActivity({ distance: parsed }));
  };

  let message;
  if (status === "loading") {
    message = "Saving...";
  } else if (status === "failed") {
    message = `Error saving activity: ${errorMessage}`;
  }

  return (
    <>
      <Typography variant="h6">
        Add Activity
      </Typography>

      <TextField
        id="distance"
        error={distanceError !== ""}
        inputProps={{ inputMode: "numeric" }}
        label="Distance"
        variant="outlined"
        value={distance}
        onChange={onDistanceInputChange}
        helperText={distanceError}
      />

      <Button onClick={onClickSave} variant="contained">Save</Button>
      <Typography>
        {message}
      </Typography>
    </>
  );
};

export default AddPage;
