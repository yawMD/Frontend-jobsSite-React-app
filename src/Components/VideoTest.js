import React, { useRef, useEffect } from "react";
import Peer from "simple-peer";

function VideoTest(props) {
  const peerOneVid = useRef(),
    peerTwoVid = useRef();
  useEffect(async () => {
    // then, anytime later...
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    var peer1 = new Peer({ initiator: true, trickle: false, stream }); // you don't need streams here
    var peer2 = new Peer({ initiator: false, trickle: false, stream });

    peer1.on("signal", (data) => {
      console.log("signal received 1");
      peer2.signal(data);
    });

    peer2.on("signal", (data) => {
      console.log("signal received 2");
      peer1.signal(data);
    });

    peer2.on("stream", (stream) => {
      console.log("stream received 2");
      // got remote video stream, now let's show it in a video tag
      peerTwoVid.current.srcObject = stream;
    });

    peer1.on("stream", (stream) => {
      console.log("stream received 2");
      // got remote video stream, now let's show it in a video tag
      peerOneVid.current.srcObject = stream;
    });
  }, []);
  return (
    <div className="fixed z-50 h-screen w-screen bg-black">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <video ref={peerOneVid} muted autoPlay />
        </div>
        <div>
          <video ref={peerTwoVid} muted autoPlay />
        </div>
      </div>
    </div>
  );
}

export default VideoTest;
