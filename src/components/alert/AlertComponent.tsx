import { SyntheticEvent } from "react";
import Snackbar from "@mui/material/Snackbar";
import { selectActivites, clearLoadingState } from "../../features/activities/activitiesSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

const AlertComponent = () => {
  const dispatch = useAppDispatch();
  const { status, errorMessage } = useAppSelector(selectActivites);

  const handleClose = (_: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(clearLoadingState());
  };

  const open = status === "failed";
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      message={errorMessage}
      sx={{ bottom: { xs: 70 } }}
    />
  );
};
export default AlertComponent;
