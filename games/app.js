import express from 'express'
import routes from './routes/index.js'

import { fileURLToPath } from 'url';
import path, { dirname } from 'path'
import { config } from 'dotenv';
import session from 'express-session';
import cookieParser from 'cookie-parser';
config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const HTML_PATH = path.join(__dirname,'../frontend/build/index.html');


app.use(express.static(path.join(__dirname,"../frontend/build/")));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
    name: 'LoginState',
    secret: 'Idk man just have it be something good',
    resave: false,
    saveUninitialized: false
  }));
app.use('/api/admin', async (req,res, next) => {
    if(req.session.user && req.session.user.username === "admin"){
        return next();
    }
    else if(req.cookies.LoginState && !req.session.user){
        res.clearCookie("LoginState");
    }
    res.redirect('/login');
});
app.use("/api", routes);
app.get("*", async (req,res) => {
    res.sendFile(HTML_PATH);
});



app.listen(process.env.PORT || 8080, () => {
    console.log("Listening on http://localhost:8080");
})