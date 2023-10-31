import { Container, Stack, Typography, Box, Grid, Select, Button } from "@mui/material";
import React from "react";
import { FormProvider as Form, FormProvider } from "react-hook-form";
import { Helmet } from "react-helmet-async";

const WelcomePage = () => {
  return (
    <>
      <Helmet>
        <title> Welcome page </title>
      </Helmet>

      <Container>
        <Stack>
          <Box>
            <Typography variant="h1" sx={{justifyContent:"center"}}>
              Welcome to University of Ibadan Resource Scheduler
            </Typography>
          </Box>

          <FormProvider>
            <Stack direction="row" spacing={2}>
              <Grid
                container
                sx={{ maxWidth: "100%" }}
                spacing={{ md: 5 }}
                rowSpacing={{ xs: 3, md: 0 }}
              >
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                     <Select
                // textColor={inputFieldColor.textColor}
                // boxShadow={inputFieldColor.boxShadow}
                // color={inputFieldColor.color}
                name="recipient"
                placeholder="Recipient"
                data={["Parent", "Staff", "Students", "All"]}
              />
               <Select
                // textColor={inputFieldColor.textColor}
                // boxShadow={inputFieldColor.boxShadow}
                // color={inputFieldColor.color}
                name="recipient"
                placeholder="Recipient"
                data={["Parent", "Staff", "Students", "All"]}
              />
                </Grid>
              </Grid>
            </Stack>
            <Button>Submit</Button>
          </FormProvider>
        </Stack>
      </Container>
    </>
  );
};

export default WelcomePage;
