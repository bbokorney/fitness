import { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Toolbar from "@mui/material/Toolbar";
import AddIcon from "@mui/icons-material/Add";
import ViewListIcon from "@mui/icons-material/ViewList";
import BarChartIcon from "@mui/icons-material/BarChart";
import Paper from "@mui/material/Paper";
import {
  BrowserRouter, Route, Routes, Link,
} from "react-router-dom";
import AddPage from "./pages/Add/AddPage";
import LogPage from "./pages/Log/LogPage";
import StatsPage from "./pages/Stats/StatsPage";

const App = () => {
  const [value, setValue] = useState("");

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Fitness
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AddPage />} />
            <Route path="/log" element={<LogPage />} />
            <Route path="/stats" element={<StatsPage />} />
          </Routes>
          <Paper
            sx={{
              position: "fixed", bottom: 0, left: 0, right: 0,
            }}
            elevation={3}
          >
            <BottomNavigation
              showLabels
              value={value}
              onChange={(_, newValue) => {
                setValue(newValue);
              }}
            >
              <Link to="/">
                <BottomNavigationAction icon={<AddIcon />} />
              </Link>
              <Link to="/log">
                <BottomNavigationAction icon={<ViewListIcon />} />
              </Link>
              <Link to="/stats">
                <BottomNavigationAction icon={<BarChartIcon />} />
              </Link>
            </BottomNavigation>
          </Paper>
        </BrowserRouter>
      </Container>
    </>
  );
};

export default App;
