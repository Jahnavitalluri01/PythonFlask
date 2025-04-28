import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
function Updatefriend({getfriends,handleClose1,namee,rolee,genderr,descriptionn,img_urll,idd}){
   
    const [name,setname]=useState(namee)
    const [role,setrole]=useState(rolee)
    const [gender,setgender]=useState(genderr)
    const [description,setdescription]=useState(descriptionn)
    const [img_url,setimgurl]=useState(img_urll)
    async function handleupdate(event) {
        console.log("IN HANDLE Update"+name)
        event.preventDefault()
       try{
        const response=await axios.patch(`http://127.0.0.1:5000/api/updatefriend/${idd}`,
            {
                name:name,role:role,gender:gender,description:description,img_url:img_url
            }
        )
        const result=await response.data
        console.log(result)
        if(result){
            console.log("Updated Successfully")
            await getfriends()
            handleClose1()
        }
    }catch(err){
        console.log("Some Error occured in handleUpdate"+err)
    }
    }
    return(
        <div className="container">
            {/* <h3 className="text-center my-5">Add New Friend</h3> */}
            <div className="d-flex justify-content-center py-5 px-5">
              <Form className="w-100 gap-3" onSubmit={handleupdate}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" onChange={(e)=>setname(e.target.value)} value={name}></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Role</Form.Label>
                    <Form.Control type="text" onChange={(e)=>setrole(e.target.value)} value={role}></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control type="text" onChange={(e)=>setgender(e.target.value)} value={gender}></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" onChange={(e)=>setdescription(e.target.value)} value={description}></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Url of Image</Form.Label>
                    <Form.Control as="textarea" rows={2} onChange={(e)=>setimgurl(e.target.value)} value={img_url}></Form.Control>
                </Form.Group>
                <div className="d-flex justify-content-center mt-4">
                <Button variant="danger" className="text-center" type="submit">Update Friend</Button>
                </div>
              </Form>
              </div>
        </div>
    )
}
export default Updatefriend