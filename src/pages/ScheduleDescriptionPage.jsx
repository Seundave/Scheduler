import React from "react";
import { Helmet } from "react-helmet-async";
import { dummyData } from "../theme/CardSlider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { formSchema } from "../validation/UserRequestValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import dayjs from "dayjs";
import {
  Button,
  CardMedia,
  Container,
  Grid,
  Box,
  Stack,
  Typography,
  Select,
  FormGroup,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Paper,
  TextField,
} from "@mui/material";
import { useParams } from "react-router-dom";

const ScheduleDescriptionPage = () => {
  const { id } = useParams();

  const selectedItem = dummyData.find((el) => el.id == id);

  const methods = useForm({
    defaultValues: {
      purpose: "",
      date: dayjs(Date.now()),
      time: [],
    },
    resolver: yupResolver(formSchema),
  });

  const {
    reset,
    register,
    setError,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = methods;

  const time = watch("time", []);
  const onSubmit = async (data) => {
    console.log(data);
  };

  // console.log(selectedItem);

  return (
    <>
      <Helmet>
        <title> Scheduler Description page </title>
      </Helmet>

      <Container>
        <Typography variant="h3">Scheduler Description Page </Typography>

        <Stack>
          <CardMedia
            component="img"
            height="600"
            width="700"
            alt={selectedItem.title}
            src={selectedItem.imageUrl}
            sx={{ marginTop: "40px" }}
          />
          <Typography variant="h4" sx={{ marginTop: "30px" }}>
            {selectedItem.title}
          </Typography>
          <Typography sx={{ marginTop: "20px" }}>
            {selectedItem.description}
          </Typography>
        </Stack>

        <Paper
          elevation={4}
          sx={{
            backgroundColor: "white",
            padding: "40px",
            marginTop: "30px",
            borderRadius: "10px",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ width: "100%" }}
                    slotProps={{
                      textField: {
                        ...register("date"),
                        placeholder: "Select date",
                      },
                    }}
                    format="DD/MM/YYYY"
                    fullWidth
                  />
                </LocalizationProvider>
                <Typography sx={{ color: "red" }}>
                  {errors.date?.message}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
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
              </Grid>
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
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                marginTop: "20px",
                marginBottom: "20px",
              }}
              fullWidth
            >
              {" "}
              Book Resource Center
            </Button>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default ScheduleDescriptionPage;
