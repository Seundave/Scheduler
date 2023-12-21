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
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredSchedulerFailure, getFilteredSchedulerStart, getFilteredSchedulerSuccess } from "../../redux/get-schedulers/getScheduler";

const filterHistorySchema = yup.object().shape({
  lectureTheatre: yup.string(),
  capacity: yup.string(),
  status: yup.string(),
});
const FilterHistory = ({ openFilterPopup, handleClose }) => {
  const [isloading, setIsLoading] = useState(false);
  const [filteredListings, setFilteredListings] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.admin);
  const { allAdmins } = useSelector((state) => state.getAdmin);
  const methods = useForm({
    defaultValues: {
      lectureTheatre: "",
      capacity: "",
      status:"",

    },
    resolver: yupResolver(filterHistorySchema),
  });

  const {
    reset,
    setError,
    handleSubmit,
    register,
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
                CAPACITY
              </Button>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Select
                defaultValue="placeholder"
                fullWidth
                sx={{ height: "55px" }}
                name="capacity"
                {...register("capacity")}
              >
                <MenuItem disabled value="placeholder">
                  CAPACITY
                </MenuItem>
                <MenuItem value="500 seaters">500 seaters</MenuItem>
                <MenuItem value="600 seaters">600 seaters</MenuItem>
                <MenuItem value="700 seaters">700 seaters</MenuItem>
                <MenuItem value="800 seaters">800 seaters</MenuItem>
                <MenuItem value="900 seaters">900 seaters</MenuItem>
                <MenuItem value="1000 seaters">1000 seaters</MenuItem>
                <MenuItem value="1100 seaters">1100 seaters</MenuItem>
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
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
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
            "Apply filter"
          )}
        </Button>
      </form>
    </PopUpModal>
  );
};

export default FilterHistory;
