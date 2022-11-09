import React from "react";
import {
  Typography, Button, CircularProgress, Divider,
  Stack,
} from "@mui/material";
import { Activity } from "../../lib/activities/models";
import ActivityIcon from "../../ui/icons/activityIcon";

import {
  selectActivitiesList,
  listActivities,
} from "../../lib/activities/activitiesSlice";
import { useAppSelector, useAppDispatch } from "../../lib/store/hooks";
import { alertError } from "../../lib/alert/alertSlice";

const ActivitiesList = () => {
  const dispatch = useAppDispatch();
  const { status, activities } = useAppSelector(selectActivitiesList);

  let renderedActivities;
  if (status === "idle") {
    renderedActivities = activities.map((a) => (
      <ActivityListItem key={a.id} activity={a} />
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

      <Stack direction="column" sx={{ mt: 1 }} spacing={1} divider={<Divider />}>
        {renderedActivities}
      </Stack>
    </>
  );
};

export default ActivitiesList;

interface ActivityListItemProps {
  activity: Activity;
}

const ActivityListItem: React.FC<ActivityListItemProps> = ({ activity: a }) => (
  <Stack direction="column">
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

const formatDate = (time?: number) => {
  if (!time) {
    return "";
  }
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  };
  return (new Date(time)).toLocaleString("en-US", options);
};

const formatDuration = (duration?: number) => {
  if (!duration) {
    return "";
  }

  const seconds = duration;
  const minutes = seconds / 60;
  const hours = minutes / 60;

  const displayUnit = (amount: number, label: string): string => {
    if (amount < 1) {
      return "";
    }

    return `${amount}${label}`;
  };

  return `${displayUnit(Math.floor(hours), "h")}
  ${displayUnit(Math.floor(minutes) % 60, "m")}
  ${displayUnit(Math.floor(seconds) % 60, "s")}`;
};

const extraInfo = (a: Activity) => {
  switch (a.type) {
    case "strength":
    case "climbing":
      return a.subType ?? "";
    default:
      return "";
  }
};
