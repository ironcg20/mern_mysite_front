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

    selected: {},
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
      if (_id && title && description && user) {
        state.updated = {
          _id,
          title,
          description,
          user,
        };
      } else {
        console.error("Invalid payload structure for setUpdated action");
      }
    },

    setDeleted: (state, action) => {
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
      dispatch(setUpdated(todo));
    })
    .catch((error) => {
      throw error;
    });

  // try {
  //   const response = await axios.put(
  //     `http://localhost:8000/api/todo/${data._id}`,
  //     todo,
  //   );
  //   const updatedTodo = response.data; // Assuming the server responds with the updated TODO object

  //   // Dispatch set action to update local state
  //   dispatch(set(updatedTodo));

  //   // Dispatch setUpdated action with the updated data received from the server
  //   dispatch(setUpdated(updatedTodo));
  // } catch (error) {
  //   throw error;
  // }
};

export default todoSlice.reducer;
