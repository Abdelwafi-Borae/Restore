import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import agent from "../../App/API/agent";

import { FieldValues, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";

import { useDispatch } from "react-redux";
import { useappdispatch } from "../../App/store/configureStore";
import { signInUser } from "./AccountSlice";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
  } = useForm({ mode: "onTouched" });
  const navigate = useNavigate();
  const dispatch = useappdispatch();
  async function submitform(data: FieldValues) {
    dispatch(signInUser(data));
    navigate("/catalog");
  }
  return (
    <Container
      component={Paper}
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 4,
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(submitform)}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          fullWidth
          label="User Name"
          //   autoComplete="email"
          autoFocus
          {...register("username", { required: "user name is required" })}
          error={!!errors.username}
          helperText={"user name is required"}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          id="password"
          {...register("password", { required: "password is required" })}
          error={!!errors.password}
          helperText={"password name is required"}
        />

        <LoadingButton
          loading={isSubmitting}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={!isValid}
        >
          Sign In
        </LoadingButton>
        <Grid container>
          <Grid item>
            <Link to="/register">{"Don't have an account? Sign Up"}</Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
