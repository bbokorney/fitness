import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Stack, Typography, Divider, Button,
  Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useAppSelector, useAppDispatch } from "../../lib/store/hooks";
import { selectActivityById, updateFormActivity, deleteActivity } from "../../lib/activities/activitiesSlice";
import ActivityIcon from "../../ui/icons/activityIcon";
import { formatDate, formatDuration, extraInfo } from "../../ui/activities/utils";
import { updateFormDialogState } from "../../lib/formDialog/formDialogSlice";
import { alertInfo, alertError } from "../../lib/alert/alertSlice";

const ViewActivity = () => {
  const { id } = useParams();
  if (!id) {
    return <div>Activity not found</div>;
  }

  const a = useAppSelector((state) => selectActivityById(state, id));
  if (!a) {
    return <div>Activity not found</div>;
  }

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const onClickEdit = () => {
    dispatch(updateFormActivity(a));
    dispatch(updateFormDialogState({ open: true, activityType: a.type ?? "", actionType: "Update" }));
  };

  const handleDialogClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleDelete = async () => {
    handleDialogClose();
    try {
      await dispatch(deleteActivity(a)).unwrap();
      dispatch(alertInfo("Activity deleted!"));
      navigate("/activities/list");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      let errorMessage = "Unknown error";
      if (error.message) {
        errorMessage = error.message;
      } else {
        console.log(error);
      }
      dispatch(alertError(`Error saving activity: ${errorMessage}`));
    }
  };

  return (
    <Stack direction="column" sx={{ mt: 1 }} spacing={1}>
      <Stack direction="row" sx={{ mt: 1 }} spacing={1}>
        <Typography variant="h6">
          Activity
        </Typography>
        <Stack direction="row" sx={{ width: "100%" }} spacing={1} justifyContent="flex-end">
          <Button variant="contained" onClick={() => setOpenDeleteDialog(true)}><Delete /></Button>
          <Button variant="contained" onClick={onClickEdit}><Edit /></Button>
        </Stack>
      </Stack>
      <Stack direction="row" spacing={1}>
        <ActivityIcon activityType={a.type ?? ""} />
        <Typography>{formatDate(a.startTime)}</Typography>
      </Stack>
      <Stack direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem />}>
        <Typography>{formatDuration(a.duration)}</Typography>
        <Typography>{extraInfo(a)}</Typography>
      </Stack>
      <Typography sx={{ whiteSpace: "pre-wrap" }} component="pre">{a.notes}</Typography>
      <Dialog
        open={openDeleteDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Delete activity
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this activity?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button variant="contained" onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default ViewActivity;
