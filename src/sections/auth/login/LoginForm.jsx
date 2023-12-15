import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
  const [loading, setLoading] = useState(false);
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
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3000/auth/signin", data);
      console.log("User logged in successfully", res.data);
      setError(null);
    } catch (error) {
      console.log("Error signing in", error);
      setLoading(false);
      setError(error.message);
    }
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
            <Stack direction="row" alignItems="center">
              <Checkbox name="remember" label="Remember me" />
              <Typography>Remember me</Typography>
            </Stack>
            <Stack>
              <Link to="/forget-password" variant="subtitle2" underline="hover">
                Forgot password?
              </Link>
            </Stack>
          </Stack>
          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            disabled={loading}
            // onClick={handleClick}
          >
            {loading ? "Loading..." : "LOGIN"}
          </Button>
        </Stack>
      </form>
    </>
  );
}
