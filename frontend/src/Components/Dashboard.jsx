import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Addfriend from "./Addfriend";
import Button from "react-bootstrap/esm/Button";
import { Modal } from "react-bootstrap";
import Updatefriend from "./Updatefriend";

function Dashboard(){
    const [friends,setfriends]=useState()
    const [show, setShow] = useState(false);
    const [show1,setShow1]=useState(false)
 
    const [idtoupdate,setidtoupdate]=useState()
    const [nametoupdate,setnametoupdate]=useState()
    const [roletoupdate,setroletoupdate]=useState()
    const [descriptiontoupdate,setdescriptiontoupdate]=useState()
    const [gendertoupdate,setgendertoupdate]=useState()
    const [img_urltoupdate,setimg_urltoupdate]=useState()
    const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);   //For add Modal

  const handleClose1=()=>setShow1(false)
  const handleShow1 = () => setShow1(true); //For Update Modal


    async function getfriends() {
        try{
        const response=await axios.get("http://127.0.0.1:5000/api/friends")
        const result=await response.data
        console.log(result)
        if(result){
            setfriends(result)
        }
    }
    catch(err){
        console.log("There is an error in retrieving friends"+err)
    }
    }
    async function handledelete(id) {
        const response=await axios.delete(`http://127.0.0.1:5000/api/delfriend/${id}`)
        const result=await response.data;
        if(result){
         getfriends()
        }
    }
    function handleupdate(id,name,gender,role,description,img_url){
        setidtoupdate(id)
        setnametoupdate(name)
        setdescriptiontoupdate(description)
        setgendertoupdate(gender)
        setimg_urltoupdate(img_url)
        setroletoupdate(role)

        handleShow1()
    }
    useEffect(()=>{
        async function callinggetfriends() {
            await getfriends()
        }
      callinggetfriends()
    },[])
    return(
        <div className="container text-center" style={{filter:show || show1?"blur(5px)":"none"}}>
            <h1 className="mt-5">Dashboard</h1>
            <div className="d-flex justify-content-between">
            <h3 className="text-danger">Friends</h3>
            <Button variant="dark" className="mb-4" onClick={handleShow}>
        Add New Friend
      </Button>
      </div>
            <Row className="justify-content-center mb-4">
                { friends?
                friends.map((friend)=>
                    <Col md={4}>
                <Card className="my-4">
                    <Card.Img variant="top" src={friend.img_url} style={{ height: '10rem', objectFit: 'stretch' }}></Card.Img>
                       <Card.Body>
                        <Card.Title>
                            {friend.name}
                        </Card.Title>
                        <Card.Text>{friend.description}</Card.Text>
                        <Card.Text>{friend.role}</Card.Text>

                       </Card.Body>
                       <Card.Footer className="d-flex justify-content-between">
                        <Button onClick={(e)=>handleupdate(friend.id,friend.name,friend.gender,friend.role,friend.description,friend.img_url)} variant="dark">Update Friend</Button>
                        <Button onClick={(e)=>handledelete(friend.id)} variant="danger">Remove Friend</Button>
                       </Card.Footer>
                </Card></Col>):
                <div>
                    <h3>Sorry!!! You do not have Any Friends</h3>
                    </div>
}
</Row>

       <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Friend</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Addfriend getfriends={getfriends} handleClose={handleClose} />
          {/* You pass getfriends and handleClose to AddFriend */}
         </Modal.Body>
      </Modal> 

      <Modal show={show1} onHide={handleClose1} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Friend</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Updatefriend getfriends={getfriends} handleClose1={handleClose1} namee={nametoupdate} idd={idtoupdate} rolee={roletoupdate} 
          genderr={gendertoupdate} descriptionn={descriptiontoupdate} img_urll={img_urltoupdate} />
          {/* You pass getfriends and handleClose1 to UpdateFriend */}
         </Modal.Body>
      </Modal> 
            
        </div>
    )
}
export default Dashboard