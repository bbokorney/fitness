import Container from "@mui/material/Container";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TopBar from "../../layout/TopBar";
import Alert from "../../features/alert/Alert";
import BottomNavBar from "../../layout/BottomNavBar";
import AddPage from "../activities/Add";
import LogPage from "../activities/List";
import StatsPage from "../activities/Stats";
import SettingsPage from "../settings/Settings";
import AccountPage from "../account/Account";
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
        <Route path="/account" element={<AccountPage />} />
        <Route path="/counter" element={<Counter />} />
      </Routes>
      <BottomNavBar />
      <Alert />
    </Container>
  </BrowserRouter>
);
export default Main;
