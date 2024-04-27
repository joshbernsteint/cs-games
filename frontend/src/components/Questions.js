import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Button, Container, Row, Col, Card,Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';





function Questions(props){

    const questions = props.questions;
    const [curQuestion, setQuestion] = useState(undefined);
    const [finishedQuestions, setFinishedQuestions] = useState([]);
    
    async function refresh(){
        try {
            const {data} = await axios.get("/api/question_src");
            props.setQuestions(data.questions);

            if(props.teamData){
                const doneQuestions = await axios.get(`/api/questions/done/${props.teamData._id}`);
                setFinishedQuestions(doneQuestions.data.done);

            }
          } catch (error) {
            console.log(error);
          }
    }

    useEffect(() => {
      if(!curQuestion){
          refresh();
      }
    }, [curQuestion]);

    function Question({title,id, html}){

        const [errorShow, setEShow] = useState(false);


        async function handleSubmit(e){
            const form = e.currentTarget;
            const ans = form[0].value.trim();
            e.preventDefault();
            const {data} = await axios.post(`/api/questions/attempt/${curQuestion.level}/${props.teamData._id}`, {answer: ans, id: id});
            // console.log(data);
            if(!data.correct){
                setEShow(true);
    
            }
            else{
                // console.log(data);
                setQuestion(undefined);
                setEShow(false);

            }
        }


        return (
           <div style={{padding: "2rem"}}>
                <div style={{textAlign: "left"}}>
                    <Button variant="warning" onClick={() => setQuestion(undefined)}>Back to All Questions</Button>
                </div>
                <div style={{listStylePosition: "inside"}}>
                    <h1>{title}</h1>
                    <div style={{width: "90vw", textAlign: "center", justifyContent: "center", alignItems: "center",margin: "0 auto"}} dangerouslySetInnerHTML={{__html: html}} />
                    <Form onSubmit={handleSubmit} style={{paddingTop: "3rem", textAlign: "center", width: "100%"}}>
                        <Form.Group className="mb-3" controlId="answerInput">
                            <Form.Label style={{display: "inline-block", paddingRight: "1rem", fontWeight: "bold"}}>Input your Answer Here: </Form.Label>
                            <Form.Control type="text" placeholder="Your Answer" style={{display: "inline-block", width: "20%", paddingLeft: "1rem", paddingRight: "1rem"}}/>
                            <Button variant='success' type='submit' style={{marginLeft: "1rem"}}>Submit</Button>
                        </Form.Group>
                            <span id='feedback' className='error' style={{textAlign: "center"}} hidden={!errorShow}>Nope!</span>
                    </Form>
                </div>
           </div>
        );
    }



    const navigate = useNavigate();

    return (
        (questions.length === 0) ? (
        <>
            {
                (!props.teamData) ? (
                    <>
                    <h1 style={{paddingTop: "5rem"}}>The game has not started yet, sit tight! Find a team if you haven't already!</h1>
                    <Button variant='success' size='lg' onClick={() => {navigate("/teams")}}>Create/Join Team</Button>
                    </>
                ) : 
                    (
                        <>
                        <h1>We'll be Starting Soon!</h1>
                        <Button onClick={refresh} variant='success'>Refresh Page</Button>
                        </>
                    )
            }
            
             
        </>
        ) : (
                (!curQuestion) ? 
                    (<Container style={{padding: "2rem", width: "100%"}}>
                    <h1>Score: {finishedQuestions.length}</h1>
                    {
                        questions.map((el,i) => (
                            <Row key={i} style={{paddingBottom: "1rem"}}>
                                {
                                    el.map((e2,i2) => {
                                        // console.log(finishedQuestions);
                                        const complete = finishedQuestions.includes(e2.id);
                                        return (
                                        <Col key={`${i}=${i2}`}>
                                                <Card style={{ width: '18rem' }}>
                                                <Card.Body>
                                                    <Card.Title>{e2.title}</Card.Title>
                                                    <Card.Text>
                                                        {
                                                            (complete) ? ("DONE!") : ("")
                                                        }
                                                    </Card.Text>
                                                    <Button onClick={() => {setQuestion({...e2, level: i})}} hidden={complete}>Try</Button>
                                                </Card.Body>
                                                </Card>
                                        </Col>
                                    )})
                                }
                            </Row>
                        ))
                    }
                    <Row style={{textAlign: "center"}}><Button onClick={refresh} variant='success' style={{width: "25%"}}>Refresh Page</Button></Row>
                </Container>)
                : (<Question title={curQuestion.title} html={curQuestion.html} id={curQuestion.id}/>) 
        )
    );
}

export default Questions;