import { useEffect, useRef } from 'react';
import {Form, Button} from 'react-bootstrap';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


function Login(props){

    const errorRef = useRef(undefined);
    const formRef = useRef(undefined);
    const navigate = useNavigate();

    
    

    async function handleSubmit(e){
        e.preventDefault();
        const form = e.currentTarget;
        const {data} = await axios.post("/api/login", {username: form[0].value.trim(), password: form[1].value.trim()});
        if(data.error){
            errorRef.current.innerText = data.msg;
            errorRef.current.hidden = false;

        }
        else{
            errorRef.current.innerText = "";
            errorRef.current.hidden = true;
            props.setLoggedIn(true);
            props.setUsername(data.username);
        }
    }

    return (
        <>
        <h1>Login</h1>
        <Form style={{textAlign: "left", padding: "5rem"}} ref={formRef} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter a username" style={{"width": "50%"}}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" style={{"width": "50%"}}/>
            </Form.Group>
            <Button variant="danger" type="submit">
                Submit
            </Button>
        </Form>
        <p id='feedback'  className="error" ref={errorRef} hidden></p>
        <Button onClick={() => navigate("/register")}>Register</Button>
        </>
    );
}



export default Login