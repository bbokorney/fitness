import Container from "@mui/material/Container";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TopBar from "../../layout/TopBar";
import Alert from "../../features/alert/Alert";
import BottomNavBar from "../../layout/BottomNavBar";
import AddActivityForm from "../activities/Add";
import ActivitesList from "../activities/List";
import ActivitiesStats from "../activities/Stats";
import Settings from "../settings/Settings";
import Account from "../account/Account";
import Counter from "../../features/counter/Counter";

const Main = () => (
  <BrowserRouter>
    <TopBar />
    <Container>
      <Routes>
        <Route path="/" element={<AddActivityForm />} />
        <Route path="/log" element={<ActivitesList />} />
        <Route path="/stats" element={<ActivitiesStats />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/account" element={<Account />} />
        <Route path="/counter" element={<Counter />} />
      </Routes>
      <BottomNavBar />
      <Alert />
    </Container>
  </BrowserRouter>
);
export default Main;
