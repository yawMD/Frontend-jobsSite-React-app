import React from "react";
import { Link } from "react-router-dom";
import { isAuth } from "../Helpers/auth";

export default function UserMenu() {
  return (
    <div className="w-full ring-1 ring-gray-200 m-0 p-2">
      <div className="container m-auto flex flex-row align-center justify-center">
        <p className="m-auto px-2 font-bold text-lg">
          {isAuth() && isAuth().name}
        </p>
        <span className="m-auto px-2 font-light text-gray-300">/</span>
        <p className="m-auto px-2 font-light text-gray-400 capitalize text-md">
          {isAuth() && isAuth().status}
        </p>
        <div className="flex-grow" />
        <Link to="/me/home">
          <div className="mr-4 h-full m-auto text-sky-600 flex flex-col justify-center">
            <span className="fa fa-home"></span>
          </div>
        </Link>
        <Link to="/me/settings">
          <div className="w-12 h-12 rounded-full bg-sky-600 hover:bg-sky-700 transition cursor-pointer text-white flex flex-col justify-center">
            <span className="fa fa-user-cog"></span>
          </div>
        </Link>
      </div>
    </div>
  );
}
