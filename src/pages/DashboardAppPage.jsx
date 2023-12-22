import React, { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Box,
  Button,
  Paper,
  Grid,
  Select,
  MenuItem,
  TextField,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";
import CardSlider from "../theme/CardSlider";
import { CloudArrowUp } from "@phosphor-icons/react";
import UniversityLogo from "../assets/university.png";
import Statistics from "../theme/Statistics";
import { useSelector } from "react-redux";

const DashboardAppPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [image, setImage] = useState();
  const inputRef = useRef(null);

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setImage(event.dataTransfer.files[0]);
  };

  const handleImageClick = () => {
    inputRef.current.click();
    console.log("clicked");
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <div>
      <Helmet>
        <title> Home </title>
      </Helmet>
      {currentUser && (
        <Typography variant="h4"> Hello, {currentUser.name}</Typography>
      )}
      <CardSlider />

      <Statistics />

      {/* Start of staff details */}
      {/* <Paper
        elevation={4}
        sx={{
          backgroundColor: "white",
          padding: "40px",
          marginTop: "30px",
          borderRadius: "10px",
        }}
      >
        <Typography
          variant="h6"
          style={{ marginBottom: 25, fontWeight: "bold" }}
        >
          {" "}
          Add Resource
        </Typography>
        <form>
          <Stack
            spacing={{ xs: 1, sm: 0 }}
            direction="row"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            sx={{
              border: "1px dashed #DCE0E4",
              borderRadius: "10px",
              margin: "50px auto",
              justifyContent: "center",
              alignItems: "center",
              maxWidth: "100%",
              paddingY: "40px",
            }}
          >
            <Box
              sx={{
                height: { xs: "50px", sm: "115px" },
                width: { xs: "50px", sm: "125px" },
                pl: { xs: 1, sm: 0 },
                alignItems: "center",
                marginRight: { xs: "0px", sm: "30px" },
              }}
            >
              {image ? (
                <img
                  style={{ width: "100%", height: "100%" }}
                  src={URL.createObjectURL(image)}
                  alt="school-logo"
                />
              ) : (
                <img
                  style={{ width: "100%", height: "100%" }}
                  src={UniversityLogo}
                  alt="brighton-logo"
                />
              )}
            </Box>
            <Stack
              // spacing={3}
              style={{
                // width: "318.9px",
                alignItems: "center",
                maxWidth: "100%",
              }}
            >
              <IconButton
                sx={{ width: "fit-content", bgcolor: "white" }}
                onChange={handleImageChange}
                onClick={handleImageClick}
              >
                <CloudArrowUp size={32} color="black" />
                <input type="file" ref={inputRef} style={{ display: "none" }} />
              </IconButton>
              <Typography
                fontSize={{ xs: "8px", sm: "13px" }}
                sx={{ textAlign: "center" }}
              >
                Click to upload or drag and drop scheduler thumbnail image (JPG){" "}
              </Typography>
            </Stack>
          </Stack>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Select
                defaultValue="placeholder"
                fullWidth
                sx={{ height: "40px" }}
              >
                <MenuItem value="placeholder">Lecture theatre</MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Select
                defaultValue="placeholder"
                fullWidth
                sx={{ height: "40px" }}
              >
                <MenuItem value="placeholder">Location</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Select
                defaultValue="placeholder"
                fullWidth
                sx={{ height: "40px" }}
              >
                <MenuItem value="placeholder">Capacity</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                placeholder="Description"
                name="message"
                multiline
                rows={6}
                fullWidth
              />
            </Grid>
          </Grid>
          <Button
            sx={{ bgcolor: "#e5e5e5", marginTop: "20px", marginBottom: "20px" }}
            fullWidth
          >
            Create Scheduler
          </Button>
        </form>
      </Paper> */}
    </div>
  );
};

export default DashboardAppPage;
