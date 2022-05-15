import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import AccountMenu from "../components/AccountMenu/AccountMenu";

const TopBar = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Fitness
      </Typography>
      <AccountMenu />
    </Toolbar>
  </AppBar>
);

export default TopBar;
