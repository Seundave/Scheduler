import { Helmet } from "react-helmet-async";
import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useState, useEffect } from "react";
import axios from "axios";
// @mui
import {
  Card,
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
import { UserListHead, UserListToolbar } from "../sections/@dashboard/user";
// mock
import USERLIST from "../_mock/user";
import CreateAdmin from "./PopUps/CreateAdmin";
import EditAdminDetails from "./PopUps/EditAdminDetails";
import DeleteAdmin from "./PopUps/DeleteAdmin";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminFailure,
  getAdminStart,
  getAdminSuccess,
} from "../redux/get-admins/getAdmins";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "faculty", label: "Faculty", alignRight: false },
  { id: "department", label: "Department", alignRight: false },
  { id: "email", label: "Email address", alignRight: false },
  { id: "resource", label: "Resource", alignRight: false },
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

export default function UserPage() {
  // const [users, setUsers] = useState([]);

  const dispatch = useDispatch();

  const [selectedUser, setSelectedUser] = useState(null);

  const [openAdminPopup, setOpenAdminPopup] = useState(false);

  const [openEditAdminDetails, setOpenEditAdminDetails] = useState(false);

  const [openDeleteAdmin, setOpenDeleteAdmin] = useState(false);

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [loading, setLoading] = useState(true);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpenMenu = (event, user) => {
    setSelectedUser(user);
    setOpen(event.currentTarget);
  };

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        dispatch(getAdminStart());
        const response = await axios.get(
          "http://localhost:3000/admin/all-admins"
        );
        console.log(response);
        // const fetchedUsers = response.data;
        dispatch(getAdminSuccess(response.data));
        // setUsers(fetchedUsers);
        setLoading(false);
      } catch (error) {
        dispatch(getAdminFailure(error.message));
        console.log("Error fetching admins", error);
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  const { allAdmins } = useSelector((state) => state.getAdmin);

  console.log(allAdmins);

  // console.log(users);

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleAdminPopup = () => {
    console.log("clicked");
    console.log(openAdminPopup);
    setOpenAdminPopup((prev) => !prev);
  };

  const handleOpenEditAdminDetails = () => {
    setOpenEditAdminDetails((prev) => !prev);
  };

  const handleDeleteAdmin = () => {
    setOpenDeleteAdmin((prev) => !prev);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = allAdmins.map((n) => n.name);
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

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allAdmins.length) : 0;

  const filteredUsers = applySortFilter(
    allAdmins,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> User page </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Admin
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleAdminPopup}
          >
            New Admin
          </Button>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              {loading ? (
                <Stack alignItems={"center"}>
                  {" "}
                  <CircularProgress />{" "}
                </Stack>
              ) : (
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={allAdmins.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {filteredUsers
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        const {
                          _id,
                          name,
                          department,
                          resource,
                          faculty,
                          avatarUrl,
                          email,
                        } = row;
                        const selectedUser = selected.indexOf(name) !== -1;

                        return (
                          <TableRow
                            hover
                            key={_id}
                            tabIndex={-1}
                            role="checkbox"
                            selected={selectedUser}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={selectedUser}
                                onChange={(event) => handleClick(event, name)}
                              />
                            </TableCell>

                            <TableCell
                              component="th"
                              scope="row"
                              padding="none"
                            >
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}
                              >
                                {/* <Avatar alt={name} src={avatarUrl} /> */}
                                <Typography variant="subtitle2" noWrap>
                                  {name}
                                </Typography>
                              </Stack>
                            </TableCell>

                            <TableCell align="left">{faculty}</TableCell>

                            <TableCell align="left">{department}</TableCell>

                            <TableCell align="left">{email}</TableCell>

                            {/* <TableCell align="left">
                            {email ? "Yes" : "No"}
                          </TableCell> */}

                            <TableCell align="left">{resource}</TableCell>

                            <TableCell align="right">
                              <IconButton
                                size="large"
                                color="inherit"
                                onClick={(event) => handleOpenMenu(event, row)}
                              >
                                <Iconify icon={"eva:more-vertical-fill"} />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>

                  {isNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <Paper
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            <Typography variant="h6" paragraph>
                              Not found
                            </Typography>

                            <Typography variant="body2">
                              No results found for &nbsp;
                              <strong>&quot;{filterName}&quot;</strong>.
                              <br /> Try checking for typos or using complete
                              words.
                            </Typography>
                          </Paper>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              )}
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={allAdmins.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={handleOpenEditAdminDetails}>
          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: "error.main" }} onClick={handleDeleteAdmin}>
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>

      {openAdminPopup && (
        <CreateAdmin
          openAdminPopup={openAdminPopup}
          handleClose={() => setOpenAdminPopup(false)}
          onSubmit={onSubmit}
          // handleDeleteClick={handleDeleteClick}
          // id={activeNotification._id}
        />
      )}

      {openEditAdminDetails && (
        <EditAdminDetails
          openEditAdminDetails={openEditAdminDetails}
          selectedUser={selectedUser}
          handleClose={() => setOpenEditAdminDetails(false)}
          onSubmit={onSubmit}
          // handleDeleteClick={handleDeleteClick}
          // id={activeNotification._id}
        />
      )}

      {setOpenDeleteAdmin && (
        <DeleteAdmin
          openDeleteAdmin={openDeleteAdmin}
          selectedUser={selectedUser}
          handleClose={() => setOpenDeleteAdmin(false)}
          onSubmit={onSubmit}
          // handleDeleteClick={handleDeleteClick}
          // id={activeNotification._id}
        />
      )}
    </>
  );
}
