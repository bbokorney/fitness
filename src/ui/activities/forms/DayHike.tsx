import TextField from "@mui/material/TextField";
import React, { useState } from "react";

const DayHikeForm = () => {
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

  return (
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
  );
};
export default DayHikeForm;
