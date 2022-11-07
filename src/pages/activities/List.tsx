import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CircularProgress from "@mui/material/CircularProgress";
import {
  selectActivitiesList,
  listActivities,
} from "../../lib/activities/activitiesSlice";
import { useAppSelector, useAppDispatch } from "../../lib/store/hooks";
import { alertError } from "../../lib/alert/alertSlice";

const formatDate = (time?: number) => {
  if (!time) {
    return "";
  }
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  };
  return `Start time: ${(new Date(time)).toLocaleString("en-US", options)}`;
};

const formatDuration = (duration?: number) => {
  if (!duration) {
    return "";
  }

  return `Duration: ${duration / 60} minutes`;
};

const ActivitiesList = () => {
  const dispatch = useAppDispatch();
  const { status, activities } = useAppSelector(selectActivitiesList);

  let renderedActivities;
  if (status === "idle") {
    renderedActivities = activities.map((a) => (
      <ListItem key={a.id}>
        <ListItemText>Type: {a.type}</ListItemText>
        <ListItemText>{formatDate(a.startTime || 0)}</ListItemText>
        <ListItemText>{formatDuration(a.duration)}</ListItemText>
      </ListItem>
    ));
  }

  const onClickRefresh = async () => {
    try {
      await dispatch(listActivities()).unwrap();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      let errorMessage = "Unknown error";
      if (error.message) {
        errorMessage = error.message;
      } else {
        console.log(error);
      }
      dispatch(alertError(`Error loading activities: ${errorMessage}`));
    }
  };
  return (
    <>
      <Typography variant="h6">
        Activity Log
      </Typography>

      <Button onClick={onClickRefresh} variant="contained">Refresh</Button>

      {status === "loading" && <CircularProgress />}

      <List>
        {renderedActivities}
      </List>
    </>
  );
};

export default ActivitiesList;
