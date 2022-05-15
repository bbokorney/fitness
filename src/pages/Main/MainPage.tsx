import Container from "@mui/material/Container";
import TopBar from "../../layout/TopBar";
import Alert from "../../features/alert/Alert";
import BottomNavBar from "../../layout/BottomNavBar";

const Main = () => (
  <>
    <TopBar />
    <Container>
      <BottomNavBar />
      <Alert />
    </Container>
  </>
);
export default Main;
