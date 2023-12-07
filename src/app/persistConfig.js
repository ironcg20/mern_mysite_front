import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import rootReducer from "../reducers/rootReducer"; // Import your root reducer

const persistConfig = {
  key: "root",
  storage, // Choose your storage, e.g., localStorage, sessionStorage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
