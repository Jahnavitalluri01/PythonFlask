import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
function Addfriend({getfriends,handleClose}){
   
    const [name,setname]=useState()
    const [role,setrole]=useState()
    const [gender,setgender]=useState()
    const [description,setdescription]=useState()
    const [img_url,setimgurl]=useState()
    async function handleadd(event) {
        console.log("iN HANDE ADD")
        event.preventDefault()
        if(name!=="" && role!=="" && gender!=="" && description!=="" && img_url!==""){
        const response=await axios.post("http://127.0.0.1:5000/api/friends",
            {
                name:name,role:role,gender:gender,description:description,img_url:img_url
            }
        )
        const result=await response.data
        console.log(result)
        if(result){
            console.log("Added Successfully")
            await getfriends()
            handleClose()
        }
    }
    else{
        console.log("One or more details are missing to add!!!")
    }
    }
    return(
        <div className="container">
           
            <div className="d-flex justify-content-center py-5 px-5">
              <Form className="w-100 gap-3" onSubmit={handleadd}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" onChange={(e)=>setname(e.target.value)} required></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Role</Form.Label>
                    <Form.Control type="text" onChange={(e)=>setrole(e.target.value)} required></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control type="text" onChange={(e)=>setgender(e.target.value)} required></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" onChange={(e)=>setdescription(e.target.value)} required></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Url of Image</Form.Label>
                    <Form.Control as="textarea" rows={2} onChange={(e)=>setimgurl(e.target.value)} required></Form.Control>
                </Form.Group>
                <div className="d-flex justify-content-center mt-4">
                <Button variant="danger" className="text-center" type="submit">Add New Friend</Button>
                </div>
              </Form>
              </div>
        </div>
    )
}
export default Addfriend