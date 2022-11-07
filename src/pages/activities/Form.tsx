import React from "react";
import { useAppSelector, useAppDispatch } from "../../lib/store/hooks";
import {
  selectActivitiesForm,
  upsertActivity,
  clearFormActivity,
} from "../../lib/activities/activitiesSlice";
import { alertError, alertInfo } from "../../lib/alert/alertSlice";
import FullScreenDialog from "../../ui/dialog/FullScreen";
import StrengthForm from "../../ui/activities/forms/Strength";
import ClimbingForm from "../../ui/activities/forms/Climbing";
import BikeForm from "../../ui/activities/forms/Bike";
import DayHike from "../../ui/activities/forms/DayHike";
import StairsForm from "../../ui/activities/forms/Stairs";

type activityTypesMap = {
  [key: string]: {
    title: string;
    element: React.ReactNode;
  };
};

const activityTypes: activityTypesMap = {
  strength: { title: "Add strength workout", element: <StrengthForm /> },
  stairs: { title: "Add stairs workout", element: <StairsForm /> },
  climbing: { title: "Add climbing workout", element: <ClimbingForm /> },
  bike: { title: "Add bike ride", element: <BikeForm /> },
  "day-hike": { title: "Add hike", element: <DayHike /> },
  "": { title: "", element: <div /> },
};

type ActivityFormProps = {
  open?: boolean;
  onClose?: () => void;
  activityType: string;
}

const ActivityForm: React.FC<ActivityFormProps> = ({
  open = false, onClose = () => {}, activityType,
}) => {
  const dispatch = useAppDispatch();
  const { status, activity } = useAppSelector(selectActivitiesForm);

  const onDialogClose = () => {
    onClose();
  };

  const onClickSave = async () => {
    try {
      await dispatch(upsertActivity(activity)).unwrap();
      dispatch(clearFormActivity());
      dispatch(alertInfo("Activity saved!"));
      onClose();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      let errorMessage = "Unknown error";
      if (error.message) {
        errorMessage = error.message;
      } else {
        console.log(error);
      }
      dispatch(alertError(`Error saving activity: ${errorMessage}`));
      onClose();
    }
  };

  const selectedActivityType = activityTypes[activityType];

  return (
    <FullScreenDialog
      open={open}
      title={selectedActivityType.title}
      onClose={onDialogClose}
      onSave={onClickSave}
      saveButtonDisabled={status !== "valid"}
    >
      {selectedActivityType.element}
    </FullScreenDialog>
  );
};

export default ActivityForm;
