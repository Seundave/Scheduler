import React from "react";
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
  CircularProgress,
  FormControl,
  InputLabel,
  Chip,
} from "@mui/material";
import UniversityLogo from "../../assets/university.png";
import { useTheme } from "@mui/material/styles";
import { CloudArrowUp } from "@phosphor-icons/react";

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

function CreateSchedulerForm({
  methods,
  onSubmit,
  handleDragOver,
  handleDrop,
  handleImageClick,
  handleImageChange,
  image,
  inputRef,
  loading,
  facilities,
  facility,
  setFacility,
}) {
  const theme = useTheme();
  const {
    reset,
    register,
    setError,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = methods;
  return (
    <Paper
      elevation={4}
      sx={{
        backgroundColor: "white",
        padding: "40px",
        marginTop: "30px",
        borderRadius: "10px",
      }}
    >
      <Typography variant="h6" style={{ marginBottom: 25, fontWeight: "bold" }}>
        {" "}
        Add Resource
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
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
              name="lectureTheatre"
              {...register("lectureTheatre")}
            >
              <MenuItem value="placeholder">Lecture theatre</MenuItem>
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
              <MenuItem value="placeholder">Location</MenuItem>
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
              <MenuItem value="placeholder">Capacity</MenuItem>
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

          <Grid items xs={12} sm={12} sx={{paddingLeft:"16px"}}>
            <FormControl sx={{ marginTop: "20px" }} fullWidth>
              <InputLabel id="demo-multiple-name-label">Facilities</InputLabel>
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
                    style={getStyles(name, facility, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography variant="body2">
              Pick three top area of interest
            </Typography>
            <Typography sx={{ color: "red" }}>
              {errors.facilities?.message}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              placeholder="Description"
              name="description"
              {...register("description")}
              multiline
              rows={6}
              fullWidth
            />
          </Grid>
          <Typography sx={{ color: "red" }}>
            {errors.description?.message}
          </Typography>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ marginTop: "20px", marginBottom: "20px", height: "45px" }}
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
            "CREATE SCHEDULER"
          )}
        </Button>
      </form>
    </Paper>
  );
}

export default CreateSchedulerForm;
