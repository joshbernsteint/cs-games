import bcrypt from 'bcryptjs'
import { teams } from "../config/mongoCollections.js";
import { getUser } from './users.js';
import { ObjectId } from 'mongodb';

const saltRounds = 5;
function checkAndTrim(str,arg_name){
    if(typeof str !== "string"){
        throw `Error: ${arg_name} must exist and be a string`;
    }
    const trimmed = str.trim();
    if(trimmed.length === 0){
        throw `Error: ${arg_name} cannot just be empty spaces`;
    }

    return trimmed;
}

async function createTeam(teamName, password, username){
    const name = checkAndTrim(teamName,"teamName");
    const u_name = checkAndTrim(username, "username");
    const psswrd = checkAndTrim(password, "password");

    const allTeams = await getAllTeams();
    allTeams.forEach(el => {
        if(el.teamName === name) throw "teamName is already taken";
    });

    const thisUser = await getUser(u_name);
    const hashed = await bcrypt.hash(psswrd,saltRounds);

    const result = {
        teamName: name,
        password: hashed,
        members: [thisUser._id.toString()],
        finishedQuestions: [],
        lastUpdated: Date.now(),
    };

    const teamsCollection = await teams();
    const insert_result = await teamsCollection.insertOne(result);
    if(!insert_result.acknowledged || !insert_result.insertedId){
      throw "Error: Team could not be created";
    }
  
    return {insertedUser: true, teamName: name, _id: insert_result.insertedId.toString()};
}

async function joinTeam(teamName, password, username){
    const tName = checkAndTrim(teamName, "teamName");
    const psswrd = checkAndTrim(password, "password");
    const name = checkAndTrim(username, "username");

    const isThere = await getUser(name);
    if(!isThere) throw "User could not be found";


    let letFound = false;
    const allTeams = await getAllTeams();
    for (let i = 0; i < allTeams.length; i++) {
        const element = allTeams[i];
        if(element.teamName === tName){
            letFound = true;
            if(!(await bcrypt.compare(psswrd, element.password))) throw "Incorrect password or name";
            else if(element.members.length + 1 > 3) throw "Team is already at capacity";
            else break;
        }
    }

    if(!letFound){
        throw "Incorrect password or name";
    }

    const teamsCollection = await teams();
    const updateResult = await teamsCollection.findOneAndUpdate({teamName: tName}, {$push: {members: isThere._id.toString()}}, {returnDocument: "after"});
    return updateResult;

}

async function getAllTeams(){
    const teamsCollection = await teams();
    const all = await teamsCollection.find({}).toArray();
    if(!all) throw "Error: Could not find any teams";
    return all;
}

async function answerQuestion(teamId, questionId){
    const id = checkAndTrim(teamId, "teamId");
    if(!ObjectId.isValid(id)) throw 'teamId must be a valid ObjectId';
    const question_id = checkAndTrim(questionId, "questionId");
    const teamsCollection = await teams();
    const updateResult = await teamsCollection.findOneAndUpdate({_id: new ObjectId(id)}, {$push: {finishedQuestions: question_id}, $set: {lastUpdated: Date.now()}}, {returnDocument: "after"});
    return updateResult;
}

async function getDoneQuestions(teamId){
    const id = checkAndTrim(teamId, "teamId");
    if(!ObjectId.isValid(id)) throw 'teamId must be a valid ObjectId';
    const teamsCollection = await teams();
    const done = await teamsCollection.findOne({_id: new ObjectId(id)});
    // console.log(done);
    return done.finishedQuestions;
}

async function findTeamOfUser(username){
    const user = await getUser(username);
    const allTeams = await getAllTeams();
    for (let i = 0; i < allTeams.length; i++) {
        const team = allTeams[i];
        if(team.members.includes(user._id.toString())){
            return team;
        }
    }
    return undefined;
}

async function clearScores(){
    const allTeams = await getAllTeams();
    const teamsCollection = await teams();
    for (const team of allTeams) {
        await teamsCollection.findOneAndUpdate({_id: new ObjectId(team._id)}, {$set: {finishedQuestions: []}})
    }
    return true;
}


export{
    createTeam,
    joinTeam,
    getAllTeams,
    answerQuestion,
    getDoneQuestions,
    findTeamOfUser,
    clearScores
}
