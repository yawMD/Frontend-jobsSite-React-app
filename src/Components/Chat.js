import React, { useRef, useEffect } from "react";
import { io } from "socket.io-client";
import { isAuth } from "../Helpers/auth";
import audio from "../assets/sound/just-maybe-577.mp3";
import { toast, ToastContainer } from "react-toastify";

function Chat(props) {
  const socket = useRef();
  const notify = new Audio(audio);
  const play = () => {
    notify.play();
  }
  const url =
    window.location.host.indexOf("localhost") >= 0
      ? "http://localhost:1112"
      : "https://fillyapi.herokuapp.com";
  useEffect(() => {
    // console.log(url);
    if (isAuth()) {
      socket.current = io(url);
      // socket.current = io("http://localhost:1112");
      socket.current.emit("add-user", isAuth()._id);
      // console.log(socket.current.id);
      props.setRef(socket);
    }
  }, [props, url]);
  useEffect(() => {
    // console.log("sddfd");
    if (socket.current) {
      socket.current.on("message-received", (data) => {
        // console.log(data);
        props.setNewMessage(data);
        play()
        toast.info("Message from " + data.name);
      });
    }
  }, [socket, props]);
  return <ToastContainer />;
}

export default Chat;
