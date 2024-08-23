import { Button, Menu, Fade, MenuItem } from "@mui/material";
import React from "react";
import { useappdispatch, useappselectore } from "../store/configureStore";
import { useNavigate } from "react-router";
import { signout } from "../../Features/Account/AccountSlice";
import { clearbasket } from "../../Features/Basket/Bsketslice";
import { Link } from "react-router-dom";

export default function SignInMenu() {
  const dispatch = useappdispatch();
  const { user } = useappselectore((state) => state.Account);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  return (
    <>
      <Button onClick={handleClick} color="inherit" sx={{ typography: "h6" }}>
        {user?.email}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem component={Link} to="/orders">
          My Order
        </MenuItem>
        <MenuItem
          onClick={async () => {
            try {
              await dispatch(signout());
              await dispatch(clearbasket());

              navigate("/");
            } catch (error) {
              console.log(error);
            }
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
