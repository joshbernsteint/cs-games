import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function formatDate(timestamp){
    const d = new Date(timestamp);
    const h = String(d.getHours()).padStart(2,'0');
    const m = String(d.getMinutes()).padStart(2,'0');
    const s = String(d.getSeconds()).padStart(2,'0');
    return `${h}:${m}:${s}`;
}

function Admin({username, ...props}){

    const navigate = useNavigate();
    const [stage, setStage] = useState(0);
    const [rank, setRank] = useState([]);


    async function getRanks(){
        const {data} = await axios.get("/admin/team_rank");
        setRank(data.ranks);
    }

    useEffect(() => {
        if(username !== "admin"){
            navigate("/");
        }
        async function getData(){
            const stageGet = await axios.get("/admin");
            setStage(stageGet.data.currentStage);
        }
        getData();
    }, []);

    return (
        <>
            Current Stage: {stage}
            <br/>
            <Button onClick={async () => {
                const {data} = await axios.get("/admin/advance");
                setStage(data.newStage);
            }}>Advance Questions</Button><br/><br/>
            <Button onClick={async () => {
                const {data} = await axios.get("/admin/hideall");
                setStage(data.newStage);
            }}>Reset Questions</Button><br/>
            <Button onClick={async () => {
                console.log('making request...');
                await axios.get("/admin/reset_questions");
            }}>Reload All Questions From File</Button>
            <br/>
            <br/>
            <Button onClick={async () => getRanks()}>Get Team Rank List</Button>
            <ol style={{listStylePosition: "inside"}}>
            {
                rank.map((el,i) => (
                    <li key={i}>
                        <b>{el.team}: {el.complete}</b>&nbsp;<i>({formatDate(el.lastUpdated)})</i>
                        <ul>
                            {
                                el.members.map((e2,i2) => (
                                    <li key={`${i}-${i2}`}>{e2}</li>
                                ))
                            }
                        </ul>
                    </li>
                ))
                }
            </ol>
        </>
    );
}

export default Admin;