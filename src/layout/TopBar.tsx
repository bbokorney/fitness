import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CachedIcon from "@mui/icons-material/Cached";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { signUserOut } from "../features/auth/auth";

const TopBar = () => {
  const handleReload = () => {
    window.location.reload();
  };

  const onLogoutClicked = () => {
    signUserOut();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Fitness
        </Typography>
        <Typography component="div" sx={{ flexGrow: 1 }}>
          {process.env.REACT_APP_VERSION}
        </Typography>
        <Button onClick={onLogoutClicked}>Logout</Button>
        <IconButton color="inherit" onClick={handleReload}>
          <CachedIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
