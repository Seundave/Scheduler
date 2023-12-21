import React, { useState, useRef } from "react";
import PopUpModal from "../../PopUpModal";
import {
  Stack,
  Grid,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  Box,
  IconButton,
  FormControl,
  InputLabel,
  Chip,
} from "@mui/material";
import { CloudArrowUp } from "@phosphor-icons/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import UniversityLogo from "../../assets/university.png";
import { useTheme } from "@mui/material/styles";
import { createScheduler } from "../../validation/createScheduler";

const adminFormSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  faculty: yup.string().required("Faculty is required"),
  department: yup.string().required("Department is required"),
  resource: yup.string().required("Resource is required"),
  password: yup.string().required("Password is required"),
  email: yup.string().email().required("Email address is required"),
});

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
  "Network Design",
  "Hardware",
  "Software",
  "Graphic Design",
  "Cybersecurity",
  "Web design",
  "Broadcasting",
];

function getStyles(name, facility, theme) {
  return {
    fontWeight:
      facility.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const EditScheduler = ({ openEditScheduler, handleClose, selectedScheduler }) => {
  const [facility, setFacility] = React.useState([]);
  const [image, setImage] = useState();
  const inputRef = useRef(null);
  const theme = useTheme();

  console.log(selectedScheduler);

  const selectedSchedulerId = selectedScheduler?._id;
  console.log(selectedSchedulerId)

  const methods = useForm({
    defaultValues: {
      imageUrl:[],
      lectureTheatre: "",
      location: "",
      capacity: "",
      facilities: [],
      status:"",
      description: "",
    },
    resolver: yupResolver(createScheduler),
  });

  const {
    reset,
    setError,
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = methods;

  const facilities = watch("facilities", []);

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
    <>
      <PopUpModal
        openPopUp={openEditScheduler}
        handleClose={handleClose}
        maxWidth="md"
      >
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          EDIT SCHEDULER
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
              spacing={3}
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
                name="lectureTheatre"
                {...register("lectureTheatre")}
              >
                <MenuItem disabled value="placeholder">
                  Lecture theatre
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
                {errors.lectureTheatre?.message}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Select
                defaultValue="placeholder"
                name="location"
                fullWidth
                sx={{ height: "40px" }}
                {...register("location")}
              >
                <MenuItem disabled value="placeholder">
                  Location
                </MenuItem>
                <MenuItem value="SUB">SUB</MenuItem>
                <MenuItem value="UI">UI</MenuItem>
                <MenuItem value="TRD">TRD</MenuItem>
                <MenuItem value="Bookshop">Bookshop</MenuItem>
                <MenuItem value="ITeMS">ITeMS</MenuItem>
                <MenuItem value="works and maintenance">
                  Works and Maintenance
                </MenuItem>
                <MenuItem value="science">Science</MenuItem>
              </Select>
              <Typography sx={{ color: "red" }}>
                {errors.location?.message}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Select
                defaultValue="placeholder"
                name="capacity"
                fullWidth
                sx={{ height: "40px" }}
                {...register("capacity")}
              >
                <MenuItem disabled value="placeholder">
                  Capacity
                </MenuItem>
                <MenuItem value="SUB">SUB</MenuItem>
                <MenuItem value="UI">UI</MenuItem>
                <MenuItem value="TRD">TRD</MenuItem>
                <MenuItem value="Bookshop">Bookshop</MenuItem>
                <MenuItem value="ITeMS">ITeMS</MenuItem>
                <MenuItem value="works and maintenance">
                  Works and Maintenance
                </MenuItem>
                <MenuItem value="science">Science</MenuItem>
              </Select>
              <Typography sx={{ color: "red" }}>
                {errors.capacity?.message}
              </Typography>
            </Grid>

            <Grid items xs={12} sm={8} sx={{ paddingLeft: "16px" }}>
              <FormControl sx={{ marginTop: "20px" }} fullWidth>
                <InputLabel id="demo-multiple-name-label">
                  Facilities
                </InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  multiple
                  value={facilities}
                  // value={specialty}
                  // onChange={handleChange}
                  // name="interest"
                  {...register("facilities")}
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
                      style={getStyles(name, facility, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography sx={{ color: "red" }}>
                {errors.facilities?.message}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4}>
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
              <Typography sx={{ color: "red" }}>
                {errors.status?.message}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                placeholder="Description"
                name="description"
                multiline
                rows={6}
                fullWidth
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ marginTop: "20px", marginBottom: "40px", height: "40px" }}
            fullWidth
          >
            Edit Scheduler
          </Button>
        </form>
      </PopUpModal>
    </>
  );
};

export default EditScheduler;
