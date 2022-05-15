import Container from "@mui/material/Container";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TopBar from "../../layout/TopBar";
import Alert from "../../features/alert/Alert";
import BottomNavBar from "../../layout/BottomNavBar";
import AddPage from "../Add/AddPage";
import LogPage from "../Log/LogPage";
import StatsPage from "../Stats/StatsPage";
import SettingsPage from "../Settings/SettingsPage";
import Counter from "../../features/counter/Counter";

const Main = () => (
  <BrowserRouter>
    <TopBar />
    <Container>
      <Routes>
        <Route path="/" element={<AddPage />} />
        <Route path="/log" element={<LogPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/counter" element={<Counter />} />
      </Routes>
      <BottomNavBar />
      <Alert />
    </Container>
  </BrowserRouter>
);
export default Main;
