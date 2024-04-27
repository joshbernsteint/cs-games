import bcrypt from 'bcryptjs'
import { users } from "../config/mongoCollections.js";
import {ObjectId} from 'mongodb'

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


async function createUser(username, password){
    const name = checkAndTrim(username, "username");
    const psswrd = checkAndTrim(password, "password");
    const allUsers = await getAllUsers();
    allUsers.forEach(el => {
        if(el.username === name) throw "username is already taken";
    });

    const hashed = await bcrypt.hash(psswrd,saltRounds);

    const result = {
        username: name,
        password: hashed
    };

    const usersCollection = await users();
    const insert_result = await usersCollection.insertOne(result);
    if(!insert_result.acknowledged || !insert_result.insertedId){
      throw "Error: User could not be created";
    }
  
    return {insertedUser: true, username: name};
}

async function loginUser(username, password){
    const name = checkAndTrim(username, "username");
    const psswrd = checkAndTrim(password, "password");
    const allUsers = await getAllUsers();
    for (let i = 0; i < allUsers.length; i++) {
        const element = allUsers[i];
        if(element.username === name){
            if(!(await bcrypt.compare(psswrd, element.password))) throw "Incorrect username or password";
            else return {loggedIn: true, ...element};
        }
    }
    throw 'Incorrect username or password';
}


async function getAllUsers(){
    const usersCollection = await users();
    const all = await usersCollection.find({}).toArray();
    if(!all) throw "Error: Could not find any users";
    return all;
  }
  
async function getUser(username){
    const name = checkAndTrim(username, "username");
    const usersCollection = await users();
    const getResult = await usersCollection.findOne({username: name});
    if(getResult === null) throw "user could not be found";
    return getResult;
}

async function getUserById(userId){
    const id = checkAndTrim(userId, "userId");
    if(!ObjectId.isValid(id)) throw 'userId must be a valid ObjectId';
    const usersCollection = await users();
    const getResult = await usersCollection.findOne({_id: new ObjectId(id)});
    if(getResult === null) throw "user could not be found";
    return getResult;
}


export{
    createUser,
    loginUser,
    getUser,
    getUserById,
}