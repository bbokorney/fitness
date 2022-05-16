import Typography from "@mui/material/Typography";
import { useAppSelector } from "../../app/hooks";
import { selectAuth } from "../../features/auth/authSlice";

const Account = () => {
  const { user } = useAppSelector(selectAuth);
  return (
    <>
      <Typography variant="h6">
        My Account
      </Typography>
      <Typography>Name: {user?.displayName}</Typography>
      <Typography>Email: {user?.email}</Typography>
      <Typography>User ID:{user?.id}</Typography>
    </>
  );
};

export default Account;
