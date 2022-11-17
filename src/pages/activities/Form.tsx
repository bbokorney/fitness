import React from "react";
import { useAppSelector, useAppDispatch } from "../../lib/store/hooks";
import {
  selectActivitiesForm,
  upsertActivity,
  clearFormActivity,
} from "../../lib/activities/activitiesSlice";
import { clearFormDialogState, selectFormDialog } from "../../lib/formDialog/formDialogSlice";
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
  strength: { title: "strength workout", element: <StrengthForm /> },
  stairs: { title: "stairs workout", element: <StairsForm /> },
  climbing: { title: "climbing workout", element: <ClimbingForm /> },
  bike: { title: "bike ride", element: <BikeForm /> },
  "day-hike": { title: "hike", element: <DayHike /> },
  "": { title: "", element: <div /> },
};

type ActivityFormProps = {
  onClose?: () => void;
}

const ActivityForm: React.FC<ActivityFormProps> = ({
  onClose = () => {},
}) => {
  const dispatch = useAppDispatch();
  const { open, activityType, actionType } = useAppSelector(selectFormDialog);
  const { status, activity } = useAppSelector(selectActivitiesForm);

  const onDialogClose = () => {
    dispatch(clearFormDialogState());
    dispatch(clearFormActivity());
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
      title={`${actionType} ${selectedActivityType.title}`}
      onClose={onDialogClose}
      onSave={onClickSave}
      saveButtonDisabled={status !== "valid"}
    >
      {selectedActivityType.element}
    </FullScreenDialog>
  );
};

export default ActivityForm;
