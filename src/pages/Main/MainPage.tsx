import { useState } from "react";
import Container from "@mui/material/Container";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AddIcon from "@mui/icons-material/Add";
import ViewListIcon from "@mui/icons-material/ViewList";
import BarChartIcon from "@mui/icons-material/BarChart";
import Paper from "@mui/material/Paper";
import {
  BrowserRouter, Route, Routes, Link,
} from "react-router-dom";
import AddPage from "../Add/AddPage";
import LogPage from "../Log/LogPage";
import StatsPage from "../Stats/StatsPage";
import Counter from "../../features/counter/Counter";
import TopBar from "../../layout/TopBar";
import Alert from "../../features/alert/Alert";

const Main = () => {
  const [value, setValue] = useState("");

  return (
    <>
      <TopBar />
      <Container>
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
              <Link to="/counter">
                <BottomNavigationAction icon={<BarChartIcon />} />
              </Link>
            </BottomNavigation>
          </Paper>
        </BrowserRouter>
        <Alert />
      </Container>
    </>
  );
};
export default Main;
