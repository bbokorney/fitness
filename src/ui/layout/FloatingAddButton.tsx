import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";

const FloatingAddButton = () => (
  <Fab
    color="primary"
    sx={{
      position: "fixed", bottom: "70px", right: "15px",
    }}
  >
    <AddIcon />
  </Fab>
);
export default FloatingAddButton;
