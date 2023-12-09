import { useState, useEffect } from "react";
import axios from "axios";
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
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useNavigate } from "react-router-dom";
import { Container } from "@material-ui/core";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { set, deleteItem } from "../reducers/todoReducer";

const TodoShow = () => {
  const currentUser = useSelector((state) => state.user);
  const [todo, setTodo] = useState([]);
  const [updateFlag, setUpdateFlag] = useState(false); // added
  const [loading, setLoading] = useState(false);

  const [selectedItems, setSelectedItems] = useState({});
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [multiDeleteEnabled, setMultiDeleteEnabled] = useState(false);
  const [checkedCount, setCheckedCount] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const load_TodoData = () => {
    setLoading(true);
    axios
      .get("http://localhost:8000/api/todo", {
        params: {
          user: currentUser._id,
        },
      })
      .then((res) => {
        setTodo(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const count = Object.values(selectedItems).filter(Boolean).length;
    setCheckedCount(count);
    setMultiDeleteEnabled(count > 0);
    load_TodoData();
  }, [updateFlag, currentUser]);

  const handle_Checkbox_Change = (e) => {
    const { name, checked } = e.target;
    let prevSelectedItems = selectedItems;
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
    setUpdateFlag(!updateFlag);
  };

  const handleMultiDelete = () => {
    const selectedIds = Object.keys(selectedItems).filter(
      (itemId) => selectedItems[itemId],
    );
    selectedIds.forEach((id) => {
      console.log(id, " ");
      dispatch(deleteItem({ _id: id }));
    });
    setSelectedItems([]);
  };

  //Dialog Operations ------------------
  const handle_Dialog_Close = () => {
    setOpenDialog(false); // Close the dialog if cancel is clicked
  };

  const handle_Delete = (e) => {
    dispatch(deleteItem({ _id: e.currentTarget.name }));
    setUpdateFlag(!updateFlag);
  };

  const handle_MultiDelete_Click = () => {
    setOpenDialog(true);
  };

  const handle_MultiDelete_Confirm = () => {
    handleMultiDelete();
    setOpenDialog(false);
    setUpdateFlag(!updateFlag);
  };

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={handle_Dialog_Close}
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
            onClick={handle_Dialog_Close}
            color='primary'
            variant='contained'
          >
            Cancel
          </Button>
          <Button
            // name={_id}
            onClick={handle_MultiDelete_Confirm}
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
            disabled={!currentUser.loggedIn}
          >
            <AddIcon />
          </Fab>
          <Fab
            color='secondary'
            aria-label='delete'
            onClick={() => handle_MultiDelete_Click()}
            disabled={!currentUser.loggedIn || !multiDeleteEnabled}
          >
            <DeleteIcon />
          </Fab>
          {loading && (
            <div className='spinner'>
              <CircularProgress /> {/* Render CircularProgress component */}
            </div>
          )}
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
                    onChange={handle_Checkbox_Change}
                    color='primary'
                    name='selectAll'
                  />
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {todo.map((data) => (
                <TodoCard
                  key={data._id}
                  data={data}
                  handle_Delete={handle_Delete}
                  selectedItems={selectedItems}
                  setSelectedItems={setSelectedItems}
                  updateFlag={updateFlag}
                  setUpdateFlag={setUpdateFlag}
                  handle_Checkbox_Change={handle_Checkbox_Change}
                />
              ))}
            </TableBody>
          </Table>
        </section>
      </Container>
    </>
  );
};

const TodoCard = ({
  data,
  handle_Delete,
  selectedItems,
  setSelectedItems,
  handle_Checkbox_Change,
  updateFlag,
  setUpdateFlag,
}) => {
  const { _id, title, description, user } = data;
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handle_DeleteClick = () => {
    setOpenDialog(true);
  };

  const handle_Update = () => {
    dispatch(
      set({
        _id: _id,
        title: title,
        description: description,
        user: user,
      }),
    );
    navigate(`/todoUpdate/`);
  };

  const handle_DeleteConfirm = (e) => {
    handle_Delete(e);
    setOpenDialog(false);
  };

  const handle_Dialog_Close = () => {
    setOpenDialog(false); // Close the dialog if cancel is clicked
  };

  const handle_TableRow_Click = () => {
    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      [_id]: !prevSelectedItems[_id], // Toggle the checkbox status
    }));
    setUpdateFlag(!updateFlag);
  };

  return (
    <>
      <TableRow
        key={_id}
        onClick={handle_TableRow_Click}
        style={{ cursor: "pointer" }}
      >
        <TableCell>
          <h3>{title}</h3>
        </TableCell>
        <TableCell>{description}</TableCell>
        <TableCell>
          <IconButton
            // onClick={handleEdit}
            onClick={handle_Update}
            aria-label='edit'
            style={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)" }}
          >
            <CreateIcon />
          </IconButton>
          <IconButton
            // name='delete'
            name={_id}
            onClick={handle_DeleteClick}
            style={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)" }}
          >
            <DeleteIcon></DeleteIcon>
          </IconButton>
        </TableCell>
        <TableCell>
          <Checkbox
            checked={selectedItems[_id] || false}
            onChange={handle_Checkbox_Change}
            color='primary'
            name={_id}
          />
        </TableCell>
      </TableRow>

      <Dialog
        open={openDialog}
        onClose={handle_Dialog_Close}
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
            onClick={handle_Dialog_Close}
            color='primary'
            variant='contained'
          >
            Cancel
          </Button>
          <Button
            name={_id}
            onClick={handle_DeleteConfirm}
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

export default TodoShow;
