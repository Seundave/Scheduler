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
  FormControl,
  InputLabel,
  Chip,
} from "@mui/material";
import axios from "axios";
import PopUpModal from "../../PopUpModal";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import {
  createAdminFailure,
  createAdminSuccess,
  createAdminStart,
} from "../../redux/create-admin/createAdmin";
import {
  getFilteredSchedulerFailure,
  getFilteredSchedulerStart,
  getFilteredSchedulerSuccess,
} from "../../redux/get-schedulers/getScheduler";

const adminFormSchema = yup.object().shape({
  location: yup.string(),
  locationTheatre: yup.string(),
  facilities: yup.array(),
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
  "Audio-Visual Equipment",
  "Interactive Whiteboards or Smartboards",
  "Wireless Connectivity",
  "Microphones and Audio Distribution",
  "Collaborative Spaces",
  "Accessible Restrooms",
  "Multiple Display Screens",
];

function getStyles(name, facility, theme) {
  return {
    fontWeight:
      facility.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const FilterScheduler = ({ openSchedulerFilter, handleClose }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { loading, error } = useSelector((state) => state.admin);
  const [facility, setFacility] = React.useState([]);
  const methods = useForm({
    defaultValues: {
      location: "",
      lectureTheatre: "",
      facilities: [],
    },
    resolver: yupResolver(adminFormSchema),
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

  const onSubmit = async (data) => {
    try {
      dispatch(getFilteredSchedulerStart());
      const res = await axios.post(
        "http://localhost:3000/scheduler/get-scheduler",
        data
      );
      console.log("Admin created successfully", res.data);
      console.log(res);
      dispatch(getFilteredSchedulerSuccess(res.data));
      handleClose();
    } catch (error) {
      console.log("Error submitting form", error);
      dispatch(getFilteredSchedulerFailure(error));
      toast.error(error.response.data.message);
    }
  };
  return (
    <PopUpModal
      openPopUp={openSchedulerFilter}
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
                LOCATION
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
                  LOCATION
                </MenuItem>
                <MenuItem value="The zoological garden">
                  The zoological garden
                </MenuItem>
                <MenuItem value="The Botanical Garden">
                  The Botanical Garden
                </MenuItem>
                <MenuItem value="Love Garden">Love Garden</MenuItem>
                <MenuItem value="Heritage Park">Heritage Park</MenuItem>
                <MenuItem value="Awba Dam">Awba Dam</MenuItem>
                <MenuItem value="Wole Soyinka theatre">
                  Wole Soyinka theatre
                </MenuItem>
                <MenuItem value="UI chapel/Central mosque">
                  UI chapel/Central mosque
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
                sx={{ height: "58px" }}
                fullWidth
              >
                FACILITIES
              </Button>
            </Grid>

            <Grid items xs={12} sm={9} sx={{ paddingLeft: "16px" }}>
              <FormControl sx={{ marginTop: "20px" }} fullWidth>
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

export default FilterScheduler;
