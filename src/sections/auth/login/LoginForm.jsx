import { useState } from "react";
import { useNavigate } from "react-router-dom";
// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
  Button,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
// components
import Iconify from "../../../components/iconify";

// ----------------------------------------------------------------------

const loginSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
});
export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });

  const {
    reset,
    setError,
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  // const handleClick = () => {
  //   navigate("/dashboard", { replace: true });
  // };

  const onSubmit = async (data) => {
    console.log(data);
    console.log("clicked");
    navigate("/dashboard", { replace: true });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <TextField
            name="email"
            label="Email address"
            {...register("email")}
          />
          <Typography sx={{ color: "red" }}>{errors.email?.message}</Typography>

          <TextField
            name="password"
            label="Password"
            {...register("password")}
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    <Iconify
                      icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Typography sx={{ color: "red" }}>
            {errors.password?.message}
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ my: 2 }}
          >
            <Checkbox name="remember" label="Remember me" />
            <Link variant="subtitle2" underline="hover">
              Forgot password?
            </Link>
          </Stack>
          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            // onClick={handleClick}
          >
            Login
          </Button>
        </Stack>
      </form>
    </>
  );
}
