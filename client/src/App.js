import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material'
import Login from './components/login'
import Register from './components/register';
import PasswordForget from './components/forgetpassword';
import ResetForm from './components/resetpassword';
import SuccessCard from './components/success';
import ActivationCard from './components/activation'
import ProfileCheck from './components/profile';
import './App.css'

const theme_obj = createTheme(
  {
  palette: {
    type: 'light',
    primary: {
      main: '#218e26',
    },
    text: {
      primary: '#fff',
    }
  },
  typography: {
    h4: {
      color: '#00ff0c'
    }
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: "#00ff0c",
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: "#fff"
          }
        },
      }
    },
    MuiButton:{
      styleOverrides:{
        root:{
          color:"#fff"
        }
      }
    },
    MuOutlinedInput:{
      styleOverrides:{
        root:{
          color:"#fff"
        }
      }
    },
    MuiFormLabel:{
      styleOverrides:{
        root:{
          color:"#8cd890"
        }
      }
    },
    MuiDivider:{
      styleOverrides:{
        root:{
          borderColor:"#218e26"
        }
      }
    }
  }
}) 

export default function Routing() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme_obj}>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/forgetpassword" element={<PasswordForget />}></Route>
          <Route path="/resetpassword/:id" element={<ResetForm />}></Route>
          <Route path="/success" element={<SuccessCard />}></Route>
          <Route path="/activated" element={<ActivationCard />}></Route>

          <Route path="/profile" element={<ProfileCheck />}></Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}