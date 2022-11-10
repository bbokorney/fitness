import {
  Link as RouterLink,
  useLocation,
} from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import ViewListIcon from "@mui/icons-material/ViewList";
import BarChartIcon from "@mui/icons-material/BarChart";
import Paper from "@mui/material/Paper";

const BottomNavBar = () => {
  const location = useLocation();
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom: 2,
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={location.pathname}
      >
        <BottomNavigationAction
          label="Home"
          value="/"
          icon={<HomeIcon />}
          component={RouterLink}
          to="/"
        />
        <BottomNavigationAction
          label="Activities"
          value="/activities/list"
          icon={<ViewListIcon />}
          component={RouterLink}
          to="/activities/list"
        />
        <BottomNavigationAction
          label="Stats"
          value="/activities/stats"
          icon={<BarChartIcon />}
          component={RouterLink}
          to="/activities/stats"
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNavBar;
