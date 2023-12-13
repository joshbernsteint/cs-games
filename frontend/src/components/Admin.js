import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


function Admin({username, ...props}){
    const navigate = useNavigate();
    const [stage, setStage] = useState(0);
    useEffect(() => {
        if(username !== "admin"){
            navigate("/");
        }
        async function getData(){
            const stageGet = await axios.get("/admin5698712");
            setStage(stageGet.data.currentStage);
        }
        getData();
    }, []);

    return (
        <>
            Current Stage: {stage}
            <br/>
            <Button onClick={async () => {
                const {data} = await axios.get("/admin5698712/advance");
                setStage(data.newStage);
            }}>Advance Questions</Button><br/><br/>
            <Button onClick={async () => {
                const {data} = await axios.get("/admin5698712/hideall");
                setStage(data.newStage);
            }}>Reset Questions</Button>
        </>
    );
}

export default Admin;