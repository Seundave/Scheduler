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
import {
  getFilteredAdminFailure,
  getFilteredAdminStart,
  getFilteredAdminSuccess,
} from "../../redux/get-admins/getAdmins";

const filterFormSchema = yup.object().shape({
  faculty: yup.string(),
  department: yup.string(),
});
const FilterAdmin = ({ openFilterPopup, handleClose }) => {
  const [isloading, setIsLoading] = useState(false);
  const [filteredListings, setFilteredListings] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.admin);
  const { allAdmins } = useSelector((state) => state.getAdmin);
  const methods = useForm({
    defaultValues: {
      faculty: "",
      department: "",
    },
    resolver: yupResolver(filterFormSchema),
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
    console.log(data)
    try {
      dispatch(getFilteredAdminStart());
      const response = await axios.post(
        "http://localhost:3000/admin/get-admins/",
        data
      );
      console.log(response.data);
      dispatch(getFilteredAdminSuccess(response.data));
      handleClose();
    } catch (error) {
      dispatch(getFilteredAdminFailure(error));
      toast.error(error.response.data.message)
      console.log("Error fetching admins", error);
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
                FACULTY
              </Button>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Select
                defaultValue="placeholder"
                fullWidth
                sx={{ height: "55px" }}
                name="faculty"
                {...register("faculty")}
              >
                <MenuItem disabled value="placeholder">
                  FACULTY
                </MenuItem>
                <MenuItem value="FACULTY OF AGRICULTURE AND FORESTRY">
                  FACULTY OF AGRICULTURE AND FORESTRY
                </MenuItem>
                <MenuItem value="FACULTY OF ARTS">FACULTY OF ARTS</MenuItem>
                <MenuItem value="COLLEGE OF MEDICINE">
                  COLLEGE OF MEDICINE
                </MenuItem>
                <MenuItem value="FACULTY OF EDUCATION">
                  FACULTY OF EDUCATION
                </MenuItem>
                <MenuItem value="FACULTY OF PHARMACY">
                  FACULTY OF PHARMACY
                </MenuItem>
                <MenuItem value="FACULTY OF SCIENCE">
                  FACULTY OF SCIENCE
                </MenuItem>
                <MenuItem value="FACULTY OF THE SOCIAL SCIENCES">
                  FACULTY OF THE SOCIAL SCIENCES
                </MenuItem>
                <MenuItem value="FACULTY OF TECHNOLOGY">
                  FACULTY OF TECHNOLOGY
                </MenuItem>
                <MenuItem value="FACULTY OF VETERINARY MEDICINE">
                  FACULTY OF VETERINARY MEDICINE
                </MenuItem>
                <MenuItem value="AFRICA REGIONAL CENTRE FOR INFORMATION SCIENCE">
                  AFRICA REGIONAL CENTRE FOR INFORMATION SCIENCE
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
                DEPARTMENT
              </Button>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Select
                defaultValue="placeholder"
                fullWidth
                sx={{ height: "55px" }}
                name="department"
                {...register("department")}
              >
                <MenuItem disabled value="placeholder">
                  DEPARTMENT
                </MenuItem>
                <MenuItem value="DEPARTMENT OF ANIMAL SCIENCE">
                  DEPARTMENT OF ANIMAL SCIENCE
                </MenuItem>
                <MenuItem value="DEPARTMENT OF AGRICULTURAL ECONOMICS">
                  DEPARTMENT OF AGRICULTURAL ECONOMICS
                </MenuItem>
                <MenuItem value="DEPARTMENT OF AGRONOMY">
                  DEPARTMENT OF AGRONOMY
                </MenuItem>
                <MenuItem value="DEPARTMENT OF FOREST RESOURCES MANAGEMENT">
                  DEPARTMENT OF FOREST RESOURCES MANAGEMENT
                </MenuItem>
                <MenuItem value="DEPARTMENT OF MUSIC">
                  DEPARTMENT OF MUSIC
                </MenuItem>
                <MenuItem value="DEPARTMENT OF RELIGIOUS STUDIES">
                  DEPARTMENT OF RELIGIOUS STUDIES
                </MenuItem>
                <MenuItem value="DEPARTMENT OF ARABIC AND ISLAMIC STUDIES">
                  DEPARTMENT OF ARABIC AND ISLAMIC STUDIES
                </MenuItem>
                <MenuItem value="DEPARTMENT OF COMMUNICATION AND LANGUAGE ARTS">
                  DEPARTMENT OF COMMUNICATION AND LANGUAGE ARTS
                </MenuItem>
                <MenuItem value="DEPARTMENT OF EUROPEAN STUDIES">
                  DEPARTMENT OF EUROPEAN STUDIES
                </MenuItem>
                <MenuItem value="DEPARTMENT OF HISTORY">
                  DEPARTMENT OF HISTORY
                </MenuItem>
                <MenuItem value="DEPARTMENT OF THEATRE ARTS">
                  DEPARTMENT OF THEATRE ARTS
                </MenuItem>
                <MenuItem value="DEPARTMENT OF PHILOSOPHY">
                  DEPARTMENT OF PHILOSOPHY
                </MenuItem>
                <MenuItem value="DEPARTMENT OF HUMAN NUTRITION">
                  DEPARTMENT OF HUMAN NUTRITION
                </MenuItem>
              </Select>
            </Grid>
          </Grid>
        </Stack>
        <Button
          variant="contained"
          // color="primary"
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

export default FilterAdmin;
