import React, { useEffect } from "react";
import { useState } from "react";
import Header from "../../Components/Header";
import { postData } from "../../Helpers/request";
import { toast, ToastContainer } from "react-toastify";
import { Link, Redirect, useHistory } from "react-router-dom";
import { authenticate, isAuth } from "../../Helpers/auth";
import "../../../node_modules/react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import countryList from "react-select-country-list";

function Register(props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [type, setType] = useState("user");
  const [verify, setVerify] = useState("");
  const [defa, setDefa] = useState('')
  const [btn, setBtn] = useState({ text: "Register", sending: false });
  const h = useHistory();
  const cList = countryList().getData();

  useEffect(() => {
    fetch('https://extreme-ip-lookup.com/json/')
    .then( res => res.json())
    .then(response => {
      if(response.country.length > 0) {
        setCountry(response.country)
        setDefa(response.countryCode)
      } else {
        setCountry('Ghana')
        setDefa('GH')
      }
     console.log("Country is : ", response);
   })
   .catch((data, status) => {
     console.log('Request failed:', data);
   });
 },[])
 
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
              h.push('/login')
            }, 2000)
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
    <div className="bg-zinc-100">
      {isAuth() ? <Redirect to="/home" /> : null}
      <ToastContainer />
      <Header />
      <div className="h-full py-8 flex flex-col content-center align-center justify-center">
        <div className="container c mt-20 md:m-auto">
          <div className="h-60 md:h-full bg-green-400 rounded-l-lg">
            <div className="bg-black bg-opacity-10 h-full w-full"></div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="p-2 md:px-8 md:py-10 text-center md:text-left ring-1 ring-gray-100 shadow-5xl bg-white shadow-lg md:w-2/3 mx-auto"
          >
            <p className="text-xl mb-2 tracking-widest uppercase font-semibold">
              Create your Account
            </p>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Join Us</h1>
            <div className="tracking-wide my-6 text-gray-800 text-lg">
              <div>
                <div className="p-0 md:p-2 grid grid-cols-2 gap-1 md:gap-3">
                  <div className="col-span-2 md:col-span-1 py-2">
                    <input
                      className="w-full p-3 ring-2 duration-600 ease-in-out transition ring-gray-100 rounded hover:shadow-lg rounded"
                      value={name}
                      name="name"
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Your Full Name"
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1 text-right py-2">
                    <PhoneInput
                      className="w-full p-3 bg-white ring-2 duration-600 ease-in-out transition ring-gray-100 rounded hover:shadow-lg rounded"
                      value={phone}
                      defaultCountry={defa}
                      name="phone"
                      onChange={setPhone}
                      required
                      placeholder="Your Phone Number"
                    />
                  </div>
                  <div className="col-span-2 py-2">
                    <input
                      className="w-full p-3 ring-2 duration-600 ease-in-out transition ring-gray-100 rounded hover:shadow-lg  rounded"
                      value={email}
                      name="email"
                      type="email"
                      autoComplete="email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Your Email"
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1 py-2">
                    <input
                      className="w-full p-3 ring-2 duration-600 ease-in-out transition ring-gray-100 rounded hover:shadow-lg rounded"
                      value={password}
                      name="password"
                      autoComplete="new-password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      type="password"
                      placeholder="Your Password"
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1 py-2">
                    <input
                      className="w-full p-3 ring-2 duration-600 ease-in-out transition ring-gray-100 rounded hover:shadow-lg rounded"
                      value={verify}
                      name="verify"
                      autoComplete="new-password"
                      onChange={(e) => setVerify(e.target.value)}
                      required
                      placeholder="Confirm Password"
                      type="password"
                    />
                  </div>
                  <div className="col-span-2 py-2">
                    <label className="my-2 font-thin text-lg">From</label>
                    <select
                      className="w-full p-3 ring-2 duration-600 ease-in-out transition ring-gray-100 rounded hover:shadow-lg  rounded"
                      value={country}
                      name="country"
                      // type="email"
                      autoComplete="country"
                      onChange={(e) => setCountry(e.target.value)}
                      required
                    >
                      <option value={null}>Select your country</option>
                      {cList.map((c) => (
                        <option value={c.label} key={c.value}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="my-2 font-thin text-lg">
                      I'm Registering as "
                      <span className="font-semibold">
                        {type === "user"
                          ? "A Job Seeker"
                          : type === "service"
                          ? "A Service Professional"
                          : type === "freelancer"
                          ? "A Freelancer"
                          : type === "proider"
                          ? "A Service Provider"
                          : "A Hiring Agency"}
                      </span>
                      "
                    </label>

                    <select
                      className="w-full p-3 ring-2 duration-600 ease-in-out transition ring-gray-100 rounded hover:shadow-lg  rounded"
                      value={type}
                      name="type"
                      // type="email"
                      autoComplete="type"
                      onChange={(e) => setType(e.target.value)}
                      required
                    >
                      <option value={null}>Select your type</option>
                      <option value="agency" className="capitalize">
                        Company / Agency / Small Business / Startup
                      </option>
                      <option value="user" className="capitalize">
                        Job Seeker
                      </option>
                      <option value="freelancer" className="capitalize">
                        Freelancer
                      </option>
                      <option value="service" className="capitalize">
                        Service Professional
                      </option>
                    </select>
                    {/* <div className="w-full flex rounded-lg ring-1 ring-gray-200 bg-gradient-to-br from-gray-200 via-white to-gray-200 mt-2 text-black">
                      <button
                        type="button"
                        className={`p-3 flex-grow ring-1 rounded-l-lg ring-gray-200 bg-gradient-to-br ${
                          type === "agency"
                            ? "from-blue-500 via-blue-400 to-blue-700 text-white hover:text-black hover:from-gray-200 hover:via-white hover:to-gray-200"
                            : "hover:from-blue-500 hover:via-blue-400 hover:to-blue-700 hover:text-white"
                        } transition duration-300 ease-in-out`}
                        onClick={() => {
                          setType("agency");
                        }}
                      >
                        An Agency
                      </button>
                      <button
                        type="button"
                        className={`p-3 flex-grow ring-1 ring-gray-200 bg-gradient-to-br ${
                          type === "service"
                            ? "from-blue-500 via-blue-400 to-blue-700 text-white hover:text-black hover:from-gray-200 hover:via-white hover:to-gray-200"
                            : "hover:from-blue-500 hover:via-blue-400 hover:to-blue-700 hover:text-white"
                        } transition duration-300 ease-in-out`}
                        onClick={() => {
                          setType("service");
                        }}
                      >
                        A Service Professional
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setType("user");
                        }}
                        className={`p-3 flex-grow ring-1 rounded-r-lg ring-gray-200 bg-gradient-to-br ${
                          type === "user"
                            ? "from-blue-500 via-blue-400 to-blue-700 text-white hover:from-gray-200 hover:via-white hover:to-gray-200 hover:text-black"
                            : "hover:from-blue-500 hover:via-blue-400 hover:to-blue-700 hover:text-white"
                        } transition duration-300 ease-in-out`}
                      >
                        A Job Seeker
                      </button>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <button
                type="submit"
                className="px-3 md:px-5 py-3 rounded-lg rounded-r-xl text-white tracking-wide bg-blue-500 text-xl font-semi bold"
              >
                {btn.text} &rarr;
              </button>
            </div>
            <div className="text-right mt-2 text-blue-600">
              <Link to="/login">Have an Account? Login here </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
