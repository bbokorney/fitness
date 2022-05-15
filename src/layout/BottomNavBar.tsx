import {
  Link as RouterLink,
  useLocation,
} from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AddIcon from "@mui/icons-material/Add";
import ViewListIcon from "@mui/icons-material/ViewList";
import BarChartIcon from "@mui/icons-material/BarChart";
import Paper from "@mui/material/Paper";

const BottomNavBar = () => {
  const location = useLocation();
  return (
    <Paper
      sx={{
        position: "fixed", bottom: 0, left: 0, right: 0,
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels={false}
        value={location.pathname}
      >
        <BottomNavigationAction
          label="Add"
          value="/"
          icon={<AddIcon />}
          component={RouterLink}
          to="/"
        />
        <BottomNavigationAction
          label="Log"
          value="/log"
          icon={<ViewListIcon />}
          component={RouterLink}
          to="/log"
        />
        <BottomNavigationAction
          label="Stats"
          value="/stats"
          icon={<BarChartIcon />}
          component={RouterLink}
          to="/stats"
        />
        <BottomNavigationAction
          label="Counter"
          value="/counter"
          icon={<BarChartIcon />}
          component={RouterLink}
          to="/counter"
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNavBar;
