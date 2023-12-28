import React from "react";
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
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import axios from "axios"
import { deleteScheduler } from "../../redux/get-schedulers/getScheduler";

const DeleteScheduler = ({ openEditScheduler, handleClose, selectedSchedulers }) => {
  const dispatch = useDispatch()
  console.log(selectedSchedulers)
  const selectedSchedulerId = selectedSchedulers?._id

  console.log(selectedSchedulerId)
  
  const handleDeleteSchedulerClick = async () => {
    // setIsDeleteLoading(true);
    try {
      // dispatch(deleteAdminStart());
      const response = await axios.delete(
        `http://localhost:3000/scheduler/delete-scheduler/${selectedSchedulerId}`
      );
      dispatch(deleteScheduler(selectedSchedulerId))
      toast.success("Scheduler deleted successfully!");
      if (response.status === 200) {
        handleClose();
      }
    } catch (error) {
      console.log("Deletion failed!", error);
      toast.error(error);
    } 
  };

  
  const buttonStyle = {
    width: { xs: "100px", md: "200px" },
    height: { xs: "40px", md: "50px" },
    textTransform: "inherit",
    backgroundColor: "#113C9B",
    color: "white",
    borderRadius: "5px",
    fontSize: { xs: "10px", md: "14px" },
    fontWeight: 700,
  };

  const isLoading = false;
  return (
    <>
      <PopUpModal openPopUp={openEditScheduler} handleClose={handleClose}>
        <Stack
          width={{ xs: "276px", md: "435px" }}
          maxWidth={"100%"}
          marginX="auto"
          marginBottom={{ xs: "40px", sm: "44px" }}
          alignItems="center"
        >
          <Typography
            variant="h6"
            component="h2"
            textAlign="center"
            marginBottom={{ xs: "35px", sm: "50px" }}
            fontSize={{ xs: "10px", sm: "14px" }}
          >
            Are you sure you want to delete this scheduler
          </Typography>
          <Box
            sx={{
              width: { xs: "250px", md: "450px" },
              display: "flex",
              justifyContent: `${isLoading ? "center" : "space-between"}`,
            }}
          >
            {isLoading ? (
              <CircularProgress sx={{ color: "#fdb73d" }} size={20} />
            ) : (
              <>
                <Button
                    onClick={ handleDeleteSchedulerClick}
                  sx={{
                    ...buttonStyle,
                    ":hover": { backgroundColor: "#FDB73D" },
                  }}
                >
                  {"Yes, I'm sure"}
                </Button>
                <Button
                  onClick={handleClose}
                  sx={{
                    ...buttonStyle,
                    backgroundColor: "white",
                    color: "#000000",
                    border: "1px solid black",
                    // boxShadow:
                    //   "0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset",
                  }}
                >
                  No
                </Button>
              </>
            )}
          </Box>
        </Stack>
      </PopUpModal>
    </>
  );
};

export default DeleteScheduler;
