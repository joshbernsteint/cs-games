import { useRef } from 'react';
import {Form, Button} from 'react-bootstrap';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import "../App.css"


function Register(props){

    const formRef = useRef(undefined);
    const errorRef = useRef(undefined);
    const navigate = useNavigate();
    

    async function handleSubmit(e){
        e.preventDefault();
        const form = e.currentTarget;
        const {data} = await axios.post("/register", {username: form[0].value, password: form[1].value});
        if(data.error){
            errorRef.current.innerText = data.msg;
            errorRef.current.hidden = false;

        }
        else{
            errorRef.current.innerText = "";
            errorRef.current.hidden = true;
            props.setLoggedIn(true);
        }
    }



    return (
        <>
        <h1>Register</h1>
        <Form style={{textAlign: "left", padding: "5rem"}} ref={formRef} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Input a Username</Form.Label>
                <Form.Control type="text" placeholder="Enter a username" style={{"width": "50%"}}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Input a Password</Form.Label>
                <Form.Control type="password" placeholder="Password" style={{"width": "50%"}}/>
            </Form.Group>
            <Button variant="danger" type="submit">
                Submit
            </Button>
            <p id='feedback'  className="error" ref={errorRef} hidden></p>
        </Form>
        <Button onClick={() => navigate("/login")}>Login</Button>
        </>
    );
}


export default Register