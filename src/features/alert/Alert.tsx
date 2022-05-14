import { SyntheticEvent } from "react";
import Snackbar from "@mui/material/Snackbar";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectAlert, clearAlertState } from "./alertSlice";

const Alert = () => {
  const dispatch = useAppDispatch();
  const { type, message } = useAppSelector(selectAlert);

  const handleClose = (_: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(clearAlertState());
  };

  const open = type !== "none";
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      message={message}
      sx={{ bottom: { xs: 70 } }}
    />
  );
};

export default Alert;
