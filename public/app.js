// get video/voice stream
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
  }).then(gotMedia).catch((error) => {console.log(error)})

  function gotMedia (localStream) {
    var localVideo = document.querySelector('video')

    if ('srcObject' in localVideo) {
      localVideo.srcObject = localStream
    } else {
      localVideo.src = window.URL.createObjectURL(localStream) // for older browsers
    }

    localVideo.play()
    
    localVideo.muted
    
    var ateeg = new SimplePeer({ initiator: true, stream: localStream }) // you don't need streams here
    var zamo = new SimplePeer()

    ateeg.on('signal', data => {
      console.log(data)
      zamo.signal({...data, user: "ateeg" })
    })

    zamo.on('stream', stream => {
      // got remote video stream, now let's show it in a video tag
      var reomte = document.getElementById('remote')
      // var video = document.querySelector('video')

      if ('srcObject' in reomte) {
        reomte.srcObject = stream
      } else {
        reomte.src = window.URL.createObjectURL(stream) // for older browsers
      }

      reomte.play()
      
      reomte.muted
    })
  }