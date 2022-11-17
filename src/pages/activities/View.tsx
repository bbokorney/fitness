import { useParams } from "react-router-dom";
import {
  Stack, Typography, Divider, Button,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useAppSelector, useAppDispatch } from "../../lib/store/hooks";
import { selectActivityById, updateFormActivity } from "../../lib/activities/activitiesSlice";
import ActivityIcon from "../../ui/icons/activityIcon";
import { formatDate, formatDuration, extraInfo } from "../../ui/activities/utils";
import { updateFormDialogState } from "../../lib/formDialog/formDialogSlice";

const ViewActivity = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  if (!id) {
    return <div>Activity not found</div>;
  }

  const a = useAppSelector((state) => selectActivityById(state, id));
  if (!a) {
    return <div>Activity not found</div>;
  }

  const onClickEdit = () => {
    dispatch(updateFormActivity(a));
    dispatch(updateFormDialogState({ open: true, activityType: a.type ?? "", actionType: "Update" }));
  };

  return (
    <Stack direction="column" sx={{ mt: 1 }} spacing={1}>
      <Stack direction="row" spacing={1} justifyContent="space-between">
        <ActivityIcon activityType={a.type ?? ""} />
        <Typography>{formatDate(a.startTime)}</Typography>
        <Button variant="contained" onClick={onClickEdit}><Edit /></Button>
      </Stack>
      <Stack direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem />}>
        <Typography>{formatDuration(a.duration)}</Typography>
        <Typography>{extraInfo(a)}</Typography>
      </Stack>
      <Typography sx={{ whiteSpace: "pre-wrap" }} component="pre">{a.notes}</Typography>
    </Stack>
  );
};

export default ViewActivity;
