import Typography from "@mui/material/Typography";

const SettingsPage = () => (
  <>
    <Typography variant="h6">
      Settings
    </Typography>

    <Typography component="div" sx={{ flexGrow: 1 }}>
      App version: {process.env.REACT_APP_VERSION}
    </Typography>
  </>
);
export default SettingsPage;
