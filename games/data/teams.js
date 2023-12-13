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
    };

    const teamsCollection = await teams();
    const insert_result = await teamsCollection.insertOne(result);
    if(!insert_result.acknowledged || !insert_result.insertedId){
      throw "Error: Team could not be created";
    }
  
    return {insertedUser: true, teamName: name, _id: insert_result.insertedId.toString()};
}

async function joinTeam(teamId, password, username){
    const id = checkAndTrim(teamId, "teamId");
    const psswrd = checkAndTrim(password, "password");
    if(!ObjectId.isValid(id)) throw 'teamId must be a valid ObjectId';
    const name = checkAndTrim(username, "username");

    const isThere = await getUser(name);
    if(!isThere) throw "User could not be found";

    const allTeams = await getAllTeams();
    for (let i = 0; i < allTeams.length; i++) {
        const element = allTeams[i];
        if(element._id.toString() === id){
            if(!(await bcrypt.compare(psswrd, element.password))) throw "Incorrect password or id";
            else break;
        }
    }

    const teamsCollection = await teams();
    const updateResult = await teamsCollection.findOneAndUpdate({_id: new ObjectId(id)}, {$push: {members: isThere._id.toString()}}, {returnDocument: "after"});
    return updateResult;

}

async function getAllTeams(){
    const teamsCollection = await teams();
    const all = await teamsCollection.find({}).toArray();
    if(!all) throw "Error: Could not find any teams";
    return all;
}


export{
    createTeam,
    joinTeam,
    getAllTeams,
}
