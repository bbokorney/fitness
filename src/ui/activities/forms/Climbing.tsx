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

const validLocationTypes = [
  { displayName: "Indoors", value: "indoors" },
  { displayName: "Outdoors", value: "outdoors" },
];

const ClimbingForm = () => {
  const dispatch = useAppDispatch();

  let { activity } = useAppSelector(selectActivitiesForm);
  activity = { ...activity, type: "climbing" };

  const [duration, setDuration] = useState("");
  const [durationError, setDurationError] = useState("");

  const [date, setDate] = useState<Date | null>(new Date());

  const [notes, setNotes] = useState("");

  const [locationType, setLocationType] = React.useState("");

  const updateActivity = (a: Activity) => {
    if (a.startTime === undefined || a.startTime === 0) {
      a = { ...a, startTime: date?.getTime() };
    }
    dispatch(updateFormActivity(a));
    if (a.duration !== undefined && a.duration > 0
      && a.type !== ""
      && a.startTime !== undefined && a.startTime > 0) {
      dispatch(updateFormStatus("valid"));
    }
  };

  const onLocationTypeChange = (event: SelectChangeEvent) => {
    setLocationType(event.target.value);
    if (event.target.value !== "") {
      updateActivity({ ...activity, subType: event.target.value });
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
      updateActivity({ ...activity, duration: parsed * 60 });
    }
  };

  const onDateInputChange = (selectedDate: Date | null) => {
    setDate(selectedDate);
    if (selectedDate) {
      updateActivity({ ...activity, startTime: selectedDate.getUTCSeconds() });
    }
  };

  const onNotesInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const notesField = event.target.value;
    setNotes(notesField);
    if (notesField) {
      updateActivity({ ...activity, notes: notesField });
    }
  };

  return (
    <Stack sx={{ mt: 1 }}>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Location</InputLabel>
        <Select
          value={locationType}
          label="Location"
          onChange={onLocationTypeChange}
        >
          {validLocationTypes.map((t) => <MenuItem key={t.value} value={t.value}>{t.displayName}</MenuItem>)}
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
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <TextField
          label="Notes"
          multiline
          maxRows={4}
          value={notes}
          onChange={onNotesInputChange}
        />
      </FormControl>
    </Stack>
  );
};
export default ClimbingForm;
