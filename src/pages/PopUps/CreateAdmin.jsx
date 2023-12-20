import React, { useEffect } from "react";
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
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createAdminFailure,
  createAdminSuccess,
  createAdminStart,
} from "../../redux/create-admin/createAdmin";

const adminFormSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  faculty: yup.string().required("Faculty is required"),
  department: yup.string().required("Department is required"),
  resource: yup.string().required("Resource is required"),
  password: yup.string().required("Password is required"),
  email: yup.string().email().required("Email address is required"),
});
const CreateAdmin = ({ openAdminPopup, handleClose }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.admin);
  const methods = useForm({
    defaultValues: {
      name: "",
      faculty: "",
      department: "",
      resource: "",
      password: "",
      email: "",
    },
    resolver: yupResolver(adminFormSchema),
  });

  const {
    reset,
    setError,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    try {
      dispatch(createAdminStart());
      const res = await axios.post(
        "http://localhost:3000/admin/create-admin",
        data
      );
      console.log("Admin created successfully", res.data);
      console.log(res);
      dispatch(createAdminSuccess(res.data));
      toast.success("Admin created successfully!");
      // console.log(res.data);
      reset();
      handleClose();
      // window.location.reload();
    } catch (error) {
      console.log("Error submitting form", error);
      toast.error("Error creating admin!");
      dispatch(createAdminFailure(error.message));
    }
  };
  return (
    <PopUpModal
      openPopUp={openAdminPopup}
      handleClose={handleClose}
      maxWidth="md"
    >
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        CREATE ADMIN
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack sx={{ marginTop: "20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="name"
                placeholder="NAME"
                {...register("name")}
                fullWidth
              />
              <Typography sx={{ color: "red" }}>
                {errors.name?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
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
              <Typography sx={{ color: "red" }}>
                {errors.faculty?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
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
              <Typography sx={{ color: "red" }}>
                {errors.department?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select
                defaultValue="placeholder"
                fullWidth
                sx={{ height: "55px" }}
                name="resource"
                {...register("resource")}
              >
                <MenuItem disabled value="placeholder">
                  RESOURCE
                </MenuItem>
                <MenuItem value="SUB">SUB</MenuItem>
                <MenuItem value="UI">UI</MenuItem>
                <MenuItem value="TRD">TRD</MenuItem>
                <MenuItem value="Bookshop">Bookshop</MenuItem>
                <MenuItem value="ITeMS">ITeMS</MenuItem>
                <MenuItem value="works">Works and Maintenance</MenuItem>
                <MenuItem value="science">Science</MenuItem>
              </Select>
              <Typography sx={{ color: "red" }}>
                {errors.resource?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="password"
                placeholder="PASSWORD"
                {...register("password")}
                fullWidth
              />
              <Typography sx={{ color: "red" }}>
                {errors.password?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="email"
                placeholder="EMAIL ADDRESS"
                {...register("email")}
                fullWidth
              />
              <Typography sx={{ color: "red" }}>
                {errors.email?.message}
              </Typography>
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
            "Create Admin"
          )}
        </Button>
      </form>
    </PopUpModal>
  );
};

export default CreateAdmin;
