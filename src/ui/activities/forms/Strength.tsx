import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { useAppDispatch, useAppSelector } from "../../../lib/store/hooks";
import {
  selectActivitiesForm,
  updateFormActivity,
  updateFormStatus,
} from "../../../lib/activities/activitiesSlice";
import { Activity } from "../../../lib/activities/models";

const validTypes = [
  { displayName: "Core", value: "strength/core" },
  { displayName: "Legs", value: "strength/legs" },
  { displayName: "Stabilizer and antagonist", value: "strength/stablizer-antagonist" }];

const StrengthForm = () => {
  const dispatch = useAppDispatch();

  const { activity } = useAppSelector(selectActivitiesForm);

  const [duration, setDuration] = useState("");
  const [durationError, setDurationError] = useState("");

  const [date, setDate] = useState<Date | null>(new Date());

  const [activityType, setActivityType] = React.useState("");

  const updateActivity = (a: Activity) => {
    dispatch(updateFormActivity(a));
    if (a.duration !== undefined && a.duration > 0 && a.type !== "") {
      dispatch(updateFormStatus("valid"));
    }
  };

  const onActivityTypeChange = (event: SelectChangeEvent) => {
    setActivityType(event.target.value);
    if (event.target.value !== "") {
      updateActivity({ ...activity, type: event.target.value });
    }
  };

  const onDurationInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(e.target.value);
    const parsed = parseFloat(e.target.value);
    if (Number.isNaN(parsed)) {
      setDurationError("Duration must be a positive number");
    } else {
      if (parsed <= 0) {
        setDurationError("Duration must be a positive number");
        return;
      }
      setDurationError("");
      updateActivity({ ...activity, duration: parsed });
    }
  };

  const onDateInputChange = (newValue: Date | null) => {
    setDate(newValue);
  };

  return (
    <Stack sx={{ mt: 1 }}>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Activity type</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={activityType}
          label="Workout type"
          onChange={onActivityTypeChange}
        >
          {validTypes.map((t) => <MenuItem key={t.value} value={t.value}>{t.displayName}</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <TextField
          id="duration"
          error={durationError !== ""}
          inputProps={{ inputMode: "numeric" }}
          label="Duration"
          variant="outlined"
          value={duration}
          onChange={onDurationInputChange}
          helperText={durationError}
        />
        <FormHelperText>minutes</FormHelperText>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDatePicker
            label="Date"
            inputFormat="MM/dd/yyyy"
            value={date}
            onChange={onDateInputChange}
            // eslint-disable-next-line react/jsx-props-no-spreading
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </FormControl>
    </Stack>
  );
};
export default StrengthForm;
