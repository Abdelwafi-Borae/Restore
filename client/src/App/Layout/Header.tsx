import { AppBar, Switch, Toolbar, Typography } from "@mui/material";

function Header({ handleswithch, darkmode }: headerprops) {
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6">Re-Store</Typography>
        <Switch
          defaultChecked
          color="secondary"
          onChange={handleswithch}
          checked={darkmode}
        />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
interface headerprops {
  handleswithch: () => void;
  darkmode: boolean;
}
