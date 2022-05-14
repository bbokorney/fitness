import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {
  selectActivites,
  listActivities,
} from "../../features/activities/activitiesSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { alertError } from "../../features/alert/alertSlice";

const LogPage = () => {
  const dispatch = useAppDispatch();
  const { status, activities } = useAppSelector(selectActivites);

  let message;
  let renderedActivities;
  if (status === "loading") {
    message = "Loading...";
  } else if (status === "idle") {
    renderedActivities = activities.map((a) => (
      <ListItem key={a.id}>
        <ListItemText>{a.distance} miles!</ListItemText>
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
      <List>
        {renderedActivities}
      </List>
      <Typography>{message}</Typography>
    </>
  );
};

export default LogPage;
