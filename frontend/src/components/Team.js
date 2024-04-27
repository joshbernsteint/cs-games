import { useEffect, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Teams(props){


    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const errorRef = useRef(undefined);
    const errorRef2 = useRef(undefined);



    async function handleCreate(event){
        const form = event.currentTarget;
        event.preventDefault();
        const {data} = await axios.post("/teams/create", {teamName: form[0].value, password: form[1].value, username: props.username});
        if(data.error){
            errorRef.current.innerText = data.msg;
            errorRef.current.hidden = false;

        }
        else{
            errorRef.current.innerText = "";
            errorRef.current.hidden = true;
            props.setTeamData(data);
            navigate("/");
        }
    }


    async function handleJoin(e){
        const form = e.currentTarget;
        e.preventDefault();
        const {data} = await axios.post("/teams/join", {teamName: form[0].value, password: form[1].value,username: props.username});
        if(data.error){
            errorRef2.current.innerText = data.msg;
            errorRef2.current.hidden = false;

        }
        else{
            errorRef2.current.innerText = "";
            errorRef2.current.hidden = true;
            props.setTeamData(data);
            navigate("/");
        }

    }

    return (
        <div style={{padding: "5rem"}}>
            <Button size="lg" onClick={handleShow}>Create a Team</Button>
            <Form onSubmit={handleJoin} style={{width: "50%", textAlign: "left"}}>
                <Form.Group className="mb-3" controlId="teamInput">
                    <Form.Label>Or, search for a team</Form.Label>
                    <Form.Control type="text" placeholder="team name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="teamInput">
                    <Form.Label>Team Password</Form.Label>
                    <Form.Control type="text" placeholder="Team Password" />
                </Form.Group>
                <Button variant="success" type="submit">
                        Search
                </Button>
                <p id='feedback'  className="error" ref={errorRef2} hidden></p>
            </Form>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Create a Team</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form style={{textAlign: "left", width: "50%"}} onSubmit={handleCreate}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Enter a Team Name</Form.Label>
                        <Form.Control type="text" placeholder="Team name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Enter a Password</Form.Label>
                        <Form.Control type="text" placeholder="Password" />
                    </Form.Group>
                    <p id='feedback'  className="error" ref={errorRef} hidden></p>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}


export default Teams;