import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { selectActivites, listActivities } from "../../features/activities/activitiesSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

const LogPage = () => {
  const dispatch = useAppDispatch();
  const { status, errorMessage, activities } = useAppSelector(selectActivites);

  let message;
  let renderedActivities;
  if (status === "failed") {
    message = `Error loading activities: ${errorMessage}`;
  } else if (status === "loading") {
    message = "Loading...";
  } else if (status === "idle") {
    renderedActivities = activities.map((a) => (
      <ListItem key={a.id}>
        <ListItemText>{a.distance} miles!</ListItemText>
      </ListItem>
    ));
  }
  return (
    <>
      <Typography variant="h6">
        Activity Log
      </Typography>
      <Button onClick={() => dispatch(listActivities())} variant="contained">Refresh</Button>
      <List>
        {renderedActivities}
      </List>
      <Typography>{message}</Typography>
    </>
  );
};

export default LogPage;
