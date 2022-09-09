import {createSlice} from '@reduxjs/toolkit'
import { FETCH_CLIENT} from '../actions/action'

let initialState ={
    client:{},
    client_fetch_status:""
}

const Reducer = createSlice({
    name:"reducer1",
    initialState,
    extraReducers: (builder)=>{
        builder
        
        .addCase(FETCH_CLIENT.pending,(state)=>{
            state.client_fetch_status = "pending"
        })
        .addCase(FETCH_CLIENT.fulfilled,(state,{payload})=>{
            state.client_fetch_status = "success"
            state.client = payload
            
        })
        .addCase(FETCH_CLIENT.rejected,(state)=>{
            state.client_fetch_status = "failed"
        })
    }
})


export default  Reducer.reducer