import React from "react";
import "../Pages/Home/index.css";

function Background(props) {
  return (
    <div className="z-10">
      <div className="absolute w-full bg-black h-screen top-0 left-0 bg-opacity-50"></div>
    </div>
  );
}

export default Background;
