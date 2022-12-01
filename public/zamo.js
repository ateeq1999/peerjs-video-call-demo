// getLocalStream()

var zamoPeer = new Peer(['zamo'],{
    path: '/',
    port: 9000,
    host: 'localhost',
});

var connWithAteeg = zamoPeer.connect('ateeg');

console.log(connWithAteeg)

// on open will be launch when you successfully connect to PeerServer
connWithAteeg.on('open', () => {
    // here you have conn.id
    connWithAteeg.send(JSON.stringify({
        msg: 'conn open from ateeg',
        phone: "0991612921"
    }))
    
    connWithAteeg.send(JSON.stringify({
        msg: 'conn open from ateeg'
    }))

})

zamoPeer.on('connection', function(conn) {
    conn.on('data', function(data){
        // Will print 'hi!'
        console.log(data);
    });
});

zamoPeer.on('socket-error', (err) => console.log(err))

zamoPeer.on("call", (call) => {
    navigator.mediaDevices.getUserMedia({video: true, audio: true})
    .then(mystream => {
        showStream(mystream, "local")
        call.answer(mystream); // Answer the call with an A/V stream.
        call.on('stream', (stream) => {
            showStream(stream, "remote")
        })
    })
    .catch((err) => { console.log(err); });
});

function getLocalStream() {
    navigator.mediaDevices
    .getUserMedia({ video: true, audio: true })
    .then((stream) => {
        window.localStream = stream; // A
        // window.localAudio.srcObject = stream; // B
        // window.localAudio.autoplay = true; // C
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
