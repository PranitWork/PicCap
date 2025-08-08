import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user : null,
}

const UserSlice = createSlice({
    name:"users",
    initialState,
    reducers:{
        loadusers:(state, action)=>{
            state.users= action.payload;
        },
    },
});

export const {loadusers} = UserSlice.actions;
export default UserSlice.reducer;