import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { isAuth, signout } from "../Helpers/auth";

function Adminbar(props) {
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(true);
  return (
    <div
      className={`${
        !showMenu && "h-screen z-50 w-full bg-black bg-opa ity-20"
      }`}
    >
      <div
        className="cursor-pointer sm:block md:hidden fixed m-2 left-0 top-0 rounded-lg text-center shadow bg-gray-200 z-50"
        onClick={() => setShowMenu(!showMenu)}
      >
        <div className="bg-gray-600 rounded">
          <span className="fa fa-bars text-lg inline-block align-middle my-1 text-white mx-3"></span>
        </div>
      </div>
      <div
        className={`shadow-xl h-screen overflow-y-auto p-4 bg-white ${
          showMenu
            ? " w-full hidden md:block"
            : "w-full md:w-1/6 fixed left-0 top-0 z-40 block"
        } `}
      >
        <div className="h-2 md:h-16"></div>
        <div className="w-full rounded text-center md:py-3 md:pl-2 text-gray-500">
          <h2 className="text-3xl font-bold">Filly Jobs</h2>
        </div>
        <div className="h-5"></div>
        <div className="w-full rounded py-3 px-2 bg-gray-900">
          <h2 className="text-gray-200 capitalize font-semibold">
            {isAuth() && isAuth().name}
          </h2>
          <div className="py-2">
            <hr className="w-24 border-gray-500" />
          </div>
          <span className="text-gray-200 hover:text-gray-300 font-semibold text-sm">
            Dashboard
          </span>
        </div>
        <Link to="/admin/home">
          <div className="w-full rounded hover:bg-gray-200 py-4 pl-2 my-2 uppercase">
            <h2 className="text-gray-500 text-sm font-semibold tracking-widest">
              <span>Home</span>
            </h2>
          </div>
        </Link>
        {/* <Link to="/users">
          <div className="w-full rounded hover:bg-gray-200 py-4 pl-2 my-2 uppercase">
            <h2 className="text-gray-500 text-sm font-semibold tracking-widest"><span>
              Administrators</span>
            </h2>
          </div>
        </Link> */}
        <Link to="/admin/categories">
          <div className="w-full rounded hover:bg-gray-200 py-4 pl-2 my-2 uppercase">
            <h2 className="text-gray-500 text-sm font-semibold tracking-widest">
              <span>Categories</span>
            </h2>
          </div>
        </Link>
        <Link to="/admin/services">
          <div className="w-full rounded hover:bg-gray-200 py-4 pl-2 my-2 uppercase">
            <h2 className="text-gray-500 text-sm font-semibold tracking-widest">
              <span>Services</span>
            </h2>
          </div>
        </Link>
        <Link to="/admin/users">
          <div className="w-full rounded hover:bg-gray-200 py-4 pl-2 my-2 uppercase">
            <h2 className="text-gray-500 text-sm font-semibold tracking-widest">
              <span>Registered Users</span>
            </h2>
          </div>
        </Link>
        <Link to="/admin/jobs">
          <div className="w-full rounded hover:bg-gray-200 py-4 pl-2 my-2 uppercase">
            <h2 className="text-gray-500 text-sm font-semibold tracking-widest">
              <span>Job Postings</span>
            </h2>
          </div>
        </Link>
        <div
          className="w-full rounded hover:bg-gray-200 py-4 pl-2 my-2 uppercase cursor-pointer"
          onClick={() => {
            signout();
            history.push("/home");
            // window.location.reload();
          }}
        >
          <h2 className="text-gray-500 text-sm font-semibold tracking-widest">
            <span>
              <i className="fa fa-sign-out"></i> &nbsp; Logout
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Adminbar;
