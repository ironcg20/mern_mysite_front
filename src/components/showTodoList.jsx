// src/components/showTodoList.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import UpdateTodo from "./updateTodo";

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
import Fab from "@mui/material/Fab";
import NavBar from "./NavBar";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Container } from "@material-ui/core";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";

function TodoCard({ data, handleEdit, handleDelete }) {
  // updated
  // console.log("Table data: ", data);
  const { _id, title, description, user } = data;
  const [openDialog, setOpenDialog] = useState(false);

  const handleDeleteClick = () => {
    setOpenDialog(true); // Open the dialog when the delete button is clicked
  };

  const handleConfirmDelete = (e) => {
    // handleDelete(_id); // Call the handleDelete function with the ID
    handleDelete(e);
    setOpenDialog(false); // Close the dialog after confirming delete
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog if cancel is clicked
  };
  return (
    // <TableRow key={_id}>
    //   <TableCell>{title}</TableCell>
    //   <TableCell>{description}</TableCell>

    //   <Link
    //     to={`/update-todo/edit?_id=${_id}&title=${title}&description=${description}&user=${user}`}
    //   >
    //     <Button name={_id} onClick={handleEdit}>
    //       <CreateIcon></CreateIcon>
    //     </Button>
    //   </Link>

    //   <Button name={_id} onClick={handleDelete}>
    //     <DeleteIcon></DeleteIcon>
    //   </Button>
    // </TableRow>

    <>
      <TableRow key={_id}>
        <TableCell>{title}</TableCell>
        <TableCell>{description}</TableCell>
        <TableCell>
          <Link
            to={`/update-todo/edit?_id=${_id}&title=${title}&description=${description}&user=${user}`}
          >
            <IconButton
              onClick={handleEdit}
              aria-label='edit'
              style={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)" }}
            >
              <CreateIcon />
            </IconButton>
          </Link>
          {/* <div style={{ marginRight: "0.5rem" }}></div> */}
          <IconButton
            name={_id}
            onClick={handleDeleteClick}
            style={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)" }}
          >
            <DeleteIcon></DeleteIcon>
          </IconButton>
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
}

export default function ShowTodoList() {
  const { user } = useParams();
  const [todo, setTodo] = useState([]);
  // const [open, setOpen] = useState(false); // added
  const [id, setId] = useState(""); // added
  const [update, setUpdate] = useState(false); // added

  useEffect(
    () => {
      axios
        .get("http://localhost:8000/api/todo", {
          params: {
            user: user,
          },
        })
        .then((res) => {
          // console.log("User: " + user);
          // console.log("Intialize: " + res.data);
          // console.log("%s %s", res.data.title, res.data.description);
          setTodo(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    [update, user], // updated
  );

  const handleEdit = (e) => {
    const id = e.currentTarget.name;
    // setId(id);
    setId(e.currentTarget.name);
    // console.log("Id of handleEdit" + this.id);
  };

  const handleUpdate = () => {
    console.log("update:", update, !update);
    setUpdate(!update);
  };

  const handleDelete = (e) => {
    const id = e.currentTarget.name;
    axios
      .delete(`http://localhost:8000/api/todo/${id}`)
      .then(() => {
        setTodo((data) => {
          return data.filter((todo) => todo._id !== id);
        });
      })
      .catch((error) => {
        console.log("Error deleting todo:", error.message);
      });
  };

  return (
    <>
      {/* <NavBar /> */}
      <Container
        className='container'
        style={{ padding: "20px", height: "auto" }}
      >
        <Link to={`/create-todo/${user}`} className='button-new'>
          {/* <Button color='primary' variant='contained'>
            Add Data
          </Button> */}
          {/* <Button
            variant='contained'
            color='primary'
            style={{
              borderRadius: "100%",
              // width: "50px",
              // height: "50px",
              padding: "0.5rem",
            }}
          >
            +
          </Button> */}
          <Fab color='primary' aria-label='add'>
            <AddIcon />
          </Fab>
        </Link>
        <section className='contents'>
          <h1>TODO List</h1>
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
              </TableRow>
            </TableHead>
            <TableHead></TableHead>
            <TableBody>
              {todo.map((data) => (
                <TodoCard data={data} handleDelete={handleDelete} />
              ))}
            </TableBody>
          </Table>
        </section>
      </Container>
    </>
  );
}
