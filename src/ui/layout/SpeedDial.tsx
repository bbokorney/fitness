import React, { useState } from "react";
import Box from "@mui/material/Box";
import MDSpeedDial, { OpenReason } from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import ActivityForm from "../../pages/activities/Form";
import ActivityIcon from "../icons/activityIcon";

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
  const [open, setOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [activityType, setActivityType] = useState("");

  const handleOpen = (_: React.SyntheticEvent<unknown>, reason: OpenReason) => {
    if (reason !== "focus") {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDialogClose = () => {
    setFormOpen(false);
    setOpen(false);
  };

  const handleClick = (aType: string) => {
    setActivityType(aType);
    setFormOpen(true);
  };

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          bottom: "70px",
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
      <ActivityForm open={formOpen} activityType={activityType} onClose={handleDialogClose} />
    </>
  );
};

export default SpeedDial;
