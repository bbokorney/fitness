import { useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Link as RouterLink,
} from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AddIcon from "@mui/icons-material/Add";
import ViewListIcon from "@mui/icons-material/ViewList";
import BarChartIcon from "@mui/icons-material/BarChart";
import Paper from "@mui/material/Paper";
import AddPage from "../pages/Add/AddPage";
import LogPage from "../pages/Log/LogPage";
import StatsPage from "../pages/Stats/StatsPage";
import Counter from "../features/counter/Counter";

const BottomNavBar = () => {
  const [value, setValue] = useState("/");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AddPage />} />
        <Route path="/log" element={<LogPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/counter" element={<Counter />} />
      </Routes>
      <Paper
        sx={{
          position: "fixed", bottom: 0, left: 0, right: 0,
        }}
        elevation={3}
      >
        <BottomNavigation
          showLabels={false}
          value={value}
          onChange={(_, newValue) => {
            setValue(newValue);
          }}
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
            value="log"
            icon={<ViewListIcon />}
            component={RouterLink}
            to="/log"
          />
          <BottomNavigationAction
            label="Stats"
            value="stats"
            icon={<BarChartIcon />}
            component={RouterLink}
            to="/stats"
          />
          <BottomNavigationAction
            label="Counter"
            value="counter"
            icon={<BarChartIcon />}
            component={RouterLink}
            to="/counter"
          />
        </BottomNavigation>
      </Paper>
    </BrowserRouter>
  );
};

export default BottomNavBar;
