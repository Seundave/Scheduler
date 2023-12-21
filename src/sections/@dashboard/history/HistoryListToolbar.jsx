import PropTypes from "prop-types";
// @mui
import { styled, alpha } from "@mui/material/styles";
import {
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
  Popover,
  Paper,
  FormGroup,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Menu,
} from "@mui/material";
// component
import Iconify from "../../../components/iconify";
import { useState } from "react";
import FilterAdmin from "../../../pages/PopUps/FilterAdmin";
import FilterHistory from "../../../pages/PopUps/FilterHistory";

// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&.Mui-focused": {
    width: 320,
    boxShadow: theme.customShadows.z8,
  },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

// ----------------------------------------------------------------------

HistoryListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function HistoryListToolbar({
  numSelected,
  filterName,
  onFilterName,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openFilterPopup, setOpenFilterPopup] = useState(false);
  const open = Boolean(anchorEl);

  const handleShowFilter = (event) => {
    console.log("clicked");
    setAnchorEl(event.currentTarget);
  };

  const onSubmit = async (data) => {
    try {
      console.log("Submitted successfully");
      // submit data to backend
      // console.log(data);
      // dispatch(sendMessage(data));
    } catch (error) {
      console.log(error);
      // reset();
      // setError("afterSubmit", {
      //   ...error,
      //   message: error.message,
      // });
    }
  };

  const handleFilterPopup = () => {
    console.log(openFilterPopup);
    setOpenFilterPopup((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <StyledRoot
        sx={{
          ...(numSelected > 0 && {
            color: "primary.main",
            bgcolor: "primary.lighter",
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography component="div" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <StyledSearch
            value={filterName}
            onChange={onFilterName}
            placeholder="Search scheduler..."
            startAdornment={
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ color: "text.disabled", width: 20, height: 20 }}
                />
              </InputAdornment>
            }
          />
        )}

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <Iconify icon="eva:trash-2-fill" />
            </IconButton>
          </Tooltip>
        ) : (
          <>
            <Tooltip title="Filter list">
              <IconButton
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleFilterPopup}
                // onClick={handleShowFilter}
              >
                <Iconify icon="ic:round-filter-list" />
              </IconButton>
            </Tooltip>

            {/* <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          onClose={handleCloseMenu}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <FormGroup sx={{paddingLeft:'8px'}}>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Location"
            />
            <FormControlLabel
              // required
              control={<Checkbox />}
              label="Faculty"
            />
            <FormControlLabel
              disabled
              control={<Checkbox />}
              label="Facilities"
            />
          </FormGroup>
        </Menu> */}
          </>
        )}
      </StyledRoot>

      {openFilterPopup && (
        <FilterHistory
          openFilterPopup={openFilterPopup}
          handleClose={() => setOpenFilterPopup(false)}
          onSubmit={onSubmit}
          // handleDeleteClick={handleDeleteClick}
          // id={activeNotification._id}
        />
      )}
    </>
  );
}
