import { configureStore } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

const authslice=createSlice({
    name:"auth",
    initialState:{user:"",islogin:false},
    reducers:{
      login(state){
        state.islogin=true;
      },
      logout(state){
        state.islogin=false;
      }
    }
});

export const authactions=authslice.actions;

export const store = configureStore({
  reducer: authslice.reducer
});