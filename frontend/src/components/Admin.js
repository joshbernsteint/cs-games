import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from 'axios';



function Admin({username, ...props}){

    const navigate = useNavigate();
    const [stage, setStage] = useState(0);
    const [rank, setRank] = useState([]);


    async function getRanks(){
        const {data} = await axios.get("/admin5698712/team_rank");
        setRank(data.ranks);
    }

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
            <br/>
            <br/>
            <Button onClick={async () => getRanks()}>Get Team Rank List</Button>
            <ol style={{listStylePosition: "inside"}}>
            {
                rank.map((el,i) => (
                    <li key={i}>
                        <b>{el.team}</b>
                    </li>
                ))
                }
            </ol>
        </>
    );
}

export default Admin;