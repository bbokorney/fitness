import React, { useEffect } from "react";
import {
  Typography, Button, CircularProgress, Divider,
  Stack,
} from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
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

  const renderedActivities = activities.map((a) => (
    <ActivityListItem
      key={a.id}
      activity={a}
      onClick={() => navigate(`/activities/${a.id}`)}
    />
  ));

  const loadActivities = async (after?: Activity) => {
    try {
      await dispatch(listActivities(after)).unwrap();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      let errorMessage = "Unknown error";
      if (error.message) {
        errorMessage = error.message;
      } else {
        console.log(error);
      }
      dispatch(alertError(`Error loading activities: ${errorMessage}`));
      console.log(error);
    }
  };

  const bottomRef = React.createRef<Element>();

  useEffect(() => {
    if (!bottomRef.current) {
      return () => {};
    }

    const ref = bottomRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && status !== "loading") {
            loadActivities(activities[activities.length - 1]);
          }
        });
      },
    );

    observer.observe(ref);

    return () => {
      observer.unobserve(ref);
    };
  }, [activities]);

  return (
    <>
      <Stack direction="row" sx={{ mt: 1 }} spacing={1} justifyContent="space-between">
        <Typography variant="h6">
          Activity Log
        </Typography>
        <Button onClick={() => loadActivities()} variant="contained"><CachedIcon /></Button>
      </Stack>

      <Stack direction="column" sx={{ mt: 1, mb: 2 }} spacing={2} divider={<Divider />}>
        {renderedActivities}
      </Stack>

      <Stack direction="row" sx={{ mt: 1 }} spacing={1} justifyContent="space-around">
        {status === "loading" && <CircularProgress />}
      </Stack>

      <Stack ref={bottomRef} />
    </>
  );
};

export default ActivitiesList;

interface ActivityListItemProps {
  ref?: React.RefObject<unknown>;
  activity: Activity;
  onClick: () => void;
}

const ActivityListItem: React.FC<ActivityListItemProps> = ({ activity: a, onClick, ref }) => (
  <Stack ref={ref} direction="column" spacing={0.75} onClick={onClick}>
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
