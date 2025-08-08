import {configureStore} from "@reduxjs/toolkit"
import UserSlice from "./reducers/UserReducer"

export const Store = configureStore({
    reducer:{
        UserReducer: UserSlice,
    }
})