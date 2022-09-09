import axios from 'axios'
import {createAsyncThunk} from '@reduxjs/toolkit'
import { backend_url } from '../../url/url'

export const FETCH_CLIENT = createAsyncThunk(
    'reducer1/FETCH_CLIENT',
    async(id)=>{
        try{
            // console.log(id)
            let response = await axios.get(`${backend_url}/client/${id}`)
            // console.log(response.data)
            if(!response.data.msg || !response.data.error){
                return response.data
            }
            else{
                alert(response.data.msg || response.data.error)
            }
        }
        catch(err){
            alert("Error Fetching Client Details")
        }
    }
)