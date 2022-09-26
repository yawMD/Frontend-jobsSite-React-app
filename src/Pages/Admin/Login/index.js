import React, { useEffect } from "react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link, Redirect, useHistory } from "react-router-dom";

import { postData } from "../../../Helpers/request";
import { authenticate, isAuth } from "../../../Helpers/auth";

function AdminLogin(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btn, setBtn] = useState({ text: "Login", sending: false });
  const h = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (true) {
      setBtn({ text: "Logging you in...", sending: false });
      postData("/admin/login", { email, password })
        .then((data) => {
          console.log(data);
          if (data.error) {
            toast.error(data.message);
          } else {
            toast(data.message);
            setBtn({ text: "Login Successful", sending: true });
            authenticate(data, () => {
              toast("You will be redirected shortly");
              setTimeout(function () {
                // setLogIn(isAuth() ? true : false);
                h.push("/admin/home");
              });
            });
          }
        })
        .catch((e) => {
          console.log("err", e);
          toast.error("Error: Login failed");
        })
        .finally((e) => setBtn({ text: "Login", sending: false }));
    }
  };
  return (
    <div>
      {!isAuth() ? null : isAuth().type !== "admin" ? (
        <Redirect to="/home" />
      ) : (
        <Redirect to="/admin/home" />
      )}
      <ToastContainer />
      {/* <Header /> */}
      <div className="h-screen py-8 flex flex-col content-center align-center justify-center bg-gray-50">
        <div className="container shadow-5xl w-full md:w-1/2 mt-20 md:m-auto bg-white shadow-lg rounded-lg">
          <form
            onSubmit={handleSubmit}
            className="p-2 md:px-8 md:py-10 text-center container md:text-left"
          >
            <p className="text-xl mb-2 tracking-widest uppercase font-semibold">
              Admin Panel
            </p>
            <hr />
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
              <button
                type="submit"
                className="px-3 md:px-5 py-3 rounded rounded-r-2xl tracking-wide text-white bg-blue-500 text-xl font-semi bold"
              >
                {btn.text}
              </button>
            </div>
            <div className="text-right mt-2 text-blue-600">
              <Link to="/register">&larr; Go back home</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
