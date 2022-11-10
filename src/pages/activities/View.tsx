import { useParams } from "react-router-dom";
import {
  Stack, Typography, Divider, Button,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useAppSelector } from "../../lib/store/hooks";
import { selectActivityById } from "../../lib/activities/activitiesSlice";
import ActivityIcon from "../../ui/icons/activityIcon";
import { formatDate, formatDuration, extraInfo } from "../../ui/activities/utils";

const ViewActivity = () => {
  const { id } = useParams();
  if (!id) {
    return <div>Activity not found</div>;
  }

  const a = useAppSelector((state) => selectActivityById(state, id));
  if (!a) {
    return <div>Activity not found</div>;
  }

  return (
    <Stack direction="column" sx={{ mt: 1 }} spacing={1}>
      <Stack direction="row" spacing={1} justifyContent="space-between">
        <ActivityIcon activityType={a.type ?? ""} />
        <Typography>{formatDate(a.startTime)}</Typography>
        <Button variant="contained"><Edit /></Button>
      </Stack>
      <Stack direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem />}>
        <Typography>{formatDuration(a.duration)}</Typography>
        <Typography>{extraInfo(a)}</Typography>
      </Stack>
      <Typography component="pre">{a.notes}</Typography>
    </Stack>
  );
};

export default ViewActivity;
