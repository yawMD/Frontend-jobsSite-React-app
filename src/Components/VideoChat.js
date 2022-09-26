import React, { useEffect, useState, useRef } from "react";
import Peer from "simple-peer";
import { wrtc } from "wrtc";
import { isAuth } from "../Helpers/auth";
import callRing from "../assets/sound/long-expected-548.mp3";
function VideoChat(props) {
  const myVideo = useRef();
  const otherVideo = useRef();
  const audioRef = useRef();
  const connectionRef = useRef();

  const [socket, setSocket] = useState(null);
  const [stream, setStream] = useState(null);
  const [call, setCall] = useState(null);
  const [other, setOther] = useState(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [incomingCall, setIncomingCall] = useState(false);
  const [inited, setInited] = useState(false);
  const _ping = new Audio(callRing);

  useEffect(() => {
    if (props.other) {
      setOther(props.other);
      callUser(props.other);
    }
  }, [props.other]);

  useEffect(() => {
    if (props.socket) {
      setSocket(props.socket.current);
    }
  }, [props.socket]);

  useEffect(() => {
    // console.log({stream})
  
    return () => {
      
    }
  }, [stream])
  

  useEffect(() => {
    if (socket) {
      socket.on("call-user", (data) => {
        // console.log(data);
        setCall({
          isReceived: true,
          sender: data.sender,
          signal: data.signal,
        });
      });
      socket.on("call-ended", (data) => {
        console.log('here', data)
        endCall()
      });
      socket.on("end-call", (data) => {
        console.log('here', data)
        endCall()
      });
    }
  }, [socket]);

  useEffect(() => {
    if (call) {
      if (call.isReceived && !callAccepted) {
        if (inited) answerCall();
        audioRef.current.play();
        setIncomingCall(true);
        console.log("playing");
      } else if (callAccepted) {
        // answerCall()
        setIncomingCall(false);
        console.log("pausing");
        audioRef.current.pause();
      }
    }
  }, [call, callAccepted]);

  const callUser = async (other) => {
    if (socket) {
      let _stream = null;
      if (!stream) {
        const currentStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(currentStream);
        _stream = currentStream;
      } else {
        _stream = stream;
      }
      myVideo.current.srcObject = _stream;
      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream: _stream,
        wrtc,
      });
      peer.on("signal", (data) => {
        console.log("onSignal", data);
        socket.emit("call-user", {
          signal: data,
          sender: isAuth()._id,
          name: isAuth().name,
          to: other,
        });
      });
      peer.on("stream", (_stream) => {
        console.log("in stream");
        // console.log(_stream);
        otherVideo.current.srcObject = _stream;
      });
      socket.on("call-accepted", (data) => {
        setCallAccepted(true);
        console.log("signalling", data.signal);
        peer.signal(data.signal);
      });
      peer.on("error", (err) => console.log("error", err));
      connectionRef.current = peer;
    }
  };

  const answerCall = async () => {
    setInited(true);
    let _stream = null;
    if (!stream) {
      const currentStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(currentStream);
      _stream = currentStream;
    } else {
      _stream = stream;
    }
    setOther(call.sender);
    setCallAccepted(true);
    setIncomingCall(false);
    setStream(_stream)
    myVideo.current.srcObject = _stream;
    const peer = new Peer({ trickle: false, stream: _stream, wrtc });
    peer.on("signal", (data) => {
      console.log("onSignal", data);
      socket.emit("answer-call", {
        signal: data,
        to: call.sender,
        name: isAuth().name,
      });
    });
    peer.on("error", (err) => console.log("error", err));
    peer.on("stream", (__stream) => {
      console.log("in stream");
      otherVideo.current.srcObject = __stream;
    });
    console.log("signalling", call.signal);
    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  const endCall = () => {
    setCallEnded(true);
    console.log('ending call', call);
    call && socket.emit("end-call", {
      to: call.sender,
    });
    console.log(stream)
    stream && stream.getTracks().forEach(function(track) {
      track.stop();
    });
    window.location.reload()
    // myVideo.current.destroy();
    // otherVideo.current.destroy();
    // connectionRef.current.destroy();
    // setOther(null);
    setStream(null);
    // setCall(null);
    // setCallAccepted(false);
    // setIncomingCall(false);
  };

  return (
    <>
      <audio src={callRing} loop ref={audioRef} />
      {other && (
        <div
          className={` p-3 md:p-12 h-screen w-full top-0 left-0 fixed z-50 bg-black bg-opacity-50 overflow-hidden `}
        >
          <div className="relative h-full w-full">
            <div className="h-full w-full rounded-3xl bg-black flex relative flex-col">
              <video
                className="h-full w-full top-0 left-0 rounded-3xl absolute"
                playsInline
                autoPlay
                ref={otherVideo}
              />
              <div className="flex flex-row flex-row-reverse">
                <div className="m-6 rounded-2xl bg-black h-48 w-48 shadow-lg transition shadow-neutral-700 hover:shadow-neutral-800 relative">
                  <video
                    className="h-full w-full top-0 left-0 absolute"
                    playsInline
                    muted
                    autoPlay
                    ref={myVideo}
                  />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 bg-white w-full">
                {callAccepted && !callEnded && (
                  <div className="transition m-auto absolute bottom-0 rounded-b-3xl w-full h-32 bg-white bg-opacity-30 text-center flex justify-center align-center">
                    <div className="tooltip my-auto">
                      <button className="bg-white bg-opacity-30 h-14 w-14 text-lg  font-bold mx-2 my-auto ring-0 text-white rounded-full">
                        <span className="font-light tooltiptext">Hold</span>
                        <span className="fa-solid fa-record-vinyl" />
                      </button>
                    </div>
                    <div className="tooltip my-auto">
                      <button className="bg-white bg-opacity-30 h-14 w-14 text-lg  font-bold mx-2 my-auto ring-0 text-white rounded-full">
                        <span className="font-light tooltiptext">Mute</span>
                        <span className="fa-solid fa-microphone-slash" />
                      </button>
                    </div>
                    <div className="tooltip my-auto">
                      <button
                        onClick={endCall}
                        className="bg-red-500 animate-none hover:animate-pulse text-xl p-6 font-bold mx-2 my-auto ring-0 text-white rounded-3xl"
                      >
                        <span className="font-light tooltiptext">End Call</span>
                        <span className="fa-solid fa-phone-slash" />
                      </button>
                    </div>
                    <div className="tooltip my-auto">
                      <button className="bg-white bg-opacity-30 h-14 w-14 text-lg  font-bold mx-2 my-auto ring-0 text-white rounded-full">
                        <span className="font-light tooltiptext">
                          Toggle Screen
                        </span>
                        <span className="fa-solid fa-random" />
                      </button>
                    </div>
                    <div className="tooltip my-auto">
                      <button className="bg-white bg-opacity-30 h-14 w-14 text-lg  font-bold mx-2 my-auto ring-0 text-white rounded-full">
                        <span className="font-light tooltiptext">
                          Hide Call
                        </span>
                        <span className="fa-solid fa-eye" />
                      </button>
                    </div>
                  </div>
                )}
                {!callAccepted && !callEnded && (
                  <div className="transition m-auto absolute bottom-0 rounded-b-3xl w-full h-32 bg-white bg-opacity-30 text-center flex justify-center align-center">
                    <div className="p-3 relative h-full flex justify-center align-center">
                      <button className="absolute top-6 bg-blue-500 animate-ping text-xl p-6 font-bold mx-2 my-auto ring-0 text-white rounded-3xl">
                        <span className="fa-solid fa-phone" />
                      </button>
                      <button className="absolute top-6 bg-blue-500 anim ate-ping text-xl p-6 font-bold mx-2 my-auto ring-0 text-white rounded-3xl">
                        <span className="fa-solid fa-phone" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {incomingCall && (
        <div className="fixed top-6 ring-1 ring-sky-300 right-6 bg-white shadow-lg rounded-full p-1 font-semibold text-lg text-sky-600 px-4 flex">
          <div className="my-auto relative h-20 w-20">
            <div className="my-2 absolute bg-emerald-500 text-white h-16 w-16 rounded-full flex flex-col animate-ping justify-center align-center"></div>
            <div className="my-2 absolute bg-emerald-500 text-white h-16 w-16 rounded-full flex flex-col justify-center align-center">
              <button onClick={answerCall}>
                <span className="fa-solid fa-phone"></span>
              </button>
            </div>
          </div>
          <div className="my-auto">You have a call from ..........</div>
        </div>
      )}
    </>
  );
}

export default VideoChat;
