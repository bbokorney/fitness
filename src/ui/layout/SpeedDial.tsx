import React, { useState } from "react";
import Box from "@mui/material/Box";
import MDSpeedDial, { OpenReason } from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import ActivityForm from "../../pages/activities/Form";
import ActivityIcon from "../icons/activityIcon";
import { useAppDispatch } from "../../lib/store/hooks";
import { updateFormDialogState } from "../../lib/formDialog/formDialogSlice";

const actions = [
  {
    name: "Climbing",
    destination: "climbing",
  },
  {
    name: "Strength",
    destination: "strength",
  },
  {
    name: "Stairs",
    destination: "stairs",
  },
  {
    name: "Hike",
    destination: "day-hike",
  },
  {
    name: "Bike",
    destination: "bike",
  },
];

const SpeedDial = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const handleOpen = (_: React.SyntheticEvent<unknown>, reason: OpenReason) => {
    if (reason !== "focus") {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleClick = (aType: string) => {
    dispatch(updateFormDialogState({ open: true, activityType: aType, actionType: "Add" }));
  };

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          bottom: "86px",
          right: "15px",
          transform: "translateZ(0px)",
          flexGrow: 1,
        }}
      >
        <MDSpeedDial
          FabProps={{ color: "secondary", sx: { color: "primary.main" } }}
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          ariaLabel="SpeedDial"
          icon={<SpeedDialIcon />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              sx={{ color: "primary.main", bgcolor: "secondary.main" }}
              key={action.name}
              icon={<ActivityIcon activityType={action.destination} />}
              tooltipTitle={action.name}
              onClick={() => handleClick(action.destination)}
            />
          ))}
        </MDSpeedDial>
      </Box>
      <ActivityForm onClose={handleDialogClose} />
    </>
  );
};

export default SpeedDial;
