import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Cryptr from "cryptr";
import "./component.css";
import { isAuth } from "../Helpers/auth";
import { getData } from "../Helpers/request";
import b1 from "../assets/image/b1.jpg";
import b2 from "../assets/image/b2.jpg";
import b3 from "../assets/image/b3.jpg";

function PortfolioView(props) {
  const cryptr = new Cryptr("e7b75a472b65bc4a42e7b3f78833a4d00040beba79");
  const h = useHistory();
  const [show, setShow] = useState("hidden");
  const [showContent, setShowContent] = useState("hidden");
  // const [btn, setBtn] = useState({ text: "Apply", sending: false });
  const [profile, setProfile] = useState(null);
  const [bg, setBg] = useState(0);
  const bgs = [b1, b2, b3];
  const [education, setEducation] = useState([]);
  const [work, setWork] = useState([]);

  useEffect(() => {
    if (props.show) {
      setShow("");
      setProfile(props.profile);
      setShowContent("slide-in-right");
      setBg(Math.floor(Math.random() * bgs.length));
    } else {
      setShowContent("slide-out-left");
      setTimeout(() => {
        setShow("hidden");
      }, 600);
    }
  }, [props.show, bgs]);

  useEffect(() => {
    if (profile === null) {
    } else if (profile.status === "user") {
      getData(`/user/profile/${profile && profile._id}`)
        .then((d) => {
          if (d.error) {
          } else {
            setEducation(d.education);
            setWork(d.work);
          }
          console.log(d);
        })
        .catch((d) => console.log(d));
    }
    // console.log(profile);
  }, [profile]);

  return (
    <div
      className={`z-50 fixed p-0 md:py-8 top-0 left-0 bg-black bg-opacity-30 ${show} h-screen overflow-hidden w-screen flex flex-row-reverse`}
    >
      {profile && (
        <div
          className={`w-full relative container m-auto md:w-5/6 h-full overflow-auto bg-white md:rounded-xl shadow-lg ${showContent}`}
        >
          <button
            onClick={props.close}
            className="bg-red-500 ring-4 ring-gray-700 text-white py-1 px-2 rounded-lg absolute top-5 right-6"
          >
            <span className="fa fa-close"></span>
          </button>
          <div
            className="h-1/4 w-full flex flec-col content-center"
            // style={{ backgroundImage: `url(${bgs[bg]})` }}
          >
            <div className="container p-4 w-full flex flex-row">
              {/* <div className="mb-0 bg-gray-400 h-32 w-32 rounded-xl rounded-t-full mx-auto"> */}
                <div
                  className="h-32 w-32 rounded-full my-auto ring-4 ring-gray-400 bg-gray-500 "
                  // transform translate-y-1/3"
                  style={{
                    backgroundImage: `url(${profile && profile.pic})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
              {/* </div> */}
              <div className="flex flex-col my-auto flex-grow p-4">
              <p className="mt-16 text-3xl font-bold">
              {profile && profile.name}
            </p>
            <p className="mt-2 text-lg font-semibold text-gray-500">
              {profile && profile.tag}
            </p>
                <p className="text-blue-500 text-xl my-1"><span className="fa fa-globe"></span> {profile.region}, {profile.hometown}, {profile.country}</p>
              </div>
            </div>
          </div>
          <div className="h-3/4 w-full ring-1 overflow-hidden ring-gray-200 text-center">
            {/* <p className="mt-16 text-3xl font-bold">
              {profile && profile.name}
            </p>
            <p className="mt-2 text-lg font-semibold text-gray-500">
              {profile && profile.tag}
            </p>
            <p className="font-thin text-sm text-gray-400">
              Joined {new Date(profile.registeredOn).toDateString()}
            </p> */}
            <div className="m-2">
              {profile &&
                profile.skill.map((s) => (
                  <button
                    key={s}
                    className="text-sm py-1 px-3 mr-1 rounded-full text-white font-thin bg-gray-400"
                  >
                    {s.replace(/-/g, " ")}
                  </button>
                ))}
            </div>
            <div className="p-2 md:px-8 mt-4 ring-1 ring-gray-100 w-full h-full overflow-auto text-left container">
              <div className="mt-2 mb-4">
                <h3 className="text-xl font-semibold my-2">About</h3>
                {/* <hr className="w-8 my-1 mx-auto" /> */}
                <p className="text-gray-500">{profile && profile.about}</p>
              </div>
              {/* <hr /> */}
              {profile.status === "service" && (
                <div>
                  <div className="mt-2 mb-4">
                    <span className="text-xl capitalize">
                      <span className="fa fa"></span> Starting Cost
                    </span>
                    {profile.serviceCost && (
                      <span className="text-xl font-semibold capitalize">
                        &nbsp;-&nbsp; GHS {profile.serviceCost}.00
                      </span>
                    )}
                    <br />
                    {isAuth() && profile._id !== isAuth()._id && (
                      <button
                        onClick={() => {
                          h.push(
                            `/me/messenger/${cryptr.encrypt(profile.phone)}`
                          );
                        }}
                        className="bg-teal-500 text-white px-3 py-2 rounded-lg text-center"
                      >
                        Send Message
                      </button>
                    )}
                    <br />
                    <h3 className="text-sm font-thin text-gray-400 capitalize">
                      {profile.service} Service Professional
                    </h3>
                    <hr className="w-8 my-1 mx-auto" />
                    <span className="text-gray-400 capitalize">
                      specializing in{" "}
                    </span>
                    {profile.subservice &&
                      profile.subservice.map((ss, i) => (
                        <span key={i} className="text-gray-600 capitalize">
                          {i > 0 ? ", " : " "}
                          {ss.replace(/-/g, ` `)}
                        </span>
                      ))}
                    <br />
                  </div>
                </div>
              )}
              {profile.status === "user" && (
                <div className="grid grid-cols-1 gap-1 text-left">
                  <div className="mt-2 mb-4 p-3">
                    {/* <h3 className="text-xl font-semibold">
                      Education &amp; Certification History
                    </h3> */}
                    {education.map((edu) => (
                      <div key={edu._id}>
                        <hr className="w-8 my-2" />
                        <p className="text-lg font-bold text-gray-600">
                          {edu.programme}
                        </p>
                        <p className="text-md font-semibold">
                          {edu.institution}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {" "}
                          From {new Date(edu.from).toDateString()} to{" "}
                          {new Date(edu.to).toDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="border-l-2 border-gray-200">
                    <div className="mt-2 mb-4 p-3">
                      <h3 className="text-xl font-semibold">
                        Work History
                      </h3>
                      {work.map((w) => (
                        <div key={w._id}>
                          <hr className="w-8 my-2" />
                          <p>
                            <span className="text-lg font-bold text-gray-600">
                              {w.position}
                            </span>
                            &nbsp; - &nbsp;
                            <span className="text-md font-semibold">
                              {w.organisation}
                            </span>
                          </p>
                          <p className="text-gray-500 text-xs my-2">
                            {" "}
                            From {new Date(w.from).toDateString()} to{" "}
                            {w.there
                              ? "Present"
                              : new Date(w.to).toDateString()}
                          </p>
                          <p className="text-gray-500 text-sm">
                            {w.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div className="h-40"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PortfolioView;
