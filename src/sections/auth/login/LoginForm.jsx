import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../../../redux/schedulerUsers/userSlice";
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
  CircularProgress,
  Box,
} from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
// components
import Iconify from "../../../components/iconify";

// ----------------------------------------------------------------------

const loginSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),

  // emailOrPF: yup
  //   .mixed()
  //   .test('emailOrPF', 'Enter a valid email or PF number', function (value) {
  //     const isValidEmail = yup.string().email().isValidSync(value);
  //     const isValidPF = /* Add your validation logic for PF number */;
  //     return isValidEmail || isValidPF;
  //   })
  //   .required('Email or PF number is required'),
});
export default function LoginForm() {
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
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
      dispatch(signInStart());
      const res = await axios.post("http://localhost:3000/user/signin", data, {
        withCredentials: true,
      });
      console.log("User logged in successfully", res.data);
      console.log(res.data);
      dispatch(signInSuccess(res.data));
      toast.success("Login successfully!");
      navigate("/dashboard", { replace: true });
      // setError(null);
    } catch (error) {
      // console.log("Error signing in", error);
      dispatch(signInFailure(error.message));
      toast.error(error.response.data.message);
      // console.log(error.response.data.message)
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <TextField
            name="email"
            label="Email Address / PF Number"
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
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "50px",
                  height: "50px",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              "LOGIN"
            )}
          </Button>
          {/* {error && <Typography sx={{ color: "red" }}>{error}</Typography>} */}
        </Stack>
      </form>
    </>
  );
}
