    import axios from 'axios'
    import { Field, Form, Formik } from 'formik'
    import React, { useEffect, useState } from 'react'

    const Post = () => {
        const token = "w3KH694RqiZ64T9M"
        const currentUser = JSON.parse(localStorage.getItem("currentUser"))
        const [ini, setIni] = useState({ post: null, caption: '', postedBy: currentUser.email })
        const [posts, setPosts] = useState([])
        const [img, setImg] = useState('')
        const fetchPost = () => {
            console.log(posts);


            axios.get(" https://generateapi.techsnack.online/api/postImg", {
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
        useEffect(() => {
            fetchPost()
        })
        
        const handlePosts = (values, { resetForm }) => {
            values.post = img
            console.log(values);

            axios.post(" https://generateapi.techsnack.online/api/postImg", values, {
                headers: {
                    Authorization: token,
                    'Content-type': "multipart/form-data"
                }
            }).then(() => {
                resetForm()
                setIni({
                    post: "", caption: '', postedBy: currentUser.email
                })
                fetchPost()
            })
                .catch((err) => {
                    console.log(err);

                })
        }
        return (
            <div className=" d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
                <Formik
                    initialValues={ini}
                    onSubmit={handlePosts}
                >
                    <Form className='w-50 m-auto p-3 rounded shadow-sm' encType="multipart/form-data">
                        <div className="form-group mb-2">
                            <label className="form-label">Post</label>
                            <Field className="form-control" name="post" type="file" onChange={(e) => setImg(e.target.files[0])} ></Field>
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="" className="form-label">Caption</label>
                            <Field name="caption" className="form-control" placeholder="caption..."></Field>
                        </div>
                        <button className="btn btn-primary" type="submit">post</button>
                    </Form>
                </Formik>
            </div>
        )
    }

    export default Post
