import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { useAppSelector, useAppDispatch } from "../../lib/store/hooks";
import {
  selectActivitiesForm,
  upsertActivity,
  clearFormActivity,
} from "../../lib/activities/activitiesSlice";
import { alertError, alertInfo } from "../../lib/alert/alertSlice";
import StrengthForm from "../../ui/activities/forms/Strength";

const activityTypes = new Map();
activityTypes.set("strength", <StrengthForm />);
activityTypes.set("bike", <Typography>Bike</Typography>);
activityTypes.set("day-hike", <Typography>Day Hike</Typography>);

function validActivityType(activityType: string): boolean {
  return activityTypes.has(activityType);
}

const ActivityForm = () => {
  const { activityType } = useParams();
  if (!validActivityType(activityType || "")) {
    return <Typography>Invalid activity type {activityType}</Typography>;
  }

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status, activity } = useAppSelector(selectActivitiesForm);

  const onClickSave = async () => {
    try {
      await dispatch(upsertActivity(activity)).unwrap();
      dispatch(clearFormActivity());
      dispatch(alertInfo("Activity saved!"));
      navigate("/");

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
    <Stack>
      {activityTypes.get(activityType)}
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Button disabled={status !== "valid"} onClick={onClickSave} variant="contained">Save</Button>
      </Stack>

      {status === "loading" && <CircularProgress />}

    </Stack>
  );
};

export default ActivityForm;
