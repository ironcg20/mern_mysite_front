import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    _id: "",
    title: "",
    description: "",
    user: "",

    inserted: {
      _id: "",
      title: "",
      description: "",
      user: "",
    },

    updated: {
      _id: "",
      title: "",
      description: "",
      user: "",
    },

    deleted: {
      _id: "",
    },
  },
  reducers: {
    setInserted: (state, action) => {
      const { _id, title, description, user } = action.payload;
      state.inserted._id = _id;
      state.inserted.title = title;
      state.inserted.description = description;
      state.inserted.user = user;
    },

    setUpdated: (state, action) => {
      const { _id, title, description, user } = action.payload;
      state.updated._id = _id;
      state.updated.title = title;
      state.updated.description = description;
      state.updated.user = user;
    },

    setDeleted: (state, action) => {
      // const { _id} = action.payload;
      state.deleted._id = action.payload._id;
    },

    set: (state, action) => {
      const { _id, title, description, user } = action.payload;
      if (_id !== undefined && _id !== null && _id !== "") {
        state._id = _id;
      }
      if (title !== undefined && title !== null && title !== "") {
        state.title = title;
      }
      if (
        description !== undefined &&
        description !== null &&
        description !== ""
      ) {
        state.description = description;
      }
      if (user !== undefined && user !== null && user !== "") {
        state.user = user;
      }
    },

    reset: (state) => {
      state._id = "";
      state.title = "";
      state.description = "";
      state.user = "";
    },

    // resetAll: (state) => {
    //   dispatch(reset(state));
    // },
  },
});

export const { set, reset, setInserted, setDeleted, setUpdated } =
  todoSlice.actions;

// export const selectTodo = (_data) => async (dispatch) => {
//   dispatch(select({ _id: _data._id }));
// };
// export const updateTodo = (_data) => async (dispatch) => {
//   dispatch(update({ title: _data.title, description: _data.description }));
// };
// export const update = (data) => async (dispatch) => {
//   const todo = {
//     _id: data._id,
//     title: data.title,
//     description: data.description,
//     user: data.user,
//   };
//   //   dispatch(update({ title: _data.title, description: _data.description }));
// };
export const deleteItem = (data) => async (dispatch) => {
  dispatch(set({ _id: data._id }));
  return axios
    .delete(`http://localhost:8000/api/todo/${data._id}`)
    .then(() => {
      dispatch(setDeleted({ _id: data._id }));
      console.log("ddd");
    })
    .catch((error) => {
      console.log("Error deleting todo:", error.message);
      throw error;
    });
};

export const insertItem = (data) => async (dispatch) => {
  const todo = {
    _id: uuidv4(),
    title: data.title,
    description: data.description,
    user: data.user,
  };
  dispatch(set(todo));

  return axios
    .post("http://localhost:8000/api/todo/", todo)
    .then((res) => {
      dispatch(setInserted(todo));
    })
    .catch((error) => {
      console.log("Error couldn't create TODO");
      console.log(error.message);
      throw error;
    });
};

export const updateItem = (data) => async (dispatch) => {
  const todo = {
    _id: data._id,
    title: data.title,
    description: data.description,
    user: data.user,
  };
  dispatch(set(todo));

  return axios
    .put(`http://localhost:8000/api/todo/${data._id}`, todo)
    .then((res) => {
      dispatch(setInserted(todo));
      // setData({ title: "", description: "", user: user });
      // goBack();
    })
    .catch((error) => {
      console.log("Failed to update todo");
      console.log(error.message);
      throw error;
    });
};

export default todoSlice.reducer;
