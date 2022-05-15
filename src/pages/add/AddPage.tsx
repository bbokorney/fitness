import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectActivites,
  upsertActivity,
} from "../../features/activities/activitiesSlice";
import { alertError, alertInfo } from "../../features/alert/alertSlice";

const AddPage = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(selectActivites);

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
    try {
      const parsed = parseFloat(distance);
      await dispatch(upsertActivity({ distance: parsed })).unwrap();
      dispatch(alertInfo("Activity saved!"));

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      let errorMessage = "Unknown error";
      if (error.message) {
        errorMessage = error.message;
      } else {
        console.log(error);
      }
      dispatch(alertError(`Error saving activity: ${errorMessage}`));
    }
  };

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

      {status === "loading" && <CircularProgress />}

    </>
  );
};

export default AddPage;
