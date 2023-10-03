import React from "react";
import { Helmet } from "react-helmet-async";
import { dummyData } from "../theme/CardSlider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Button,
  CardMedia,
  Container,
  Grid,
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
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ width: "100%" }}
                    slotProps={{ textField: { placeholder: "Select Date" } }}
                    fullWidth
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Select
                  defaultValue="placeholder"
                  fullWidth
                  sx={{ height: "55px" }}
                >
                  <MenuItem value="placeholder">Select Time</MenuItem>
                  <FormGroup sx={{ paddingLeft: "8px" }}>
                    <FormControlLabel
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
                sx={{ marginTop: "30px" }}
                fullWidth
              />
            </Grid>

            <Button
              sx={{
                bgcolor: "#e5e5e5",
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
