import "./features/auth/auth";
import { useAppSelector } from "./app/hooks";
import { selectAuth } from "./features/auth/authSlice";
import Main from "./pages/main/Main";
import Login from "./pages/login/Login";

const App = () => {
  const { user } = useAppSelector(selectAuth);
  const elem = (user == null) ? <Login /> : <Main />;
  return (
    elem
  );
};

export default App;
