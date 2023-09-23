import React from "react";
import { Stack, Grid, TextField, Button } from "@mui/material";
import PopUpModal from "../../PopUpModal";

const EditAdminDetails = ({openEditAdminDetails, handleClose}) => {
  return (
    <PopUpModal
      openPopUp={openEditAdminDetails}
      handleClose={handleClose}
      maxWidth="md"
    >
      <form>
        <Stack sx={{marginTop:"20px"}}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField name="title" placeholder="Name" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="title" placeholder="Faculty" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="title" placeholder="Department" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="title" placeholder="Email address" fullWidth />
            </Grid>
          </Grid>
        </Stack>
        <Button sx={{ bgcolor: "#e5e5e5", marginTop: "20px", marginBottom:"40px" }} fullWidth>
          Save
        </Button>
      </form>
    </PopUpModal>
  );
};

export default EditAdminDetails;
