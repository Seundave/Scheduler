import { Container, Grid } from "@mui/material";
import React from "react";
import { AppWidgetSummary } from "../sections/@dashboard/app";

function Statistics() {
  return (
    <Container maxWidth="xl" sx={{marginTop:"100px"}}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary title="Total Bookings" number={20} />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary title="Active Bookings" number={5} />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary title="Pending Approval" number={2} />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary title="Rejected Bookings" number={10} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Statistics;
