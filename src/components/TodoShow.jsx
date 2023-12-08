// src/components/showTodoList.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import TodoUpdate from "./TodoUpdate";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@mui/material/Checkbox";
import Fab from "@mui/material/Fab";
import NavBar from "./NavBar";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { Container } from "@material-ui/core";
import ButtonBase from "@material-ui/core/ButtonBase";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import {
  set,
  reset,
  insertItem,
  deleteItem,
  updateItem,
} from "../reducers/todoReducer";

const TodoCard = ({
  data,
  handleEdit,
  handleDelete,
  selectedItems,
  setSelectedItems,
}) => {
  const { _id, title, description, user } = data;
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCheckboxChange = (e) => {
    const itemId = e.target.name;
    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      [itemId]: !prevSelectedItems[itemId],
    }));
  };

  const handleDeleteClick = () => {
    setOpenDialog(true);
  };

  const handleConfirmDelete = (e) => {
    handleDelete(e);
    setOpenDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog if cancel is clicked
  };

  const handleRowClick = () => {
    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      [_id]: !prevSelectedItems[_id], // Toggle the checkbox status
    }));
  };

  return (
    <>
      <TableRow key={_id} onClick={handleRowClick} style={{ cursor: "pointer" }}>
        <TableCell >
          {/* <ButtonBase onClick={handleRowClick}> */}
          {/* Content of the TableRow */}
          <h3>{title}</h3>
          {/* </ButtonBase> */}
        </TableCell>
        <TableCell>{description}</TableCell>
        <TableCell>
          <IconButton
            // onClick={handleEdit}
            onClick={() => {
              dispatch(
                set({
                  _id: _id,
                  title: title,
                  description: description,
                  user: user,
                }),
              );
              navigate(`/todoUpdate/`);
            }}
            aria-label='edit'
            style={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)" }}
          >
            <CreateIcon />
          </IconButton>
          <IconButton
            // name='delete'
            name={_id}
            onClick={handleDeleteClick}
            style={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)" }}
          >
            <DeleteIcon></DeleteIcon>
          </IconButton>
        </TableCell>
        <TableCell>
          <Checkbox
            checked={selectedItems[_id] || false}
            onChange={handleCheckboxChange}
            color='primary'
            name={_id}
          />
        </TableCell>
      </TableRow>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            color='primary'
            variant='contained'
          >
            Cancel
          </Button>
          <Button
            name={_id}
            onClick={handleConfirmDelete}
            color='secondary'
            variant='contained'
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const TodoShow = () => {
  const _user = useSelector((state) => state.user);
  const [update, setUpdate] = useState(false); // added
  const [todo, setTodo] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [multiDeleteEnabled, setMultiDeleteEnabled] = useState(false);
  const [checkedCount, setCheckedCount] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMultiDeleteClick = () => {
    setOpenDialog(true);
  };

  useEffect(
    () => {
      const checkedCount = Object.values(selectedItems).filter(Boolean).length;
      setCheckedCount(checkedCount);
      setMultiDeleteEnabled(checkedCount > 0);

      axios
        .get("http://localhost:8000/api/todo", {
          params: {
            user: _user._id,
          },
        })
        .then((res) => {
          setTodo(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    [update, _user._id, selectedItems, todo], // updated
  );

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    let prevSelectedItems = selectedItems; // Define prevSelectedItems here
    if (name === "selectAll") {
      setSelectAllChecked(checked);
      const updatedSelectedItems = todo.reduce((acc, item) => {
        acc[item._id] = checked;
        return acc;
      }, {});
      setSelectedItems(updatedSelectedItems);
    } else {
      setSelectedItems((prevSelectedItems) => ({
        ...prevSelectedItems,
        [name]: checked,
      }));
      const allChecked = todo.every((item) => prevSelectedItems[item._id]);
      setSelectAllChecked(allChecked);
    }
  };

  const handleEdit = (e) => {
    const id = e.currentTarget.name;
  };

  const handleDelete = (e) => {
    dispatch(deleteItem({ _id: e.currentTarget.name }));
  };

  const handleMultiDelete = () => {
    const selectedIds = Object.keys(selectedItems).filter(
      (itemId) => selectedItems[itemId],
    );
    selectedIds.forEach((id) => {
      console.log(id, " ");
      dispatch(deleteItem({ _id: id }));
    });
  };
  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog if cancel is clicked
  };
  const handleConfirmMultiDelete = () => {
    handleMultiDelete();
    setOpenDialog(false);
  };

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{"Multiple Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <Typography variant='contained' component='span' color='primary'>
              {checkedCount}
            </Typography>{" "}
            elements selected. Are you sure you want to delete
            <br />
            them?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            color='primary'
            variant='contained'
          >
            Cancel
          </Button>
          <Button
            // name={_id}
            onClick={handleConfirmMultiDelete}
            color='secondary'
            variant='contained'
            autoFocus
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Container
        className='container'
        style={{ padding: "20px", height: "auto" }}
      >
        <Box sx={{ display: "flex", gap: "10px" }}>
          {" "}
          {/* Use Box component with display flex and gap for spacing */}
          <Fab
            color='primary'
            aria-label='add'
            onClick={() => navigate("/todoAdd")}
            disabled={!_user.loggedIn}
          >
            <AddIcon />
          </Fab>
          <Fab
            color='secondary'
            aria-label='delete'
            onClick={() => handleMultiDeleteClick()}
            disabled={!_user.loggedIn || !multiDeleteEnabled} // Enable or disable the multi-delete button
          >
            <DeleteIcon />
          </Fab>
        </Box>
        <section className='contents'>
          <h1>TODO List</h1>
          <h3>
            <span>{checkedCount}</span> Items selected
          </h3>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <h3>Title</h3>
                </TableCell>
                <TableCell>
                  <h3>Description</h3>
                </TableCell>
                <TableCell>
                  <h3>Operations</h3>
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={selectAllChecked}
                    onChange={handleCheckboxChange}
                    color='primary'
                    name='selectAll'
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableHead></TableHead>
            <TableBody>
              {todo.map((data) => (
                <TodoCard
                  key={data._id}
                  data={data}
                  handleDelete={handleDelete}
                  selectedItems={selectedItems}
                  setSelectedItems={setSelectedItems}
                />
              ))}
            </TableBody>
          </Table>
        </section>
      </Container>
    </>
  );
};
export default TodoShow;
