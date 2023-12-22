import { Helmet } from "react-helmet-async";
// @mui
import { styled } from "@mui/material/styles";
import {
  Link,
  Container,
  Typography,
  Divider,
  Stack,
  Button,
  CircularProgress,
} from "@mui/material";
// hooks
import useResponsive from "../hooks/useResponsive";
// components
import Logo from "../components/logo";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { signOutUser } from "../redux/schedulerUsers/userSlice";

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const StyledSection = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: 480,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LogOut() {
  const mdUp = useResponsive("up", "md");
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(signOutUser());
      localStorage.clear();
      sessionStorage.clear();
    }, 3000);
  });

  if (!currentUser) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      {/* <Helmet>
        <title> Login | UI Portal</title>
      </Helmet> */}

      <StyledRoot>
       
        <Container maxWidth="sm">
          <StyledContent sx={{justifyContent: "center", alignItems: "center"}}>
            <Stack direction={"row"} spacing={2}>
              <CircularProgress size={30} />
              <Typography variant="h4" gutterBottom>
                Logging Out
              </Typography>
            </Stack>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}