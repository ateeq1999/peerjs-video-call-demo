getLocalStream()

var ateegPeer = new Peer(['ateeg'],{
    path: '/',
    port: 9000,
    host: 'localhost',
});

var connWithZamo = ateegPeer.connect('zamo');

console.log(connWithZamo)

// on open will be launch when you successfully connect to PeerServer
connWithZamo.on('open', () => {
    // here you have conn.id
    connWithZamo.send(JSON.stringify({
        msg: 'conn open from zamo',
        phone: "0991612921"
    }))
    
    connWithZamo.send(JSON.stringify({
        msg: 'conn open from zamo'
    }))

})

ateegPeer.on('connection', function(conn) {
    conn.on('data', function(data){
        // Will print 'hi!'
        console.log(data);
    });
});

ateegPeer.on('socket-error', (err) => console.log(err))

function getLocalStream() {
    navigator.mediaDevices
    .getUserMedia({ video: true, audio: true })
    .then((myStream) => {
        showStream(myStream, "local")

        const call = ateegPeer.call("zamo", myStream)

        call.on('stream', (stream) => {
            showStream(stream, "remote")
        })
    })
    .catch((err) => {
        console.error(`you got an error: ${err}`);
    });
}

function showStream(stream, elementID) {
    var element = document.getElementById(elementID)
    element.srcObject = stream
    element.play()
    element.muted
}
  