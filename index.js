const enableWs = require('express-ws');
const express = require('express');
const { HomeViewController } = require('./Controller/HomeViewController');
const PORT = 8080;
const app = express();
const { HOST, USER, PASSWD } = require('./config/config');
app.use(express.static(__dirname + '/public'));
enableWs(app);

function main(){

    app.listen(PORT, () => {
        console.log("app listening on port: ", PORT);
        if(!HOST || !USER || !PASSWD){
            console.error("No config set");
            process.exit(0);
        }
    });
    
    app.get('/home', async (req, res) => {
        let homeViewController = new HomeViewController(HOST, USER, PASSWD);
        let rendered = await homeViewController.render()
        res.status(200).send(rendered);
    });

    //WIP for future front
    app.ws('/ws', (ws, req) => {
        ws.on('message', mesg => {
            console.log(message);
        });
    });
};

main();