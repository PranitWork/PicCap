import {configureStore} from "@reduxjs/toolkit"
import UserSlice from "./reducers/UserReducer"
import postSlice from "./reducers/PostReducer"
export const Store = configureStore({
    reducer:{
        UserReducer: UserSlice,
        postReducer : postSlice,
    }
})