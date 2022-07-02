import express from "express"
import path from 'path';
import { fileURLToPath } from 'url';


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static('./public'));

//make way for some custom css, js and images
app.use('', express.static(__dirname + '',));

const server = app.listen(2000, () =>{
    const port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});