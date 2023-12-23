import React, { useEffect, useState } from "react";
import {
  Stack,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import axios from "axios";
import PopUpModal from "../../PopUpModal";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { getFilteredSchedulerFailure, getFilteredSchedulerStart, getFilteredSchedulerSuccess } from "../../redux/get-schedulers/getScheduler";

const filterHistorySchema = yup.object().shape({
  lectureTheatre: yup.string(),
  date:yup.date().typeError(),
  status: yup.string(),
});
const FilterHistory = ({ openFilterPopup, handleClose }) => {
  const [isloading, setIsLoading] = useState(false);
  const [filteredListings, setFilteredListings] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   const { loading, error } = useSelector((state) => state.admin);
  const { userScheduleListings, isLoading } = useSelector(
    (state) => state.userschedules
  );
  const methods = useForm({
    defaultValues: {
      lectureTheatre: "",
      date: undefined,
      status: "",
    },
    resolver: yupResolver(filterHistorySchema),
  });

  const {
    reset,
    setError,
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = methods;

  // useEffect(() => {
  //   const fetchAdmins = async () => {
  //     try {
  //       dispatch(getFilteredAdminStart());
  //       const response = await axios.get(
  //         "http://localhost:3000/admin/get-admins/",
  //         data
  //       );
  //       console.log(response);
  //       dispatch(getFilteredAdminSuccess(response.data))
  //     } catch (error) {
  //       dispatch(getFilteredAdminFailure(error));
  //       console.log("Error fetching admins", error);
  //     }
  //   };

  //   fetchAdmins();
  // },[]);

  // useEffect(() => {
  //   const urlParams = new URLSearchParams(location.search);
  //   const departmentUrl = urlParams.get("department");
  //   const facultyUrl = urlParams.get("faculty");

  //   if (departmentUrl || facultyUrl) {
  //     data({
  //       department: departmentUrl || "",
  //       faculty: facultyUrl || "",
  //     });
  //   }

  //   const fetchFilteredAdmins = async () => {
  //     setIsLoading(true);
  //     const searchQuery = urlParams.toString();
  //     const res = await axios.get(`admin/listing/get?${searchQuery}`); //To be changed
  //     setFilteredListings(res.data);
  //     setIsLoading(false);
  //   };

  //   fetchFilteredAdmins();
  // }, [location.search]);

  // console.log(filteredListings);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      dispatch(getFilteredSchedulerStart());
      const response = await axios.post(
        "http://localhost:3000/scheduler/filter-history/",
        data
      );
      console.log(response.data);
      dispatch(getFilteredSchedulerSuccess(response.data));
      handleClose();
    } catch (error) {
      dispatch(getFilteredSchedulerFailure(error));
      console.log("Error fetching scheduler", error);
    }
  };

  return (
    <PopUpModal
      openPopUp={openFilterPopup}
      handleClose={handleClose}
      maxWidth="md"
    >
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        FILTER
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack sx={{ marginTop: "20px" }}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={3}
              //   sx={{ justifyContent: "center", alignItems: "center", width:"100px" }}
            >
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ height: "55px" }}
                fullWidth
              >
                LECTURE THEATRE
              </Button>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Select
                defaultValue="placeholder"
                fullWidth
                sx={{ height: "55px" }}
                name="lectureTheatre"
                {...register("lectureTheatre")}
              >
                <MenuItem disabled value="placeholder">
                  LECTURE THEATRE
                </MenuItem>
                <MenuItem value="Faculty of Science Lecture Theatre">
                  Faculty of Science Lecture Theatre
                </MenuItem>
                <MenuItem value="CBN Lecture Theatre">
                  CBN Lecture Theatre
                </MenuItem>
                <MenuItem value="Department of Chemistry Lecture Theatre">
                  Department of Chemistry Lecture Theatre
                </MenuItem>
                <MenuItem value="Faculty of Art Lecture Theatre">
                  Faculty of Art Lecture Theatre
                </MenuItem>
                <MenuItem value="Faculty of Law Lecture Theatre">
                  Faculty of Law Lecture Theatre
                </MenuItem>
                <MenuItem value="College of Medicine Lecture Theatre">
                  College of Medicine Lecture Theatre
                </MenuItem>
                <MenuItem value="Faculty of Agriculture Lecture Theatre">
                  Faculty of Agriculture Lecture Theatre
                </MenuItem>
              </Select>
            </Grid>
            <Grid
              item
              xs={12}
              sm={3}
              //   sx={{ justifyContent: "center", alignItems: "center", width:"100px" }}
            >
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ height: "55px" }}
                fullWidth
              >
                DATE BOOKED
              </Button>
            </Grid>
            <Grid item xs={12} sm={9}>
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
            </Grid>

            <Grid
              item
              xs={12}
              sm={3}
              //   sx={{ justifyContent: "center", alignItems: "center", width:"100px" }}
            >
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ height: "55px" }}
                fullWidth
              >
                STATUS
              </Button>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Select
                defaultValue="placeholder"
                name="status"
                fullWidth
                sx={{ height: "59px" }}
                {...register("status")}
              >
                <MenuItem disabled value="placeholder">
                  Status
                </MenuItem>
                <MenuItem value="Active">Approve</MenuItem>
                <MenuItem value="Inactive">Decline</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </Stack>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ marginTop: "20px", marginBottom: "40px", height: "45px" }}
          fullWidth
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
            "Apply filter"
          )}
        </Button>
      </form>
    </PopUpModal>
  );
};

export default FilterHistory;
