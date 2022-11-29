import express from 'express';
import { ExpressPeerServer, PeerServer } from 'peer';
import path from 'path';
import cuid from 'cuid';

const app = express();
app.use(express.static('public'))

// app.get('/answer', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, './public/index.html')));
// app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, './public/index.html')));

// app.get('/answer', (req, res, next) => res.send('Hello world!'));

const server = app.listen(8000, () => console.log(`app listening on port http://localhost:8000`));

// const ID = cuid()

// console.log(ID)

// const peerServer = ExpressPeerServer(server, {
//     debug: true,
//     path: '/peer-app',
//     allow_discovery:true,
// });

// app.use('/peerjs', peerServer);

const peerServer = new PeerServer({
    debug: true,
    path: '/',
    port: 9000,
    allow_discovery: true,
});

peerServer.on('connection', (client) => {
    console.log("client ", client.id, "connected")
});

peerServer.on('disconnect', (client) => {
    console.log("client ", client.id, "disconnected")
});

peerServer.on('message', (client) => {
    console.log(client.token)
    // console.log(client.socket._events)
});

peerServer.on('error', (client) => {
    console.log(client.id)
});
