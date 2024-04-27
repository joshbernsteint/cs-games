import express from 'express'
import routes from './routes/index.js'

import { fileURLToPath } from 'url';
import path, { dirname } from 'path'
import session from 'express-session';
import cookieParser from 'cookie-parser';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();




app.use(express.static(path.join(__dirname,"public/build/")));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
    name: 'LoginState',
    secret: 'Idk man just have it be something good',
    resave: false,
    saveUninitialized: false
  }));
app.use('/admin', async (req,res, next) => {
    if(req.session.user && req.session.user.username === "admin"){
        return next();
    }
    else if(req.cookies.LoginState && !req.session.user){
        res.clearCookie("LoginState");
    }
    res.redirect('/login');
});
app.use('/', async (req,res, next) => {
    // console.log(`${req.originalUrl} - ${req.method}`);
    next();
})
app.use("/", routes);



app.listen(process.env.PORT || 8080, () => {
    console.log("Listening on http://localhost:8080");
})