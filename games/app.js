import express from 'express'
import routes from './routes/index.js'

import { fileURLToPath } from 'url';
import path, { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();




app.use(express.static(path.join(__dirname,"public/build/")));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/", routes);



app.listen(process.env.PORT || 8080, () => {
    console.log("Listening on http://localhost:8080");
})