import express from 'express';
import { ExpressPeerServer } from 'peer';
import path from 'path';
import cuid from 'cuid';

const app = express();
app.use(express.static('public'))

// app.get('/answer', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, './public/answer.html')));
// app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, './public/index.html')));

// app.get('/answer', (req, res, next) => res.send('Hello world!'));

const server = app.listen(9000, () => console.log(`app listening on port http://localhost:9000`));

const ID = cuid()

console.log(ID)

const peerServer = ExpressPeerServer(server, {
    debug: true,
    path: '/peer-app',
    generateClientId: "ateeg-peer-server"
});

app.use('/peerjs', peerServer);

peerServer.on('connection', (client) => {
    console.log(client)
});

peerServer.on('disconnect', (client) => {
    console.log(client)
});

peerServer.on('message', (client) => {
    console.log(client)
});

peerServer.on('error', (client) => {
    console.log(client)
});