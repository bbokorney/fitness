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

  let elem;

  if (status === "failed") {
    elem = (
      <Typography>
        Error loading activities: {errorMessage}
      </Typography>
    );
  } else if (status === "loading") {
    elem = (
      <Typography>
        Loading...
      </Typography>
    );
  } else if (status === "idle") {
    const renderedActivities = activities.map((a) => (
      <ListItem key={a.id}>
        <ListItemText>{a.data.distance}</ListItemText>
      </ListItem>
    ));

    elem = (
      <List>
        {renderedActivities}
      </List>
    );
  }
  return (
    <>
      <Typography variant="h6">
        Activity Log
      </Typography>
      <Button onClick={() => dispatch(listActivities())} variant="contained">Refresh</Button>
      {elem}
    </>
  );
};

export default LogPage;
