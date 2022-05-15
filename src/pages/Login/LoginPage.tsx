import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { useAppSelector } from "../../app/hooks";
import { selectAuth } from "../../features/auth/authSlice";
import { signUserIn } from "../../features/auth/auth";

const Login = () => {
  const { user, status } = useAppSelector(selectAuth);
  const loggedIn = (user == null);
  const initialized = status === "initialized";

  const message = loggedIn ? "Not logged in" : "Logged in!";

  const onLoginClick = () => {
    signUserIn();
  };

  let elem;
  if (initialized) {
    elem = (
      <>
        <Typography>{message}</Typography>
        <Button onClick={onLoginClick} variant="contained">Log In</Button>
      </>
    );
  } else {
    elem = <CircularProgress />;
  }

  return (
    <Container>
      {elem}
    </Container>
  );
};

export default Login;
