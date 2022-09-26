import React, { useState, useEffect } from "react";
import { isAuth, signout } from "../Helpers/auth";
import { Link, useHistory, useLocation } from "react-router-dom";
import Logo from "../assets/svg/Logo.js";
import Login from "./Login";
import Signup from "./Signup";

function Header(props) {
  const history = useHistory();
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  const [showDD, setShowDD] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [active, setActive] = useState("home");
  useEffect(() => {
    if (pathname.indexOf("jobs/fulltime") > 0) {
      setActive("fulltime");
    } else if (pathname.indexOf("jobs/freelance") > 0) {
      setActive("freelance");
    } else if (pathname.indexOf("services") > 0) {
      setActive("services");
    }

    return () => {
      setActive("");
    };
  }, [pathname]);

  return (
    // <div className=" z-50 ">
    //   {showLogin && <Login close={() => setShowLogin(false)} /> }
    //   {showSignup && <Signup close={() => setShowSignup(false)} /> }
    //   <div className="bg-white border-b-2 border-gray-100 shadow  to py-1 w-full text-sky-600 m-0 ">
    //     <div className="center capitalize">
    //       <div className="flex space-between align-center px-2 container mx-auto ">
    //         <Link to="/" className="my-auto mr-3 font-semibold text-2xl">
    //           <h3 className="flex flex-row">
    //             <img src={logo} alt="logo" className="h-12" />
    //             {/* <p className="my-auto ml-2 whitespace-nowrap">Filly Jobs</p> */}
    //           </h3>
    //         </Link>
    //         <div className="flex-grow flex text-center align-center justify-center">
    //           <Link
    //             to="/jobs/fulltime"
    //             className={`text-sm my-auto hidden rounded-lg md:block p-1 hover:scale-110 transform transition ease-in-out duration-50 mx-2 ${active === 'fulltime' ? ' underline font-bold underline-offset-2' : ' text-gray-500'}`}
    //           >
    //             Fulltime Jobs
    //           </Link>
    //           <Link
    //             to="/me/jobs"
    //             className={`text-sm my-auto hidden rounded-lg md:block p-1 hover:scale-110 transform transition ease-in-out duration-50 mx-2 ${active === '/me/jobs' ? ' underline font-bold underline-offset-2' : ' text-gray-500'}`}
    //           >
    //             Post Fulltime Jobs
    //           </Link>
    //           <Link
    //             to="/jobs/freelance"
    //             className={`text-sm my-auto hidden rounded-lg md:block p-1 hover:scale-110 transform transition ease-in-out duration-50 mx-2 ${active === 'freelance' ? ' underline font-bold underline-offset-2' : ' text-gray-500'}`}
    //           >
    //             Freelance Jobs
    //           </Link>
    //           <Link
    //             to="/me/jobs"
    //             className={`text-sm my-auto hidden rounded-lg md:block p-1 hover:scale-110 transform transition ease-in-out duration-50 mx-2 ${active === '/me/jobs' ? ' underline font-bold underline-offset-2' : ' text-gray-500'}`}
    //           >
    //             Post Freelance Work
    //           </Link>
    //           <Link
    //           onClick={()=> setActive('services')}
    //             to="/services"
    //             className={`text-sm my-auto hidden rounded-lg md:block p-1 hover:scale-110 transform transition ease-in-out duration-50 mx-2 ${active === 'services' ? ' underline font-bold underline-offset-2' : ' text-gray-500'}`}
    //           >
    //             Explore Services
    //           </Link>
    //         </div>
    //         {!isAuth() && (
    //           <div className="m-0 p-0 flex flex-row">
    //             {/* <Link
    //               to="/login"
    //               className="text-sm my-auto hidden rounded-lg md:block p-1 hover:scale-110 transform transition ease-in-out duration-50 flex-grow"
    //             >
    //               Login
    //             </Link> */}
    //             <button
    //             onClick={() => setShowLogin(true) }
    //               className="text-sm my-auto hidden rounded-lg md:block p-1 hover:scale-110 transform transition ease-in-out duration-50 flex-grow"
    //             >
    //               Login
    //             </button>
    //             <button
    //             onClick={() => setShowSignup(true) }
    //               className="text-sm my-auto hidden bg-sky-600 text-white ring-1 font-semibold transition ease-in-out duration-600 md:block py-1 px-3 ml-2 rounded-full"
    //             >
    //               Join Us &rarr;
    //             </button>
    //             {/* <Link
    //               to="/register"
    //               className="text-sm my-auto hidden bg-sky-600 text-white ring-1 font-semibold transition ease-in-out duration-600 md:block py-1 px-3 ml-2 rounded-full"
    //             >
    //               Join Us &rarr;
    //             </Link> */}
    //           </div>
    //         )}
    //         {isAuth() && (
    //           <div className="relative">
    //             <div
    //               className="flex flex-row my-auto h-full"
    //               onClick={() => setShowDD(!showDD)}
    //             >
    //               <div className="my-auto transition ease-in-out duration-600 rounded-lg border-sky-500 border-2 font-semibold hover:text-white hover:bg-sky-500 transition ease-in-out duration-600 p-2 px-3 rounded-full">
    //                 <span className="fa fa-user"></span>
    //               </div>
    //             </div>
    //             <div
    //               className={`z-50 transition rounded-lg absolute top-16 mt-2 right-0 ring-1 ring-gray-200 flex flex-col bg-white w-auto shadow-lg ${
    //                 showDD ? "visible" : "invisible"
    //               }`}
    //             >
    //               <ul>
    //                 <li className="hover:bg-gray-100 transition">
    //                   <Link className="w-full block p-3" to="/me/home">
    //                     <span className="fa fa-user"></span>&nbsp; Home
    //                   </Link>{" "}
    //                 </li>
    //                 <li className="border-t-2 hover:bg-gray-100 transition">
    //                   <Link className="w-full block p-3" to="/me/messenger">
    //                     <span className="fa fa-envelope"></span>&nbsp; Messages
    //                   </Link>{" "}
    //                 </li>
    //                 <li className="border-t-2 bg-red-50 hover:bg-red-100 transition text-left">
    //                   <button
    //                     onClick={() => {
    //                       signout();
    //                       history.push("/my/home");
    //                     }}
    //                     className="w-full text-red-500 block p-3 text-left"
    //                   >
    //                     <span className="fa fa-sign-out"></span>&nbsp; Logout
    //                   </button>{" "}
    //                 </li>
    //                 <li className="border-t-2">
    //                   <div className="flex flex-row">
    //                     <div className="p-2 pr-1 flex justify-center">
    //                       <div
    //                         className=" m-auto h-16 w-16 rounded-full bg-black px-2"
    //                         style={{
    //                           backgroundImage: `url(${isAuth().pic})`,
    //                           backgroundSize: `cover`,
    //                           backgroundPosition: `cover`,
    //                         }}
    //                       />
    //                     </div>
    //                     <div className="p-2 pl-1 my-auto">
    //                       <p className="whitespace-nowrap font-semibold">
    //                         {isAuth().type === "agency"
    //                           ? isAuth().title
    //                           : isAuth().name}
    //                       </p>
    //                       <p className="whitespace-nowrap">
    //                         {isAuth().status === "agency"
    //                           ? "Agency"
    //                           : isAuth().status === "service"
    //                           ? "Service Professional"
    //                           : "Job Seeker"}
    //                       </p>
    //                     </div>
    //                   </div>
    //                 </li>
    //               </ul>
    //             </div>
    //           </div>
    //         )}
    //         <button
    //           onClick={() => setShow(true)}
    //           className="my-auto text-2xl block md:hidden font-light px-4 py-1 rounded"
    //         >
    //           <span className="fa fa-bars"></span>
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    //   <div
    //     className={`${
    //       show
    //         ? "h-screen w-full fixed flex flex align-center text-xl capitalize text-gray-800 content-center bg-gray-200 visible z-50 left-0 top-0"
    //         : "invisible hidden"
    //     } `}
    //   >
    //     <div className="fixed top-10 right-10 text-right">
    //       <button
    //         onClick={() => setShow(false)}
    //         className="transform rotate-45 hover:animate-spin transition duration-500 ease-in-out mb-6 text-red-600 text-6xl lowercase"
    //       >
    //         +
    //       </button>
    //     </div>
    //     <ul className="m-auto text-center">
    //       <li className="p-2 pb-6">
    //         <Link
    //           onClick={() => setShow(false)}
    //           className="font-semib old subt itle"
    //           to="/home"
    //         >
    //           Home
    //         </Link>
    //       </li>
    //       <li className="m-6">
    //         <Link onClick={() => setShow(false)} to="/services">
    //           Explore Services
    //         </Link>
    //       </li>
    //       <li className="m-6">
    //         <Link onClick={() => setShow(false)} to="/jobs/freelance">
    //           Find Freelance/Remote Jobs
    //         </Link>
    //       </li>
    //       <li className="m-6">
    //         <Link onClick={() => setShow(false)} to="/jobs/fulltime">
    //           Find Fulltime Jobs
    //         </Link>
    //       </li>
    //       <li className="m-6">
    //         <Link onClick={() => setShow(false)} to="/me/jobs">
    //           Post a Job
    //         </Link>
    //       </li>
    //       <hr />

    //       {isAuth() && (
    //         <div>
    //           <li className="m-6">
    //             <Link
    //               onClick={() => setShow(false)}
    //               to="/me/home"
    //               className=" p-2 px-4 rounded-lg bg-teal-500 text-white w-auto"
    //             >
    //               <span className="fa fa-user"></span>
    //             </Link>
    //           </li>
    //         </div>
    //       )}
    //       {!isAuth() && (
    //         <div>
    //           <li className="m-6">
    //             <Link onClick={() => setShow(false)} to="/login">
    //               Login
    //             </Link>
    //           </li>
    //           <li className="m-6">
    //             <Link onClick={() => setShow(false)} to="/register">
    //               Join Us
    //             </Link>
    //           </li>
    //         </div>
    //       )}
    //     </ul>
    //   </div>
    // </div>

    <div
      className="grid px-3 bg-blue-900 relative"
      x-data="{ 'showLoginModal': false,'showRegisterModal':false,'showForgotModal':false }"
    >
      {showLogin && <Login close={() => setShowLogin(false)} />}
      {showSignup && <Signup close={() => setShowSignup(false)} />}
      <div className="flex gap-x-3 item-center justify-between max-w-screen-lg mx-auto w-full">
        <Link to="/">
          <Logo />
        </Link>

        <div className="font-medium gap-x-6 tracking-wide sm:flex">
          <div className="relative self-center group">
            <h3 className="flex">
              <span className="text-slate-50 group-hover:text-yellow-200 py-2 cursor-pointer">
                Work
              </span>
            </h3>
            <div className="absolute hidden z-[200] w-28 group-hover:grid bg-white transition-all ease-in-out font-semibold rounded shadow text-sm top-full py-2">
              <div className="grid">
                <Link
                  to="/jobs/fulltime"
                  className="hover:text-blue-700 hover:translate-x-0.5 duration-300 px-4 py-1.5"
                >
                  <span>FullTime</span>
                </Link>
              </div>
              <div className="grid">
                <Link
                  to="/jobs/freelance"
                  className="hover:text-blue-700 hover:translate-x-0.5 duration-300 px-4 py-1.5"
                >
                  <span>Freelance</span>
                </Link>
              </div>
              <div className="grid">
                <Link
                  to="/me/jobs"
                  className="hover:text-blue-700 hover:translate-x-0.5 duration-300 px-4 py-1.5"
                >
                  <span>Post Jobs</span>
                </Link>
              </div>
              <div className="grid">
                <Link
                  to="/services"
                  className="hover:text-blue-700 hover:translate-x-0.5 duration-300 px-4 py-1.5"
                >
                  <span>Services</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="relative self-center group">
            <h3 className="flex">
              <span className="text-slate-50 group-hover:text-yellow-200 py-2 cursor-pointer">
                Jobs
              </span>
            </h3>
            <div className="absolute hidden z-[200] w-36 group-hover:grid bg-white transition-all ease-in-out font-semibold rounded shadow text-sm top-full py-2">
              <div className="grid">
                <a className="hover:text-blue-700 hover:translate-x-0.5 duration-300 px-4 py-1.5">
                  <span>Bookmarks</span>
                </a>
              </div>
              <div className="grid whitespace-nowrap">
                <a className="hover:text-blue-700 hover:translate-x-0.5 duration-300 px-4 py-1.5">
                  <span>All Contracts</span>
                </a>
              </div>
            </div>
          </div>
          <div className="relative self-center group">
            <h3 className="flex">
              <span className="text-slate-50 group-hover:text-yellow-200 py-2 cursor-pointer">
                Messages
              </span>
            </h3>
            <div className="absolute hidden z-[200] w-52 divide-y group-hover:grid bg-white transition-all ease-in-out font-medium rounded shadow text-xs top-full py-2">
              <div className="grid tracking-normal">
                <a className="hover:text-blue-700 px-4 py-1.5">
                  <p>
                    Quisquam, quia placerat orci cupidatat tempor turpis fugit
                    quisquam dictumst facere aute? Maecenas pariatur risus modi
                    convallis euismod faucibus delectus.
                  </p>
                </a>
              </div>
              <div className="grid tracking-normal">
                <a className="hover:text-blue-700 px-4 py-1.5">
                  <p>
                    Quisquam, quia placerat orci cupidatat tempor turpis fugit
                    quisquam dictumst facere aute? Maecenas pariatur risus modi
                    convallis euismod faucibus delectus.
                  </p>
                </a>
              </div>
              <div className="grid font-semibold">
                <a className="hover:text-blue-700 hover:translate-x-0.5 duration-300 px-4 py-1.5">
                  <span>See All Messages</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="relative w-80 lg:flex">
          <div className="grid w-full self-center">
            <input
              type="text"
              name=""
              id=""
              class="focus-within:outline-none pl-3 pr-8 py-2 rounded-md w-full"
              placeholder="Search..."
            />
          </div>
          <div className="absolute flex inset-y-0 items-center pl-3 right-1">
            <button
              type="submit"
              className="flex hover:text-blue-900 item-center text-slate-500"
            >
              <span className="material-icons">search</span>
            </button>
          </div>
        </div>

        <div className="font-medium gap-x-6 tracking-wide  sm:flex">
          <div className="relative self-center group">
            <h3 className="flex">
              <span className="text-slate-50 group-hover:text-yellow-200 py-2 cursor-pointer">
                <span className="material-icons text-2xl">notifications</span>
              </span>
            </h3>
            <div className="absolute hidden z-[200] w-52 divide-y group-hover:grid bg-white transition-all ease-in-out font-medium rounded shadow text-xs top-full right-0 py-2">
              <div className="grid tracking-normal">
                <a className="hover:text-blue-700 px-4 py-1.5">
                  <p>
                    Quisquam, quia placerat orci cupidatat tempor turpis fugit
                    quisquam dictumst facere aute? Maecenas pariatur risus modi
                    convallis euismod faucibus delectus.
                  </p>
                </a>
              </div>
              <div className="grid tracking-normal">
                <a className="hover:text-blue-700 px-4 py-1.5">
                  <p>
                    Quisquam, quia placerat orci cupidatat tempor turpis fugit
                    quisquam dictumst facere aute? Maecenas pariatur risus modi
                    convallis euismod faucibus delectus.
                  </p>
                </a>
              </div>
              <div className="grid font-semibold">
                <a className="hover:text-blue-700 hover:translate-x-0.5 duration-300 px-4 py-1.5">
                  <span>See All Notisfications</span>
                </a>
              </div>
            </div>
          </div>

          <div className="relative self-center group">
            <h3 className="flex">
              <span className="text-slate-50 group-hover:text-yellow-200 py-2 cursor-pointer">
                My Account
              </span>
            </h3>
            {!isAuth() &&<div className="absolute hidden z-[200] w-36 group-hover:grid bg-white transition-all ease-in-out font-semibold rounded shadow text-sm top-full right-0 py-2">
              <div className="grid">
                <button
                  onClick={() => setShowLogin(true)}
                  className="text-left hover:text-blue-700 hover:translate-x-0.5 duration-300 px-4 py-1.5"
                >
                  <span>Login</span>
                </button>
              </div>
              <div className="grid">
                <button
                  onClick={() => setShowSignup(true)}
                  className="text-left hover:text-blue-700 hover:translate-x-0.5 duration-300 px-4 py-1.5"
                >
                  <span>Register</span>
                </button>
              </div>
            </div>}
          </div>
        </div>

        <div className="self-center group lg:hidden">
          <h3 className="flex">
            <span className="text-slate-50 group-hover:text-yellow-200 py-2 cursor-pointer">
              <span className="material-icons text-3xl">search</span>
            </span>
          </h3>
          <div className="absolute  z-[200] group-hover:grid gap-y-2 bg-white transition-all ease-in-out font-semibold shadow text-sm top-14 inset-x-0 py-8">
            <div className="relative px-6">
              <div className="grid w-full self-center">
                <input
                  type="text"
                  name=""
                  id=""
                  className="focus-within:outline-none pl-3 pr-8 py-2 w-full"
                  placeholder="Search..."
                />
              </div>
              <div className="absolute flex inset-y-0 items-center pl-3 right-5">
                <button
                  type="submit"
                  class="flex hover:text-blue-900 item-center text-slate-500"
                >
                  <span className="material-icons">send</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="self-center group sm:hidden">
          <h3 className="flex">
            <span className="text-slate-50 group-hover:text-yellow-200 py-2 cursor-pointer">
              <span className="material-icons text-3xl">widgets</span>
            </span>
          </h3>
          <div className="absolute  z-[200] group-hover:grid gap-y-2 bg-white transition-all ease-in-out font-semibold shadow text-sm top-14 inset-x-0 py-8">
            <div className="flex">
              <a
                href=""
                class="hover:text-blue-700 hover:translate-x-0.5 duration-300 px-8 py-1.5"
              >
                <span>FullTime</span>
              </a>
            </div>
            <div className="flex">
              <a
                href=""
                class="hover:text-blue-700 hover:translate-x-0.5 duration-300 px-8 py-1.5"
              >
                <span>Freelance</span>
              </a>
            </div>
            <div className="flex">
              <a
                href=""
                class="hover:text-blue-700 hover:translate-x-0.5 duration-300 px-8 py-1.5"
              >
                <span>Post Jobs</span>
              </a>
            </div>
            <div className="flex">
              <a
                href=""
                class="hover:text-blue-700 hover:translate-x-0.5 duration-300 px-8 py-1.5"
              >
                <span>Services</span>
              </a>
            </div>
            <div className="flex">
              <a
                href=""
                class="hover:text-blue-700 hover:translate-x-0.5 duration-300 px-8 py-1.5"
              >
                <span>Bookmarks</span>
              </a>
            </div>
            <div className="flex">
              <a
                href=""
                class="hover:text-blue-700 hover:translate-x-0.5 duration-300 px-8 py-1.5"
              >
                <span>All Contracts</span>
              </a>
            </div>
          </div>
        </div>

        <div className="self-center group sm:hidden">
          <h3 className="flex">
            <span className="text-slate-50 group-hover:text-yellow-200 py-2 cursor-pointer">
              <span className="material-icons text-3xl">person</span>
            </span>
          </h3>
          <div className="absolute hidden z-[200] group-hover:grid gap-y-2 bg-white transition-all ease-in-out font-semibold shadow text-sm top-14 inset-x-0 py-8">
            <div className="flex">
              <button
                onClick="showLoginModal = true"
                className="hover:text-blue-700 hover:translate-x-0.5 duration-300 px-8 py-1.5"
              >
                <span>Login</span>
              </button>
            </div>
            <div className="flex">
              <button
                onClick="showRegisterModal = true"
                className="hover:text-blue-700 hover:translate-x-0.5 duration-300 px-8 py-1.5"
              >
                <span>Register</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
