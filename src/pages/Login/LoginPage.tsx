import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useAppSelector } from "../../app/hooks";
import { selectAuth } from "../../features/auth/authSlice";
import { signInPopup } from "../../features/auth/auth";

const Login = () => {
  const { user } = useAppSelector(selectAuth);
  const loggedIn = (user == null);
  const message = loggedIn ? "Not logged in" : "Logged in!";

  const onLoginClick = () => {
    signInPopup();
  };

  return (
    <Container>
      <Typography>{message}</Typography>
      <Button onClick={onLoginClick} variant="contained">Log In</Button>
    </Container>
  );
};

export default Login;
