import React, { useEffect } from "react";
import { useState } from "react";
import Header from "../../Components/Header";
import { postData } from "../../Helpers/request";
import { toast, ToastContainer } from "react-toastify";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { authenticate, isAuth } from "../../Helpers/auth";
import CompleteSeeker from "../../Components/CompleteSeeker";
import CompleteAgency from "../../Components/CompleteAgency";
import CompleteServer from "../../Components/CompleteServer";

function Login(props) {
  const [email, setEmail] = useState("");
  const [showSeeker, setShowSeeker] = useState(false);
  const [showServer, setShowServer] = useState(false);
  const [showAgency, setShowAgency] = useState(false);
  const [password, setPassword] = useState("");
  const [btn, setBtn] = useState({ text: "Login", sending: false });
  const h = useHistory();
  const { search } = useLocation();
  const _s = search.replace(/\?/, "").split("&");
  const [loggedIn, setloggedIn] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      const tld = toast.loading("Logging you in... Please wait");
      setBtn({ text: "Logging you in...", sending: false });
      postData("/user/login", { email, password })
        .then((data) => {
          console.log(data);
          if (data.error) {
            toast.update(tld, {
              render: `Error: ${data.message}`,
              type: "error",
              isLoading: false,
            });
          } else {
            toast.update(tld, {
              render: `Login Successful`,
              type: "success",
              isLoading: false,
            });
            setBtn({ text: "Login Successful", sending: true });
            setloggedIn(true);
            authenticate(data, () => {
              let _d = isAuth();
              props.checkAuth(true);
              console.log(_d);
              if (!_d.set) {
                toast("Complete your profile setup to continue");
                if (_d.status === "user") {
                  setShowSeeker(true);
                } else if (_d.status === "agency") {
                  setShowAgency(true);
                } else if (_d.status === "service") {
                  setShowServer(true);
                }
              } else {
                setTimeout(() => {
                  if (_s.length === 3) {
                    h.push(_s[2].split("=")[1]);
                  } else {
                    h.push("/me/home");
                  }
                }, 2000);
              }
              setTimeout(function () {
                // setLogIn(isAuth() ? true : false);
                // h.push("/home");
              }, 5000);
            });
          }
        })
        .catch((e) => {
          console.log("err", e);
          toast.update(tld, {
            render: `Error: Login failed`,
            type: "error",
            isLoading: false,
          });
        })
        .finally((e) => {
          setBtn({ text: "Login", sending: false });
          setTimeout(() => {
            toast.dismiss(tld);
          }, 5000);
        });
    }
  };

  return (
    <div
      className={`${
        loggedIn && showSeeker ? "overflow-hidden" : ""
      } bg-zinc-100`}
    >
      {!isAuth() ? null : !isAuth().set ? (
        isAuth().status === "agency" ? (
          () => setShowAgency(true)
        ) : isAuth().status === "user" ? (
          () => setShowSeeker(true)
        ) : (
          () => setShowServer(true)
        )
      ) : isAuth().set ? (
        <Redirect to="/me/home" />
      ) : !(isAuth().type === "admin") ? (
        <Redirect to="/home" />
      ) : null}
      <Header />
      <ToastContainer />
      {loggedIn && showSeeker && (
        <CompleteSeeker show={showSeeker} close={() => setShowSeeker(false)} />
      )}
      {loggedIn && showAgency && (
        <CompleteAgency show={showAgency} close={() => setShowAgency(false)} />
      )}
      {loggedIn && showServer && (
        <CompleteServer show={showServer} close={() => setShowServer(false)} />
      )}
      <div className="h-full py-8 flex flex-col content-center align-center justify-center">
        <div className="container c mt-20 md:m-auto rounded-lg">
          {/* <div className="h-60 md:h-full bg-yellow-400 rounded-l-lg shadow-r-lg">
            <div className="h-full w-full"></div>
          </div> */}
          <form
            onSubmit={handleSubmit}
            className="p-2 md:px-8 md:py-10 text-center md:text-left w-full ring-1 ring-gray-100 shadow-5xl bg-white shadow-lg md:w-2/3 mx-auto"
          >
            <p className="text-xl mb-2 tracking-widest uppercase font-semibold">
              Welcome back
            </p>
            {_s[2] !== undefined && _s[2].replace("rdr=", "") === "/me/jobs" ? (
              <p className="text-red-400">
                Login to your agency account to post a job
              </p>
            ) : null}
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Login</h1>
            <div className="tracking-wide my-6 text-gray-800 text-lg">
              <div>
                <div className="p-0 md:p-2 grid grid-cols-2 gap-1 md:gap-3">
                  <div className="col-span-2 py-2">
                    <input
                      className="w-full p-3 ring-2 duration-600 ease-in-out transition ring-gray-100 rounded hover:shadow-lg  rounded"
                      value={email}
                      name="email"
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Your Email"
                    />
                  </div>
                  <div className="col-span-2 py-2">
                    <input
                      className="w-full p-3 ring-2 duration-600 ease-in-out transition ring-gray-100 rounded hover:shadow-lg rounded"
                      value={password}
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      type="password"
                      placeholder="Your Password"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="mb-2 text-sm text-gray-400">
                By Signing in, you agree to the Terms of Use and Privacy Policy
              </p>
              <button
                type="submit"
                className="px-3 md:px-5 py-3 rounded rounded-r-2xl tracking-wide text-white bg-blue-500 text-xl font-semi bold"
              >
                {btn.text} &rarr;
              </button>
            </div>
            <div className="text-right mt-2 text-blue-600">
              <Link to={`/register${search ? "/" + search : ""}`}>
                Don't an Account? Register here{" "}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
