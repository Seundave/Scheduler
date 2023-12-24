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
import { updatedUserListing } from "../../redux/getUserListing/getUserListing";
import { editListFailure, editListStart, editListSuccess } from "../../redux/editSchedulerListings/editSchedulerListings";
// import {
//   editAdminFailure,
//   editAdminSuccess,
//   editAdminStart,
// } from "../../redux/edit-admin/editAdmin";
// import { updateAdminList } from "../../redux/get-admins/getAdmins";

const EditUserListings = ({
  openEditSchedulerListings,
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
  //   const { loading } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  console.log(selectedUser);

  const selectedUserId = selectedUser?._id;
  console.log(selectedUserId);

  const methods = useForm({
    defaultValues: {
      lectureTheatre: selectedUser.lectureTheatre,
      date: selectedUser?.date,
      time: selectedUser?.time,
      purpose: selectedUser?.purpose,
      status: "",
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
      dispatch(editListStart());
      const res = await axios.patch(
        `http://localhost:3000/schedule/get-scheduler/${selectedUserId}`,
        data
      );
      dispatch(updatedUserListing(res.data));
      dispatch(editListSuccess(res.data));
      toast.success("Request details updated successfully!");
      // console.log(res.data);
      reset();
      handleClose();
      // window.location.reload();
    } catch (error) {
      console.log("Error submitting form", error);
      toast.error("Error updating list!");
      dispatch(editListFailure(error.message));
    }
  };
  return (
    <PopUpModal
      openPopUp={openEditSchedulerListings}
      handleClose={handleClose}
      maxWidth="md"
    >
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        EDIT ADMIN DETAILS
      </Typography>
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
              <InputLabel id="demo-multiple-name-label">Select Time</InputLabel>
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
                      <Chip key={value} label={index + 1 + "." + " " + value} />
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
          <Typography sx={{ color: "red" }}>{errors.time?.message}</Typography>
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
            "Save"
          )}
        </Button>
      </form>
    </PopUpModal>
  );
};

export default EditUserListings;
