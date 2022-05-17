import Container from "@mui/material/Container";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TopBar from "../../ui/layout/TopBar";
import Alert from "../../ui/alert/Alert";
import BottomNavBar from "../../ui/layout/BottomNavBar";
import ActivityForm from "../activities/Form";
import ActivitesList from "../activities/List";
import ActivitiesStats from "../activities/Stats";
import Settings from "../settings/Settings";
import Account from "../account/Account";
import Counter from "../../ui/counter/Counter";
import FloatingAddButton from "../../ui/layout/FloatingAddButton";
import Home from "../home/Home";

const Main = () => (
  <BrowserRouter>
    <TopBar />
    <Container>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activities">
          <Route path="add">
            <Route path=":activityType" element={<ActivityForm />} />
          </Route>
          <Route path="list" element={<ActivitesList />} />
          <Route path="stats" element={<ActivitiesStats />} />
        </Route>
        <Route path="/settings" element={<Settings />} />
        <Route path="/account" element={<Account />} />
        <Route path="/counter" element={<Counter />} />
      </Routes>
      <FloatingAddButton />
      <BottomNavBar />
      <Alert />
    </Container>
  </BrowserRouter>
);
export default Main;
