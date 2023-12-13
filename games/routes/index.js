import { Router } from "express";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path'
import { createUser,getUserById,loginUser } from "../data/users.js";
import questions from './questions.js'
import { answerQuestion, createTeam, findTeamOfUser, getAllTeams, getDoneQuestions, joinTeam } from "../data/teams.js";


const [parsedQuestions,parsedWithAnswers] = (() => {
    const ret = [];
    const ret2 = [];
    for (let i = 0; i < questions.length; i++) {
        const e1 = questions[i];
        const line = [];
        const line2 = [];
        for (let j = 0; j < e1.length; j++) {
            const e2 = e1[j];
            line.push({id: `${i}-${j}`, title: e2.title, html: e2.html, answer: e2.answer});
            line2.push({id: `${i}-${j}`, title: e2.title, html: e2.html});

        }
        ret.push(line)
        ret2.push(line2);
    }
    return [ret2, ret];
})();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = Router();

let currentStage = 0;
const maxStage = 4;

router.post("/register", async (req,res) => {
    try {
        const body = req.body;
        const result = await createUser(body.username, body.password);
        res.json({...result, error: false});
    } catch (error) {
        res.json({error: true, msg: error.toString()});
    }
});

router.post("/login", async (req,res) => {
    try {
        const body = req.body;
        const result = await loginUser(body.username, body.password);
        res.json({...result, error: false});
    } catch (error) {
        res.json({error: true, msg: "Incorrect username or password"});
    }
});

router.get("/admin5698712/advance", async (req,res) => {
    currentStage++;
    if(currentStage > maxStage){
        res.json({newStage: maxStage});
    }
    else{
        res.json({newStage: currentStage});
    }
});

router.get("/admin5698712/hideall", async (req,res) => {
    currentStage = 0;
    res.json({newStage: 0});
});

router.get("/admin5698712", async (req,res) => {
    res.json({currentStage: currentStage});
});

router.get("/question_src", async (req,res) => {
    if(currentStage > 0){
        res.json({questions: parsedQuestions.slice(0,currentStage)});
    }
    else{
        res.json({questions: []});
    }
});


router.post("/teams/create", async (req,res) => {
    try {
        const body = req.body;
        const result = await createTeam(body.teamName, body.password, body.username);
        res.json({...result, error: false});
    } catch (error) {
        res.json({error: true, msg: error.toString()});
    }
});

router.post("/teams/join", async (req,res) => {
    try {
        const body = req.body;
        const result = await joinTeam(body.teamName, body.password, body.username);
        res.json({...result, error: false});
    } catch (error) {
        res.json({error: true, msg: error.toString()});
    }
});

router.get("/get_teams", async (req,res) => {
    res.json({teams: await getAllTeams()});
});

router.post("/teams/get_user", async (req,res) => {
    try {
        const body = req.body;
        const team = await findTeamOfUser(body.username);
        if(!team) throw "User does not have a team";
        else res.json({...team, error: false});
    } catch (error) {
        res.json({error: true, msg: error.toString()});
    }
});

router.post("/questions/attempt/:level/:teamId", async (req,res) => {
     try {
        const body = req.body;
        const row = parsedWithAnswers[Number(req.params.level)];
        let answer;
        for (let i = 0; i < row.length; i++) {
            const element = row[i];
            if(element.id === body.id){
                answer = element.answer;
            }
        }
        if(!answer) answer = [];

        if(answer.includes(body.answer)){
            await answerQuestion(req.params.teamId,body.id);
            res.json({correct: true});
        }
        else{
            res.json({correct: false});
        }
     } catch (error) {
        res.json({error: true, msg: error.toString()});

     }
}); 

router.get("/questions/done/:teamId", async (req,res) => {
    const data = await getDoneQuestions(req.params.teamId);
    res.json({done: data});
});

router.get("/admin5698712/team_rank", async (req,res) => {
    try {
        const allData = await getAllTeams();
        const rank = [];
        for (let j = 0; j < allData.length; j++) {
            const el = allData[j];
            const complete = el.finishedQuestions.length;
            const memberNames = [];
            for (let i = 0; i < el.members.length; i++) {
                const userData = await getUserById(el.members[i]);
                memberNames.push(userData.username);
            }
            
            rank.push({team: el.teamName, complete: complete, members: memberNames});
        }
        rank.sort((x,y) => {
            return y.complete - x.complete;
        });
        res.json({ranks: rank});
    } catch (error) {
        res.json({error: true, msg: error.toString()});
    }
});

router.get("*", async (req,res) => {
    res.sendFile(path.join(__dirname,'../public/build/index.html'));
});

export default router;