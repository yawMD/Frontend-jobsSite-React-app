import React, { useState } from "react";
import "../assets/css/style.css";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { isAuth, signout } from "../Helpers/auth";
import logo from "../assets/image/logo_black.png";

function Sidebar(props) {
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const { pathname } = useLocation();
  // console.log({ pathname });
  return (
    <div
      className={`${
        !showMenu ? "h-0 md:h-screen z-50 bg-white w-0" : "h-full w-full"
      }`}
    >
      {isAuth() && !(isAuth().type === "admin") ? null : (
        <Redirect to={`/login?r=err&v=2/&rdr=${pathname}`} />
      )}
      <div
        className="cursor-pointer sm:block md:hidden m-2 fixed right-0 top-0-lg text-center z-50"
        onClick={() => setShowMenu(!showMenu)}
      >
        {showMenu ? (
          <div className="ring-1 ring-sky-400 text-sky-600 rounded p-1 px-2 m-2 shadow">
            <span
              className={`fa fa-close text-2xl inline-block align-middle m-1`}
            ></span>
          </div>
        ) : (
          <div className="ring-1 ring-sky-400 text-sky-600 rounded p-1 px-2 m-2 shadow">
            <span
              className={`fa fa-bars text-2xl inline-block align-middle m-1`}
            ></span>
          </div>
        )}
      </div>
      <div
        className={`ring-1 ring-gray-200 shadow h-screen overflow-y-auto flex flex-col text-sky-600 ${
          showMenu
            ? " w-full md:w-1/6 fixed left-0 top-0 z-40 sm:hidden md:flex"
            : " w-0 md:w-1/6 fixed left-0 top-0 z-40 hidden md:flex"
        } `}
      >
        <Link to="/home">
          <div className="w-full text-center uppercase transition duration-500 ease-in-out">
            <div className="w-full border-b-2 border-gray-200 text-center py-3 pl-2 text-sky-500 m-auto">
              {/* <h2 className="text-3xl font-bold text-center"> */}
              <img src={logo} className="h-16 ml-6" />
              {/* </h2> */}
            </div>
          </div>
        </Link>
        <Link onClick={() => setShowMenu(!showMenu)} to="/me/home">
          <div className="w-full hover:bg-sky-100 text-sky-600 text-lg p-4 pt-8 transition duration-500 ease-in-out">
            <h2 className="text-base font-semibold tracking-wider">
              <span>
                <i className="fa fa-user"></i> &nbsp;<span className="text-gray-500 text-sm font-light"> Profile</span>
              </span>
            </h2>
          </div>
        </Link>
        {isAuth() && isAuth().status === "user" && (
          <Link onClick={() => setShowMenu(!showMenu)} to="/me/portfolio">
            <div className="w-full hover:bg-sky-100 text-sky-600 text-lg p-4 transition duration-500 ease-in-out">
              <h2 className="text-base font-semibold tracking-wider">
                <span>
                  <i className="fa fa-address-book"></i> &nbsp;<span className="text-gray-500 text-sm font-light"> Portfolio</span>
                </span>
              </h2>
            </div>
          </Link>
        )}
        {isAuth() && isAuth().status === "service" && (
          <Link onClick={() => setShowMenu(!showMenu)} to="/me/gallery">
            <div className="w-full hover:bg-sky-100 text-sky-600 text-lg p-4 transition duration-500 ease-in-out">
              <h2 className="text-base font-semibold tracking-wider">
                <span>
                  <i className="fa fa-image"></i> &nbsp;<span className="text-gray-500 text-sm font-light"> Gallery</span>
                </span>
              </h2>
            </div>
          </Link>
        )}
        {isAuth() && isAuth().status === "agency" && (
          <Link onClick={() => setShowMenu(!showMenu)} to="/me/jobs">
            <div className="w-full hover:bg-sky-100 text-sky-600 text-lg p-4 transition duration-500 ease-in-out">
              <h2 className="text-base font-semibold tracking-wider">
                <span>
                  <i className="fa fa-briefcase"></i> &nbsp;<span className="text-gray-500 text-sm font-light"> Jobs Postings</span>
                </span>
              </h2>
            </div>
          </Link>
        )}
        {isAuth() && isAuth().status === "agency" && (
          <Link onClick={() => setShowMenu(!showMenu)} to="/me/interviews">
            <div className="w-full hover:bg-sky-100 text-sky-600 text-lg p-4 transition duration-500 ease-in-out">
              <h2 className="text-base font-semibold tracking-wider">
                <span>
                  <i className="fa fa-user-clock"></i> &nbsp;<span className="text-gray-500 text-sm font-light"> Interviews</span>
                </span>
              </h2>
            </div>
          </Link>
        )}
        {isAuth() && isAuth().status === "agency" && (
          <Link onClick={() => setShowMenu(!showMenu)} to="/me/employees">
            <div className="w-full hover:bg-sky-100 text-sky-600 text-lg p-4 transition duration-500 ease-in-out">
              <h2 className="text-base font-semibold tracking-wider">
                <span>
                  <i className="fa fa-users"></i> &nbsp;<span className="text-gray-500 text-sm font-light"> Employees</span>
                </span>
              </h2>
            </div>
          </Link>
        )}
        {isAuth() && isAuth().status === "agency" && (
          <Link onClick={() => setShowMenu(!showMenu)} to="/me/projects">
            <div className="w-full hover:bg-sky-100 text-sky-600 text-lg p-4 transition duration-500 ease-in-out">
              <h2 className="text-base font-semibold tracking-wider">
                <span>
                  <i className="fa fa-folder"></i> &nbsp;<span className="text-gray-500 text-sm font-light"> Projects</span>
                </span>
              </h2>
            </div>
          </Link>
        )}
        {isAuth() && isAuth().status === "user" && (
          <Link onClick={() => setShowMenu(!showMenu)} to="/jobs">
            <div className="w-full hover:bg-sky-100 text-sky-600 text-lg p-4 transition duration-500 ease-in-out">
              <h2 className="text-base font-semibold tracking-wider">
                <span>
                  <i className="fa fa-briefcase"></i> &nbsp;<span className="text-gray-500 text-sm font-light"> Find Work</span>
                </span>
              </h2>
            </div>
          </Link>
        )}
        { (isAuth() && isAuth().status === "user" || isAuth() && isAuth().status === "agency") && (
          <Link onClick={() => setShowMenu(!showMenu)} to="/me/applications">
            <div className="w-full hover:bg-sky-100 text-sky-600 text-lg p-4 transition duration-500 ease-in-out">
              <h2 className="text-base font-semibold tracking-wider">
                <span>
                  <i className="fa fa-briefcase"></i> &nbsp;<span className="text-gray-500 text-sm font-light"> Jobs Applications</span>
                </span>
              </h2>
            </div>
          </Link>
        )}
        <Link onClick={() => setShowMenu(!showMenu)} to="/me/messenger">
          <div className="w-full hover:bg-sky-100 text-sky-600 text-lg p-4 transition duration-500 ease-in-out">
            <h2 className="text-base font-semibold tracking-wider">
              <span>
                <i className="fa fa-comments"></i> &nbsp;<span className="text-gray-500 text-sm font-light"> Messenger</span>
              </span>
            </h2>
          </div>
        </Link>
        {/* <Link to="/contact-us">
          <div className="w-full hover:bg-sky-100 text-sky-600 text-lg p-4 transition duration-500 ease-in-out">
            <h2 className="text-base font-semibold tracking-wider">
              <span>
                <i className="fa fa-paper-plane"></i> &nbsp;<span className="text-gray-500 text-sm font-light"> Contact Us</span>
              </span>
            </h2>
          </div>
        </Link> */}
        <div className="flex-grow"></div>
        <div
          className="w-full bg-sky-600 p-4 uppercase cursor-pointer"
          onClick={() => {
            signout();
            history.push("/home");
          }}
        >
          <h2 className="text-white text-sm font-semibold tracking-wide">
            <i className="fa fa-sign-out"></i> &nbsp;<span className="text-sm"> <span>Log out</span></span>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
