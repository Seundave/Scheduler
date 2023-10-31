import React from "react";
import { Stack, Grid, TextField, Button } from "@mui/material";
import PopUpModal from "../../PopUpModal";

const CreateAdmin = ({openAdminPopup, handleClose}) => {
  return (
    <PopUpModal openPopUp={openAdminPopup} handleClose={handleClose} maxWidth="md" >
      <form>
        <Stack sx={{marginTop:"20px"}}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField name="title" placeholder="Name" fullWidth/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="title" placeholder="Faculty" fullWidth/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="title" placeholder="Department" fullWidth/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="title" placeholder="Email address" fullWidth/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="title" placeholder="Password" fullWidth/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="title" placeholder="Resource" fullWidth/>
            </Grid>
          </Grid>
        </Stack>
        <Button sx={{ bgcolor: "#e5e5e5", marginTop: "20px", marginBottom:"40px" }} fullWidth>
            Create Admin
          </Button>
      </form>
    </PopUpModal>
  );
};

export default CreateAdmin;
