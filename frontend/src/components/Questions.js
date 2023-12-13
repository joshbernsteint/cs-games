import axios from 'axios';
import { useState } from 'react';


function Questions(props){

    const questions = props.questions;



    return (
        (questions.length === 0) ? (
        <>
            <h1 style={{paddingTop: "5rem"}}>The game has not started yet, sit tight! Find a team if you haven't already!</h1>
             
        </>
        ) : (
            <>
                let's go!
            </>
        )
    );
}

export default Questions;