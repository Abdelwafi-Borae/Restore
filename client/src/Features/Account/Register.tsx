import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import agent from "../../App/API/agent";
import { toast } from "react-toastify";
import { Pattern } from "@mui/icons-material";
export default function Register() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, isValid, errors },
  } = useForm({ mode: "onTouched" });
  const navigate = useNavigate();
  function handleerror(eerrors: any) {
    if (eerrors) {
      eerrors.forEach((error: string) => {
        console.log("fff");
        console.log(error);

        if (error.includes("password")) {
          setError("password", { message: error });
        } else if (error.includes("Email")) {
          setError("email", { message: error });
        } else if (error.includes("usename")) {
          setError("username", { message: error });
        }
        //console.log(error);
      });
    }
    console.log("INSIDE HANDLE ERROR");
    console.log(eerrors);
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
        Register
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit((data) => {
          agent.Account.register(data)
            .then(() => {
              toast.success("successfully signed up");
              navigate("/Login");
            })
            .catch((error: any) => {
              console.log(" INSIDE handleSubmit ");
              console.log(error);
              toast.error(" not errror signed up");
              handleerror(error);
            });
        })}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          fullWidth
          label="User Name"
          {...register("username", { required: "user name is required" })}
          error={!!errors.username}
          helperText={errors?.username?.message?.toString()}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Email"
          {...register("email", {
            required: "email name is required",
            pattern: {
              value:
                /^([\w\-\.]+)@((\[([0-9]{1,3}\.){3}[0-9]{1,3}\])|(([\w\-]+\.)+)([a-zA-Z]{2,4}))$/,
              message: "not valid email",
            },
          })}
          error={!!errors.email}
          helperText={errors?.email?.message?.toString()}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          {...register("password", {
            required: "password is required",
            pattern: {
              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/,
              message: "not valid password",
            },
          })}
          error={!!errors.password}
          helperText={errors?.password?.message?.toString()}
        />

        <LoadingButton
          loading={isSubmitting}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          //disabled={!isValid}
        >
          Register
        </LoadingButton>
        <Grid container>
          <Grid item>
            <Link to="/login">{"Already have an account? Sign In"}</Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
