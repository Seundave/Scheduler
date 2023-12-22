import React from "react";
import {
  Stack,
  Grid,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  CircularProgress,
} from "@mui/material";
import PopUpModal from "../../PopUpModal";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  editAdminFailure,
  editAdminSuccess,
  editAdminStart,
} from "../../redux/edit-admin/editAdmin";
import { updateAdminList } from "../../redux/get-admins/getAdmins";

const EditAdminDetails = ({
  openEditAdminDetails,
  handleClose,
  selectedUser,
}) => {
  const adminFormSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    faculty: yup.string().required("Faculty is required"),
    department: yup.string().required("Department is required"),
    resource: yup.string().required("Resource is required"),
    email: yup.string().email().required("Email address is required"),
  });
  const { loading } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  console.log(selectedUser);

  const selectedUserId = selectedUser?._id;
  console.log(selectedUserId);

  const methods = useForm({
    defaultValues: {
      name: selectedUser.name,
      faculty: selectedUser?.faculty,
      department: selectedUser?.department,
      resource: selectedUser?.resource,
      password: "",
      email: selectedUser?.email,
    },
    // resolver: yupResolver(adminFormSchema),
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
      dispatch(editAdminStart());
      const res = await axios.patch(
        `http://localhost:3000/admin/update-admin/${selectedUserId}`,
        data
      );
      dispatch(updateAdminList(res.data))
      dispatch(editAdminSuccess(res.data));
      toast.success("Admin details updated successfully!");
      // console.log(res.data);
      reset();
      handleClose();
      // window.location.reload();
    } catch (error) {
      console.log("Error submitting form", error);
      toast.error("Error updating admin!");
      dispatch(editAdminFailure(error.message));
    }
  };
  return (
    <PopUpModal
      openPopUp={openEditAdminDetails}
      handleClose={handleClose}
      maxWidth="md"
    >
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        EDIT ADMIN DETAILS
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack sx={{ marginTop: "20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="title"
                placeholder="Name"
                fullWidth
                {...register("name")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* <TextField name="title" placeholder="Faculty" fullWidth /> */}
              <Select
                defaultValue={
                  selectedUser.faculty ? selectedUser.faculty : "placeholer"
                }
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
            <Grid item xs={12} sm={6}>
              {/* <TextField name="title" placeholder="Department" fullWidth /> */}
              <Select
                defaultValue={
                  selectedUser.department
                    ? selectedUser.department
                    : "placeholer"
                }
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
            <Grid item xs={12} sm={6}>
              <TextField
                name="email"
                placeholder="Email address"
                fullWidth
                {...register("email")}
              />
            </Grid>
          </Grid>
        </Stack>
        <Button
          variant="contained"
          disabled={loading}
          // color="primary"
          type="submit"
          sx={{
            marginTop: "20px",
            marginBottom: "40px",
            height: "40px",
          }}
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
            "Save"
          )}
        </Button>
      </form>
    </PopUpModal>
  );
};

export default EditAdminDetails;
