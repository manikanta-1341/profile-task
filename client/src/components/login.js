import { Button, Grid, Stack, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { Form, Formik } from "formik"
import * as Yup from 'yup'
import axios from "axios"
import { backend_url } from "../url/url"
import { useNavigate } from 'react-router-dom'

import '../../src/App.css'


export default function Login() {

    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function (event) {
        window.history.go(1);
    }

    const nav = useNavigate()
    const initialValues = {
        email: "",
        password: "",
    }
    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Required'),
        password: Yup.string().required('Required'),
    })
    const Submit = async (values, onSubmitprops) => {

        try {


            let response = await axios.put(`${backend_url}/login`, { ...values })
            // console.log(response)
            if (response.data.error) {
                alert(response.data.error)
            }
            else if (response.data.msg && response.data.msg !== "verification not done") {
                alert(response.data.msg)
            }
            else if (response.data.msg === "verification not done") {

                let response = await axios.patch(`${backend_url}/verificationMail`, { email: values.email })
                response.data.msg ? alert(response.data.msg) : alert(response.data.error)
            }
            else {
                window.sessionStorage.setItem('token', response.data)
                nav('/profile')
            }


        }
        catch (e) {

            alert('Login Failed')
        }
    }
    return (
        <Box
            mt={{ xs: "15%", md: "10%" }}
            mx={{ xs: 2, sm: "auto" }}
            width={{ sm: 500 }}
        >
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, onSubmitprops) => Submit(values, onSubmitprops)}
            >
                {
                    (props) => {
                        return (
                            <Box>
                                <Stack spacing={{ xs: 2, sm: 2 }}>
                                    <Box sx={{ textAlign: "center" }}>
                                        <Typography variant="h4">Sign In</Typography>
                                    </Box>
                                    <Form>
                                        <Grid container rowSpacing={{ xs: 3 }}>
                                            <Grid item xs={12}>
                                                {/* <Stack spacing={{ xs: 2 }} mb={1}> */}
                                                <TextField
                                                    fullWidth
                                                    name="email"
                                                    type="email"
                                                    placeholder="Email"
                                                    value={props.values.email}
                                                    onChange={props.handleChange}
                                                    onBlur={props.handleBlur}
                                                    error={props.touched.email && props.errors.email && true}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    name="password"
                                                    type="password"
                                                    placeholder="Password"
                                                    value={props.values.password}
                                                    onChange={props.handleChange}
                                                    onBlur={props.handleBlur}
                                                    error={props.touched.password && props.errors.password && true}
                                                />
                                                {/* </Stack> */}
                                            </Grid>
                                        </Grid>
                                        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-evenly" spacing={{ xs: 1, sm: 3 }} >
                                            <Button onClick={() => nav('/forgetpassword')}>Forget Password</Button>
                                            <Button onClick={() => nav('/register')}>Dont have an account?</Button>
                                        </Stack>
                                        <Box sx={{ textAlign: "center" }}>

                                            <Button fullWidth type="submit" variant="contained">Login</Button>
                                        </Box>
                                    </Form>
                                </Stack>
                            </Box>
                        )
                    }
                }
            </Formik>
        </Box>
    )
}