import { ShoppingCart, Title } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
const midlist = [
  { title: "catalog", path: "/catalog" },
  { title: "contact", path: "/contact" },
  { title: "about", path: "/about" },
];
const rightlist = [
  { title: "login", path: "/login" },
  { title: "logout", path: "/logout" },
];
const navstyle = {
  color: "inherit",
  typography: "h6",
  "&:hover": { color: "grey.500" },
  "&.active": { color: "text.secondary" },
  textDecoration: "none",
};
function Header({ handleswithch, darkmode }: headerprops) {
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box display="flex" alignItems="center">
          <Typography variant="h6" component={NavLink} to="/" sx={navstyle}>
            Re-Store
          </Typography>
          <Switch onChange={handleswithch} checked={darkmode} />
        </Box>
        <List sx={{ display: "flex" }}>
          {midlist.map(({ title, path }) => (
            <ListItem component={NavLink} to={path} key={path} sx={navstyle}>
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>
        <Box sx={{ display: "flex" }}>
          <IconButton size="large" sx={{ color: "inhiret" }}>
            <Badge badgeContent={4} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <List sx={{ display: "flex" }}>
            {rightlist.map(({ title, path }) => (
              <ListItem component={NavLink} to={path} key={path} sx={navstyle}>
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
interface headerprops {
  handleswithch: () => void;
  darkmode: boolean;
}
