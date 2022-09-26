import React, { useEffect } from "react";
import { useState } from "react";
import Header from "./Header";
import { postData } from "../Helpers/request";
import { toast, ToastContainer } from "react-toastify";
import { Link, Redirect, useHistory } from "react-router-dom";
import { isAuth } from "../Helpers/auth";
import "../../node_modules/react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import countryList from "react-select-country-list";

export default function Signup(props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [type, setType] = useState("user");
  const [verify, setVerify] = useState("");
  const [defa, setDefa] = useState("");
  const [btn, setBtn] = useState({ text: "Register", sending: false });
  const [option, setOption] = useState("social");
  const h = useHistory();
  const cList = countryList().getData();

  useEffect(() => {
    fetch("https://extreme-ip-lookup.com/json/")
      .then((res) => res.json())
      .then((response) => {
        if (response.country.length > 0) {
          setCountry(response.country);
          setDefa(response.countryCode);
        } else {
          setCountry("Ghana");
          setDefa("GH");
        }
        //  console.log("Country is : ", response);
      })
      .catch((data, status) => {
        //  console.log('Request failed:', data);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let error = false;
    let _m = "";
    if (
      phone.length < 1 ||
      email.length < 1 ||
      name.length < 1 ||
      country.length < 1 ||
      password.length < 1 ||
      verify.length < 1
    ) {
      _m = "Error: Make sure all fields are set";
      error = true;
    } else if (password.length < 6) {
      error = true;
      _m = "Error: Password must be at least 6 characters";
    } else if (password !== verify) {
      error = true;
      _m = "Error: Passwords do not match";
    } else {
      error = false;
    }
    if (!error) {
      let __d = {
        name,
        email,
        phone,
        password,
        type,
        country,
      };
      // console.log(__d);
      // return;
      setBtn({ text: "Creating your account", sending: true });
      const tld = toast.loading("Creating your account... Please wait");
      postData("/user/register", __d)
        .then((d) => {
          console.log(d);
          if (d.error) {
            toast.update(tld, {
              render: `Creating Account failed. ${d.message}`,
              type: "error",
              isLoading: false,
            });
          } else {
            // toast.success("");
            toast.update(tld, {
              render: `Account Created Successfully, Login to continue setting up your profile`,
              type: "success",
              isLoading: false,
            });
            setTimeout(() => {
              h.push("/login");
            }, 2000);
          }
        }) 
        .catch((d) => {
          console.error(d);
          toast.update(tld, {
            render: `Creating Account failed. ${d.message}`,
            type: "error",
            isLoading: false,
          });
        })
        .finally(() => {
          setBtn({ text: "Register", sending: false });
          setTimeout(() => {
            toast.dismiss(tld);
          }, 5000);
        });
    } else {
      //show error message
      toast.error(_m);
    }
  };

  return (
    <>
        <div
            className="bg-opacity-70 bg-slate-900 fixed left-0 h-screen inset-0 overflow-hidden right-0 top-0 w-full z-50
            x-transition:enter=transition ease-out duration-100 x-transition:enter-start=opacity-0 scale-90
            x-transition:enter-end=opacity-100 scale-100 x-transition:leave=transition ease-in duration-100
            x-transition:leave-start=opacity-100 scale-100 x-transition:leave-end=opacity-0 scale-90">
            {isAuth() ? <Redirect to="/home" /> : null}
            <div className="grid h-full items-center max-w-2xl mx-auto p-4 relative">

                <div className="modal bg-white overflow-y-auto max-h-full relative rounded-lg">
                    <div className="border-b flex items-center justify-between p-4 rounded-t">
                        <h3 className="font-bold text-slate-900 text-xl">
                            Sign Up for FillyJobs
                        </h3>
                        <button type="button" onClick={props.close}
                            className="bg-transparent hover:bg-slate-200 hover:text-slate-900 inline-flex items-center p-1.5 rounded-lg text-slate-400 text-sm">
                            <span className="material-icons text-2xl" >close</span>
                        </button>
                    </div>
                    <div className="p-6 pb-8">
                        <div className="grid gap-y-4">
                            <div className="grid gap-y-4 sm:w-3/5 sm:mx-auto">
                                <div
                                    className="text-center relative cursor-pointer font-semibold text-sm px-8 py-4 bg-blue-700 rounded-lg text-white">
                                    <span className="">Continue With Facebook</span>
                                    <span className="absolute left-8 top-3.5">
                                        <svg className="h-6" aria-hidden="true" focusable="false" data-prefix="fab"
                                            data-icon="facebook-f" role="img" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 320 512" data-fa-i2svg="">
                                            <path fill="currentColor"
                                                d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z">
                                            </path>
                                        </svg>
                                    </span>
                                </div>
                                <div
                                    className="text-center relative cursor-pointer font-semibold text-sm px-8 py-4 bg-sky-500 rounded-lg text-white">
                                    <span className="">Continue With Twitter</span>
                                    <span className="absolute left-8 top-3.5">
                                        <svg className="h-6" aria-hidden="true" focusable="false" data-prefix="fab"
                                            data-icon="twitter" role="img" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 512 512" data-fa-i2svg="">
                                            <path fill="currentColor"
                                                d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z">
                                            </path>
                                        </svg>
                                    </span>
                                </div>
                                <div
                                    className="text-center relative cursor-pointer font-semibold text-sm px-8 py-4 bg-rose-700 rounded-lg text-white">
                                    <span className="">Continue With Google</span>
                                    <span className="absolute left-8 top-3.5">
                                        <svg className="h-6" aria-hidden="true" focusable="false" data-prefix="fab"
                                            data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 488 512" data-fa-i2svg="">
                                            <path fill="currentColor"
                                                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z">
                                            </path>
                                        </svg>
                                    </span>
                                </div>
                                <div
                                    className="text-center relative cursor-pointer font-semibold text-sm px-8 py-4 bg-gray-900 rounded-lg text-white">
                                    <span className="">Continue With Apple</span>
                                    <span className="absolute left-8 top-3.5">
                                        <svg className="h-6" aria-hidden="true" focusable="false" data-prefix="fab"
                                            data-icon="apple" role="img" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 384 512" data-fa-i2svg="">
                                            <path fill="currentColor"
                                                d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z">
                                            </path>
                                        </svg>
                                    </span>
                                </div>
                                <div className="font-bold py-4 relative text-center text-lg">
                                    <hr className="flex-grow" />
                                    <span className="absolute bg-white px-3 top-1">OR</span>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
                                <div className="grid gap-y-2">
                                    <label for="first_name" className="text-sm font-semibold">First Name</label>
                                    <input type="text" id="first_name" value={name} name="name" onChange={(e) => setName(e.target.value)}
                                        className="bg-slate-50 border border-slate-300 text-slate-900 rounded-lg focus:outline-none focus:border-blue-400 px-2.5 py-2 focus-within:outline-none"
                                        placeholder="John" required />
                                </div>
                                <div className="grid gap-y-2">
                                    <label for="last_name" className="text-sm font-semibold">Last Name</label>
                                    <input type="text" id="last_name"
                                        className="bg-slate-50 border border-slate-300 text-slate-900 rounded-lg focus:outline-none focus:border-blue-400 px-2.5 py-2 focus-within:outline-none"
                                        placeholder="Doe" required />
                                </div>
                                <div className="grid gap-y-2 sm:col-span-2">
                                    <label for="email" className="text-sm font-semibold">Email</label>
                                    <input type="email" id="email" value={email} name="email" autoComplete="email" onChange={(e) => setEmail(e.target.value)}
                                        className="bg-slate-50 border border-slate-300 text-slate-900 rounded-lg focus:outline-none focus:border-blue-400 px-2.5 py-2 focus-within:outline-none"
                                        placeholder="johndoe@mail.com" required />
                                </div>
                                <div className="grid gap-y-2 sm:col-span-2">
                                    <label for="password" className="text-sm font-semibold">Password</label>
                                    <input type="password" id="password" value={password} name="password" autoComplete="new-password" onChange={(e) => setPassword(e.target.value)}
                                        className="bg-slate-50 border border-slate-300 text-slate-900 rounded-lg focus:outline-none focus:border-blue-400 px-2.5 py-2 focus-within:outline-none"
                                        placeholder="johndoe@mail.com" required />
                                </div>
                                <div className="grid sm:col-span-2">
                                    <button type="submit"
                                        className="text-white bg-blue-700 hover:bg-blue-900 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm uppercase px-5 py-3.5 tracking-widest">
                                        Continue
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="border-slate-200 border-t flex items-center justify-center p-6 rounded-b space-x-2">
                        <Link
                            className="hover:text-blue-700 duration-300 px-8 py-1.5">
                            <span>Already a member? Login</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        </>
  );
}
