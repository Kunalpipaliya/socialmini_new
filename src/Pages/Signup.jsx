import { Link } from '@mui/material'
import axios from 'axios'
import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'

const Signup = ({ users, setUsers }) => {
    const token = "w3KH694RqiZ64T9M"
    const [ini, setIni] = useState({
        username: "",
        email: "",
        password: ""
    })
    axios.get("https://generateapi.techsnack.online/api/users", {
        headers: {
            Authorization: token
        }
    }).then((res) => {
        setUsers(res.data.Data)
        console.log(res.data.Data);

    })
        .catch((err) => {
            console.log(err);

        })
    const handleSubmit = (values, { resetForm }) => {
        const existUser = users.find((u) => u.email === values.email)
        if (existUser) {
            alert("user already exist")
        }
        else {

            axios.post("https://generateapi.techsnack.online/api/users", values, {
                headers: {
                    Authorization: token
                }
            }).then(() => {
                console.log(values);

                alert("user signed up successfully")
                resetForm()
                window.location.href = "/login"
            }).catch((err) => {
                console.log(err);

            })
        }
    }
    return (
        <div className='d-flex justify-content-center align-items-center' style={{ height: "100vh" }}>
            <Formik
                initialValues={ini}
                onSubmit={handleSubmit}
            >
                <Form className='w-50 m-auto p-3 shadow-lg rounded'>
                    <div className="form-group mb-3">
                        <label htmlFor="" className="form-label">Username</label>
                        <Field name="username" placeholder="Enter Username" className="form-control"></Field>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="" className="form-label">Email</label>
                        <Field name="email" placeholder="Enter Email" className="form-control"></Field>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="" className="form-label">Password</label>
                        <Field name="password" type="password" placeholder="Enter Password" className="form-control"></Field>
                    </div>
                    <button className="btn btn-primary w-100" type='submit'>Sign up </button>
                    <Link href="/login">already have an account</Link>
                </Form>
            </Formik>
        </div>
    )
}

export default Signup
