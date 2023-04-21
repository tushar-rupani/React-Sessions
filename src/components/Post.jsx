import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postIntoPlaceholder } from '../API/PostAPI';
export const Post = () => {
    const INITIAL_DATA = {
        title: "",
        uid: "",
        body: ""
    }

    const [data, setData] = useState(INITIAL_DATA);
    const handleChange = (e) => {
        setData({...data, [e.target.name] : e.target.value});
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            let ans = postIntoPlaceholder(data);
            if(ans){
                setData(INITIAL_DATA)
                toast.success("Data has been submitted");
            }  
        } catch (error) {
            toast.error("Oops something went wrong!")
        }
    }
        
    return (
        <form style={{padding: "20px"}} onSubmit={handleSubmit}>
            <div style={{display: "flex", gap:"20px", justifyContent: "space-between", marginBottom: "20px"}} >
                <TextField label="Title" style={{ width: "90%" }} name="title" type="text" value={data.title} onChange={handleChange} autoFocus />
                <TextField label="User ID" style={{ width: "90%" }} name="uid" type="text" value={data.uid} onChange={handleChange}/>
            </div>
            <TextField label="Body" style={{ width: "100%" }} type="text" name="body" value={data.body} onChange={handleChange}/>
            <br /><br />
            <Button type='submit' variant='contained'>Add Post</Button>
            <ToastContainer />
        </form>
    )
}