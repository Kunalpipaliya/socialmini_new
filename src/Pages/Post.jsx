import axios from 'axios'
import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'

const Post = () => {
    const token = "w3KH694RqiZ64T9M"
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    const [ini, setIni] = useState({ post: "", postedBy: currentUser.email })
    const [posts, setPosts] = useState([])
    useEffect(() => {
        fetchPost()
    }, [])
    const fetchPost = () => {

        axios.get("https://generateapi.techsnack.online/api/post", {
            headers: {
                Authorization: token
            }
        }).then((res) => {
            console.log(res.data.Data);
            setPosts(res.data.Data)

        }).catch((err) => {
            console.log(err);

        })
    }

    const handlePosts = (values, { resetForm }) => {
        axios.post("https://generateapi.techsnack.online/api/post", values, {
            headers: {
                Authorization: token
            }
        }).then(() => {
            resetForm()
            fetchPost()
        })
            .catch((err) => {
                console.log(err);

            })
    }
    return (
        <div>
            <Formik
                initialValues={ini}
                onSubmit={handlePosts}
            >
                <Form className='w-50 m-auto p-3 rounded shadow-sm'>
                    <div className="form-group mb-2">
                        <label className="form-label">Post</label>
                        <Field className="form-control" name="post" placeholder="write anything ..."></Field>
                    </div>
                    <button className="btn btn-primary" type="submit">post</button>

                </Form>
            </Formik>
        </div>
    )
}

export default Post
