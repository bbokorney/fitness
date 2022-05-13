import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CachedIcon from "@mui/icons-material/Cached";
import IconButton from "@mui/material/IconButton";

const TopBar = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Fitness
        </Typography>
        <IconButton color="inherit" onClick={handleReload}>
          <CachedIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
