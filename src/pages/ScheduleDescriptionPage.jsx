import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
// import { dummyData } from "../theme/CardSlider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { formSchema } from "../validation/UserRequestValidation";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getSchedulerFailure,
  getSchedulerStart,
  getSchedulerSuccess,
} from "../redux/getSchedulers/getSchedulers";
import dayjs from "dayjs";
import {
  Button,
  CardMedia,
  Container,
  Grid,
  Box,
  Stack,
  Typography,
  Select,
  FormGroup,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Paper,
  TextField,
  Chip,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import {
  scheduleFailure,
  scheduleStart,
  scheduleSuccess,
} from "../redux/userSchedule/userScheduleSlice";
import { current } from "@reduxjs/toolkit";
import { getUserListingFailure, getUserListingStart, getUserListingSuccess } from "../redux/getUserListing/getUserListing";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "9am - 10am",
  "10am - 11am",
  "11am - 12pm",
  "12pm - 1pm",
  "1pm - 2pm",
  "2pm - 3pm",
  "3pm - 4pm",
];

function getStyles(name, specialty, theme) {
  return {
    fontWeight:
      specialty.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ScheduleDescriptionPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.schedule);
  const { currentUser } = useSelector((state) => state.user);
  const [currentUserId, setCurrentUserId] = useState();
  const theme = useTheme();
  const [specialty, setSpecialty] = React.useState([]);
  const [selectedTheatre, setSelectedTheatre] = useState();
  // const [selectedItem, setSelectedItem] = useState()
  const { loading, error, allSchedulers } = useSelector(
    (state) => state.getSchedulers
  );

  useEffect(() => {
    const fetchSchedulers = async () => {
      try {
        // dispatch(getSchedulerStart());
        const response = await axios.get(
          "http://localhost:3000/scheduler/get-schedulers"
        );
        console.log(response);
        const fetchedSchedulers = response.data;
        // dispatch(getSchedulerSuccess(response.data));
        // setSchedulers(fetchedSchedulers);
        // setLoading(false);
      } catch (error) {
        // dispatch(getSchedulerFailure(error.message));
        console.log("Error fetching admins", error);
        // setLoading(false);
      }
    };

    fetchSchedulers();
  }, []);

  const selectedItem = allSchedulers.find((el) => el?._id == id);

  useEffect(() => {
    console.log(selectedItem);
    if (selectedItem) {
      setSelectedTheatre(selectedItem.lectureTheatre);
      setCurrentUserId(currentUser._id);
    }
  }, [id]);

  console.log(currentUser._id)



  const methods = useForm({
    defaultValues: {
      lectureTheatre: selectedTheatre,
      purpose: "",
      date: undefined,
      time: [],
      userRef: currentUserId,
    },
    resolver: yupResolver(formSchema),
  });

  const {
    reset,
    register,
    setError,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = methods;

  const time = watch("time", []);
  const date = watch("date", []);

  const onSubmit = async (data) => {
    try {
      dispatch(getUserListingStart());
      const res = await axios.post(
        "http://localhost:3000/schedule/request-scheduler",
        data
      );
      console.log("Request sent successfully", res.data);
      console.log(res.data);
      dispatch(getUserListingSuccess(res.data));
      toast.success("Request sent successfully!");
    } catch (error) {
      console.log(error)
      dispatch(getUserListingFailure(error));
      toast.error(error.response.data.message);
    }
  };

  // console.log(selectedItem);

  return (
    <>
      <Helmet>
        <title> Lecture Theatre Description page </title>
      </Helmet>

      <Container>
        <Typography variant="h3">Lecture Theatre Description Page </Typography>

        <Stack>
          <CardMedia
            component="img"
            height="600"
            width="700"
            alt={selectedItem.title}
            src={selectedItem.imageUrl[0]}
            sx={{ marginTop: "40px" }}
          />
          <Typography variant="h4" sx={{ marginTop: "30px" }}>
            {selectedItem.lectureTheatre}
          </Typography>
          <Typography sx={{ marginTop: "20px" }}>
            {selectedItem.description}
          </Typography>
        </Stack>

        <Paper
          elevation={4}
          sx={{
            backgroundColor: "white",
            padding: "40px",
            marginTop: "30px",
            borderRadius: "10px",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="date"
                  control={control} // Pass the control object from useForm()
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        {...field}
                        sx={{ width: "100%" }}
                        slotProps={{
                          textField: {
                            placeholder: "Select Date",
                          },
                        }}
                        format="DD/MM/YYYY"
                        fullWidth
                      />
                    </LocalizationProvider>
                  )}
                />
                <Typography sx={{ color: "red" }}>
                  {errors.date?.message}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl
                  sx={{
                    // marginTop: "15px",
                    marginLeft: { xs: "0px", sm: "10px" },
                  }}
                  fullWidth
                >
                  <InputLabel id="demo-multiple-name-label">
                    Select Time
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={time}
                    // value={specialty}
                    // onChange={handleChange}
                    // name="interest"
                    {...register("time")}
                    // {...register("interest")}
                    renderValue={(selected, index) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected?.map((value, index) => (
                          <Chip
                            key={value}
                            label={index + 1 + "." + " " + value}
                          />
                        ))}
                      </Box>
                    )}
                    // input={<OutlinedInput label="Special Interest" />}
                    MenuProps={MenuProps}
                  >
                    {names.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, specialty, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                  {/* <Typography variant="body2">
                    Select schedule time
                  </Typography> */}
                </FormControl>

                <Typography sx={{ color: "red" }}>
                  {errors.time?.message}
                </Typography>
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <Select
                  // multiple
                  fullWidth
                  value="Select Time"
                  sx={{ height: "55px" }}
                  {...register("time")}
                  // renderValue={(selected, index) => (
                  //     console.log(selected)
                  //   <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  //     {selected?.map((value, index) => (
                  //       <Chip
                  //         key={value}
                  //         label={index + 1 + "." + " " + value}
                  //       />
                  //     ))}
                  //   </Box>
                  // )}
                >
                  <MenuItem  value="Select Time">Select Time</MenuItem>
                  <FormGroup sx={{ paddingLeft: "8px" }}>
                    <FormControlLabel
                    value={"9am - 10am"}
                      control={<Checkbox defaultChecked />}
                      label="9am - 10am"
                    />

                    <FormControlLabel
                      // required
                      control={<Checkbox />}
                      label="10am - 11am"
                    />
                    <FormControlLabel
                      disabled
                      control={<Checkbox />}
                      label="11am - 12pm"
                    />
                    <FormControlLabel
                      // disabled
                      control={<Checkbox />}
                      label="12pm - 1pm"
                    />
                    <FormControlLabel
                      disabled
                      control={<Checkbox />}
                      label="1pm - 2pm"
                    />
                    <FormControlLabel
                      // disabled
                      control={<Checkbox />}
                      label="2pm - 3pm"
                    />
                    <FormControlLabel
                      disabled
                      control={<Checkbox />}
                      label="3pm - 4pm"
                    />
                  </FormGroup>
                </Select>
              </Grid> */}
              <Typography sx={{ color: "red" }}>
                {errors.time?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                placeholder="Purpose"
                name="message"
                multiline
                rows={6}
                {...register("purpose")}
                sx={{ marginTop: "30px" }}
                fullWidth
              />
              <Typography sx={{ color: "red" }}>
                {errors.purpose?.message}
              </Typography>
            </Grid>

            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              disabled={isLoading}
              sx={{ marginTop: "20px" }}
              // onClick={handleClick}
            >
              {isLoading ? (
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
                "Book Resource Center"
              )}
            </Button>
          </form>
          <Typography sx={{ marginTop: "15px" }}>
            Kindly check your history page for confirmation in the next 24 hours
          </Typography>
        </Paper>
      </Container>
    </>
  );
};

export default ScheduleDescriptionPage;
