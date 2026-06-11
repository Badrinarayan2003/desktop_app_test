import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import { combineReducers } from "redux";

import authReducer from "../reducers/authSlice";
import notificationReducer from "../reducers/notificationSlice";


const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth", "notifications"],
};

const rootReducer = combineReducers({
    auth: authReducer,
    notifications: notificationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);