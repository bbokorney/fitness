import React, { useEffect } from "react";
import {
  Typography, Button, CircularProgress, Divider,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Activity } from "../../lib/activities/models";
import ActivityIcon from "../../ui/icons/activityIcon";
import { formatDate, formatDuration, extraInfo } from "../../ui/activities/utils";
import {
  selectActivitiesList,
  listActivities,
} from "../../lib/activities/activitiesSlice";
import { useAppSelector, useAppDispatch } from "../../lib/store/hooks";
import { alertError } from "../../lib/alert/alertSlice";

const ActivitiesList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status, activities } = useAppSelector(selectActivitiesList);

  let renderedActivities;
  if (status === "idle") {
    renderedActivities = activities.map((a) => (
      <ActivityListItem key={a.id} activity={a} onClick={() => navigate(`/activities/${a.id}`)} />
    ));
  }

  const loadActivities = async () => {
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

  useEffect(() => {
    if (activities.length === 0) {
      loadActivities();
    }
  }, []);

  return (
    <>
      <Stack direction="row" sx={{ mt: 1 }} spacing={1} justifyContent="space-between">
        <Typography variant="h6">
          Activity Log
        </Typography>
        <Button onClick={loadActivities} variant="contained">Refresh</Button>
      </Stack>

      <Stack direction="row" sx={{ mt: 1 }} spacing={1} justifyContent="space-around">
        {status === "loading" && <CircularProgress />}
      </Stack>

      <Stack direction="column" sx={{ mt: 1, mb: 2 }} spacing={2} divider={<Divider />}>
        {renderedActivities}
      </Stack>
    </>
  );
};

export default ActivitiesList;

interface ActivityListItemProps {
  activity: Activity;
  onClick: () => void;
}

const ActivityListItem: React.FC<ActivityListItemProps> = ({ activity: a, onClick }) => (
  <Stack direction="column" spacing={0.75} onClick={onClick}>
    <Stack direction="row" spacing={1}>
      <ActivityIcon activityType={a.type ?? ""} />
      <Typography>{formatDate(a.startTime)}</Typography>
    </Stack>
    <Stack direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem />}>
      <Typography>{formatDuration(a.duration)}</Typography>
      <Typography>{extraInfo(a)}</Typography>
    </Stack>
  </Stack>
);
