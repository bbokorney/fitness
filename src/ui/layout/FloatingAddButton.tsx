import { useState, MouseEvent } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

const FloatingAddButton = () => {
  const elem = <ActivityTypeMenu />;
  return (
    <Box
      sx={{
        position: "fixed", bottom: "70px", right: "15px",
      }}
    >
      {elem}
    </Box>

  );
};
export default FloatingAddButton;

const ActivityTypeMenu = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (destination: string) => {
    navigate(destination);
    setAnchorEl(null);
  };
  return (
    <>
      <Fab color="primary" onClick={handleClick}>
        <AddIcon />
      </Fab>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={() => handleClose("/activities/add")}>Core</MenuItem>
        <MenuItem onClick={() => handleClose("/activities/add")}>Strength + antagonist</MenuItem>
        <MenuItem onClick={() => handleClose("/activities/add")}>Day hike</MenuItem>
      </Menu>
    </>
  );
};
