import {
    Box, TextField, Typography, Button, CircularProgress, Grid, Stack,
    Card, CardContent, CardActions, Divider
} from '@mui/material'
import * as yup from 'yup'
import YupPassword from 'yup-password'
import { Formik, Form } from "formik"
import axios from 'axios'
import moment from 'moment'
import { backend_url } from '../url/url'
import jwtDecode from 'jwt-decode'
import { useEffect, useState } from 'react'
import { FETCH_CLIENT } from '../redux/actions/action'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from './navbar'
import { useNavigate } from 'react-router-dom'
import { keyframes } from '@emotion/react'
YupPassword(yup)


export default function ProfileCheck() {
    const [tokencheck] = useState(window.sessionStorage.getItem('token'))
    const nav = useNavigate()
    if (tokencheck) {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function (event) {
            window.history.go(1);
        };
    }
    return (
        tokencheck ? <>
            <Profile />
        </>
            :
            <>
                <Card sx={{ width: '100%', maxWidth: "40%", mx: "auto", mt: "12%", p: "2%", backgroundColor: "#e9e9e9" }} variant="outlined">
                    <CardContent>
                        <Typography sx={{ textAlign: "center" }} variant="h5" color="dark">Please Login To Access The Content</Typography>
                    </CardContent>
                    <CardActions>
                        <Button sx={{ mx: "auto", fontSize: "1.5rem" }} onClick={() => nav('/')}>Login</Button>
                    </CardActions>
                </Card>
            </>
    );
}



const Profile = () => {
    const dispatch = useDispatch()
    const client_details = useSelector(state => state.client)
    const client_fetch_status = useSelector(state => state.client_fetch_status)
    let client = jwtDecode(window.sessionStorage.getItem('token')).client
    useEffect(() => {
        dispatch(FETCH_CLIENT(client._id))
    }, [dispatch])

    let initialValues = {
        age: client_details.age || "",
        dob: client_details.dob || "",
        mobile: client_details.mobile || "",
        country: client_details.country || ""
    }

    const ValidationSchema = yup.object().shape({
        age: yup.number().typeError("Numbers Only").required('Required'),
        dob: yup.string().test(
            "dob",
            "Age and DOB not matched",
            (value, { parent }) => {
                return moment().diff(moment(value), 'years') === parent.age;
            }
        ).required('Required'),
        mobile: yup.string().test(
            (value, { createError }) => {
                if (value !== undefined && value !== "") {
                    if (value.length !== 10)
                        return createError({ message: "Invalid Phone Number" })
                }
                return true
            }
        ).required('Required'),
        country: yup.string().required('Required'),
    })

    const Submit = async (event, onSubmitprops) => {
        let values = event
        values.mobile = parseInt(values.mobile)
        values.age = parseInt(values.age)
        try {
            let response = await axios.patch(`${backend_url}/client/update/${client._id}`, { ...values })
            response.data.msg ? alert(response.data.msg) : alert(response.data.error)
        }
        catch (err) {
            alert('Error while submitting.')
        }
    }

    let leftAnimation = keyframes({
        from :{
            opacity:0,
            top:10,
            left:0, 
        },
        to:{
            opacity:1,
            top:50,
            left:20
        }
    })
    return (
        client_fetch_status === "pending" ?
            <Box
                sx={{
                    mt: "20%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <CircularProgress />
                <Typography variant="h4">...Loading Please Wait</Typography>
            </Box>
            :
            client_fetch_status === "success" &&
            <Stack spacing={5}>
                <Navbar />
                <Box>
                    <Typography
                        sx={{
                            fontSize: "1.5rem",
                            pl: 2,
                            color: "white",
                            background: " #192719",
                            borderLeft: "10px solid green"
                        }}
                    >Edit Details</Typography>
                </Box>
                <Formik
                    initialValues={initialValues}
                    validationSchema={ValidationSchema}
                    onSubmit={(event, onSubmitprops) => Submit(event, onSubmitprops)}
                >
                    {(props) => {
                        return (
                            <Form>
                                <Grid container sx={{ width: { xs: "90%", sm: "80%", md: 500 }, mx: "auto",animation:`${leftAnimation} 2s ease` }} rowSpacing={{ xs: 2 }} >
                                    <Grid item xs={12}>

                                        <TextField
                                            fullWidth
                                            label="Age"
                                            name="age"
                                            value={props.values.age}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            // placeholder="Age"
                                            error={props.touched.age && props.errors.age && true}
                                        />
                                        <Typography sx={{ color: "red" }}>
                                            {props.touched.age && props.errors.age && props.errors.age}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>

                                        <TextField
                                            fullWidth
                                            // label="Date Of Birth"
                                            type="date"
                                            name="dob"
                                            value={props.values.dob}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            error={props.touched.dob && props.errors.dob && true}
                                        />
                                        <Typography sx={{ color: "red" }}>
                                            {props.touched.dob && props.errors.dob && props.errors.dob}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>

                                        <TextField
                                            fullWidth
                                            label="Phone Number"
                                            name="mobile"
                                            value={props.values.mobile}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            // placeholder="Phone Number"
                                            error={props.touched.mobile && props.errors.mobile && true}
                                        />
                                        <Typography sx={{ color: "red" }}>
                                            {props.touched.mobile && props.errors.mobile && props.errors.mobile}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>

                                        <TextField
                                            fullWidth
                                            label="Country"
                                            name="country"
                                            value={props.values.country}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            // placeholder="Country"
                                            error={props.touched.country && props.errors.country && true}
                                        />
                                        <Typography sx={{ color: "red" }}>
                                            {props.touched.country && props.errors.country && props.errors.country}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Box sx={{ mt: 2, textAlign: "center" }}>
                                    <Button type="submit" variant="contained">Save</Button>
                                </Box>
                            </Form>
                        )
                    }}
                </Formik>
                <Divider orientation="horizontal" light />
            </Stack >
    )
}