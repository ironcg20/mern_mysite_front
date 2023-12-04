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

import NavBar from "./NavBar";
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
        <Link
          to={`/update-todo/edit?_id=${_id}&title=${title}&description=${description}&user=${user}`}
        >
          <IconButton onClick={handleEdit} aria-label='edit'>
            <CreateIcon />
          </IconButton>
        </Link>
        <IconButton name={_id} onClick={handleDeleteClick}>
          <DeleteIcon></DeleteIcon>
        </IconButton>
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
            color='primary'
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
      <Container className='container' style={{ padding: "20px" }}>
        <Link to={`/create-todo/${user}`} className='button-new'>
          <Button variant='contained' color='primary'>
            Add Data
          </Button>
        </Link>
        <section className='contents'>
          <h1>TODO List</h1>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
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
