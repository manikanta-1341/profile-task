import {configureStore} from '@reduxjs/toolkit'
import reducer from '../reducers/reducer'

export const Store = configureStore({
    reducer : reducer
})