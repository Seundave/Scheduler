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

const EditScheduler = ({ openEditScheduler, handleClose, selectedSchedulers }) => {
  const [files, setFiles] = useState([]);
  const [facility, setFacility] = React.useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [imageData, setImageData] = useState([]);
  const [image, setImage] = useState();
  const inputRef = useRef(null);
  const theme = useTheme();

  console.log(selectedSchedulers);

  console.log(selectedSchedulers?.imageUrl)

  // const selectedSchedulerId = selectedScheduler?._id;
  // console.log(selectedSchedulerId)

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

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + imageData.length < 7) {
      setUploading(true);
      setImageUploadError(false);

      Promise.all(files.map((el) => storeImage(el))).then((urls) => {
        setUploading(false)
        setValue("imageUrl", urls);
        setImageData(urls);
      });
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

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
              justifyContent: "space-between",
            }}
          >
            {files.length > 1 ? (
              <Box>
                <img
                  style={{ width: "100%", height: "100%" }}
                  src={URL.createObjectURL(files[0])}
                  alt="school-logo"
                />
                <Typography>
                  {files.length} {files.length > 1 ? "files" : "file"} selected
                </Typography>
              </Box>
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
              marginLeft: "20px",
            }}
          >
            <IconButton
              sx={{ width: "fit-content", bgcolor: "white" }}
              onChange={handleImageChange}
              onClick={handleImageClick}
            >
              <CloudArrowUp size={32} color="black" />
              <input
                type="file"
                ref={inputRef}
                // {...register("imageUrl")}
                accept="image/*"
                style={{ display: "none" }}
                multiple
              />
            </IconButton>
            <Typography
              fontSize={{ xs: "8px", sm: "13px" }}
              sx={{ textAlign: "center" }}
            >
              Click to upload or drag and drop scheduler thumbnail image (JPG){" "}
            </Typography>
            <Typography sx={{ color: "red" }}>
              {imageUploadError && imageUploadError}
            </Typography>
            {imageData.length >= 1 &&
              imageData.map((url, index) => {
                return (
                  <Stack
                    key={url}
                    direction={"row"}
                    sx={{
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      border: "1px dashed #DCE0E4",
                    }}
                  >
                    
                    <img
                      src={url}
                      alt="scheduler images"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectPosition: "cover",
                        borderRadius: "10px",
                        marginTop: "10px",
                        marginBottom: "10px",
                      }}
                    />
                    <Button
                      disabled={uploading}
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      sx={{
                        padding: "3px",
                        color: "red",
                        borderRadius: "10px",
                      }}
                    >
                      {uploading ? <CircularProgress /> : "DELETE"}
                    </Button>
                  </Stack>
                );
              })}
              
            <Button
              variant="contained"
              color="primary"
              type="button"
              onClick={handleImageSubmit}
            >
              UPLOAD
            </Button>
          </Stack>
        </Stack>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
            <Select
              // defaultValue="placeholder"
              defaultValue={
                 selectedSchedulers.lectureTheatre || "placeholer"
              }
              fullWidth
              sx={{ height: "40px" }}
              name="lectureTheatre"
              {...register("lectureTheatre")}
            >
              <MenuItem disabled value="placeholder">
                Lecture theatre
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
              <Typography sx={{ color: "red" }}>
                {errors.lectureTheatre?.message}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4}>
            <Select
              // defaultValue="placeholder"
              defaultValue={
                selectedSchedulers.location || "placeholer"
             }
              name="location"
              fullWidth
              sx={{ height: "40px" }}
              {...register("location")}
            >
              <MenuItem disabled value="placeholder">
                Location
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
              <Typography sx={{ color: "red" }}>
                {errors.location?.message}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4}>
            <Select
              // defaultValue="placeholder"
              defaultValue={
                selectedSchedulers.capacity || "placeholer"
             }
              name="capacity"
              fullWidth
              sx={{ height: "40px" }}
              {...register("capacity")}
            >
              <MenuItem disabled value="placeholder">
                Capacity
              </MenuItem>
              <MenuItem value="500 seaters">500 seaters</MenuItem>
              <MenuItem value="600 seaters">600 seaters</MenuItem>
              <MenuItem value="700 seaters">700 seaters</MenuItem>
              <MenuItem value="800 seaters">800 seaters</MenuItem>
              <MenuItem value="900 seaters">900 seaters</MenuItem>
              <MenuItem value="1000 seaters">
              1000 seaters
              </MenuItem>
              <MenuItem value="1100 seaters">1100 seaters</MenuItem>
            </Select>
              <Typography sx={{ color: "red" }}>
                {errors.capacity?.message}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={8} sx={{ paddingLeft: "16px" }}>
              <FormControl sx={{ marginTop: "20px" }} fullWidth>
                <InputLabel id="demo-multiple-name-label">
                  Facilities
                </InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  multiple
                  value={selectedSchedulers?.facilities}
                  // value={specialty}
                  // onChange={handleChange}
                  // name="interest"
                  {...register("facilities")}
                  // {...register("interest")}
                  renderValue={(selected, index) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selectedSchedulers?.facilities?.map((value, index) => (
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
                // defaultValue="placeholder"
                defaultValue={
                  selectedSchedulers.status || "placeholer"
               }
                name="status"
                fullWidth
                sx={{ height: "59px", marginTop:"20px" }}
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
                // placeholder="Description"
                defaultValue={
                  selectedSchedulers.description || "placeholer"
               }
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
