import { PeerServer } from 'peer';
// import cuid from 'cuid';

const peerServer = new PeerServer({
    debug: true,
    path: '/',
    port: 9000,
    allow_discovery: true,
    // generateClientId: cuid(),
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
