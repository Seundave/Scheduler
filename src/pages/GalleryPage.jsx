import { Helmet } from "react-helmet-async";
import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useEffect, useState } from "react";
import axios from "axios";
import { Edit, Delete } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// @mui
import {
  Box,
  Card,
  Grid,
  CardContent,
  CardMedia,
  Menu,
  Tooltip,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  CircularProgress,
} from "@mui/material";
// components
import Label from "../components/label";
import Iconify from "../components/iconify";
import Scrollbar from "../components/scrollbar";
// sections
import { GalleryListToolbar } from "../sections/@dashboard/gallery";
// mock
import USERLIST from "../_mock/user";
import EditScheduler from "./PopUps/EditScheduler";
import DeleteScheduler from "./PopUps/DeleteScheduler";
import { useDispatch, useSelector } from "react-redux";
import {
  getSchedulerFailure,
  getSchedulerStart,
  getSchedulerSuccess,
} from "../redux/get-schedulers/getScheduler";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "company", label: "Company", alignRight: false },
  { id: "role", label: "Role", alignRight: false },
  { id: "isVerified", label: "Verified", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "" },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

const ITEM_HEIGHT = 48;

export default function GalleryPage() {
  const [schedulers, setSchedulers] = useState([]);

  const [selectedScheduler, setSelectedScheduler] = useState(null)

  const dispatch = useDispatch()

  const { loading, error } = useSelector((state) => state.getSchedulers);

  const [imageUploadError, setImageUploadError] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);

  const [openEditScheduler, setOpenEditScheduler] = useState(false);

  const [openDeleteScheduler, setOpenDeleteScheduler] = useState(false);

  const open = Boolean(anchorEl);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = (_id) => {
    setIsHovered(_id);
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

  useEffect(() => {
    const fetchSchedulers = async () => {
      try {
        dispatch(getSchedulerStart());
        const response = await axios.get(
          "http://localhost:3000/scheduler/get-schedulers"
        );
        console.log(response);
        const fetchedSchedulers = response.data;
        dispatch(getSchedulerSuccess(response.data));
        setSchedulers(fetchedSchedulers);
        // setLoading(false);
      } catch (error) {
        dispatch(getSchedulerFailure(error.message));
        console.log("Error fetching admins", error);
        // setLoading(false);
      }
    };

    fetchSchedulers();
  }, []);

  const handleEditNotification = () => {
    setOpenEditScheduler((prev) => !prev);
  };

  const handleDeleteScheduler = () => {
    setOpenDeleteScheduler((prev) => !prev);
  };

  const handleMouseLeave = () => {
    setIsHovered(null);
  };

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleOptionClose = () => {
    setAnchorEl(null);
  };

  const handleOptionClick = (event, user) => {
    setSelectedScheduler(user)
    setAnchorEl(event.currentTarget);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(
    USERLIST,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Gallery page </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Gallery
          </Typography>
        </Stack>

        <Card>
          <GalleryListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Container sx={{ position: "relative" }}>
            {loading ? <Stack alignItems={"center"}><CircularProgress/></Stack> : <Grid container spacing={2}>
              {schedulers.map((data) => (
                <Grid key={data._id} item xs={12} sm={4}>
                  <Card
                    onMouseEnter={() => handleMouseEnter(data._id)}
                    onMouseLeave={handleMouseLeave}
                    elevation={3}
                    sx={{ position: "relative" }}
                  >
                    <CardMedia
                      component="img"
                      height="400"
                      alt={data.title}
                      src={data.imageUrl[0]}
                      style={{ position: "relative" }}
                    />

                    {isHovered && isHovered === data._id && (
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          background: "rgba(0, 0, 0, 0.6)",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography variant="h6" color="white" gutterBottom>
                          {data.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="white"
                          sx={{ paddingX: "20px" }}
                        >
                          {data.description}
                        </Typography>
                      </div>
                    )}
                    <Box>
                      <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? "long-menu" : undefined}
                        aria-expanded={open ? "true" : undefined}
                        aria-haspopup="true"
                        onClick={handleOptionClick}
                        style={{
                          position: "absolute",
                          top: "20px",
                          right: "7px",
                        }}
                      >
                        <MoreVertIcon sx={{ color: "white" }} />
                      </IconButton>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleOptionClose}
                        anchorOrigin={{ vertical: "top", horizontal: "left" }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem onClick={handleEditNotification}>
                          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
                          Edit
                        </MenuItem>

                        <MenuItem
                          sx={{ color: "error.main" }}
                          onClick={handleDeleteScheduler}
                        >
                          <Iconify
                            icon={"eva:trash-2-outline"}
                            sx={{ mr: 2 }}
                          />
                          Delete
                        </MenuItem>
                      </Menu>
                    </Box>
                  </Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {data.lectureTheatre}
                    </Typography>
                  </CardContent>
                </Grid>
              ))}
            </Grid> }
            
          </Container>

          {openEditScheduler && (
            <EditScheduler
              openEditScheduler={openEditScheduler}
              handleClose={() => setOpenEditScheduler(false)}
              onSubmit={onSubmit}
              selectedScheduler={selectedScheduler}
              imageUploadError={imageUploadError}
              // handleDeleteClick={handleDeleteClick}
              // id={activeNotification._id}
            />
          )}

          {openDeleteScheduler && (
            <DeleteScheduler
              openEditScheduler={openDeleteScheduler}
              handleClose={() => setOpenDeleteScheduler(false)}
              onSubmit={onSubmit}
              selectedScheduler={selectedScheduler}
              // handleDeleteClick={handleDeleteClick}
              // id={activeNotification._id}
            />
          )}

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
}
