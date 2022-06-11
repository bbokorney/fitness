import { useState } from "react";
import Box from "@mui/material/Box";
import MDSpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import HikingIcon from "@mui/icons-material/Hiking";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { useNavigate } from "react-router-dom";

const actions = [
  { icon: <FitnessCenterIcon />, name: "Strength", destination: "/activities/add/strength" },
  { icon: <HikingIcon />, name: "Hike", destination: "/activities/add/day-hike" },
  { icon: <DirectionsBikeIcon />, name: "Bike", destination: "/activities/add/bike" },
];

const SpeedDial = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = (destination: string) => {
    navigate(destination);
    handleClose();
  };

  return (
    <Box sx={{
      position: "fixed",
      bottom: "70px",
      right: "15px",
      transform: "translateZ(0px)",
      flexGrow: 1,
    }}
    >
      <MDSpeedDial
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        ariaLabel="SpeedDial basic example"
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => handleClick(action.destination)}
          />
        ))}
      </MDSpeedDial>
    </Box>
  );
};

export default SpeedDial;
