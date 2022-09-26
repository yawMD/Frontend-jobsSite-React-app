import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "./component.css";
import { isAuth } from "../Helpers/auth";
import { postData } from "../Helpers/request";
import { Markup } from "interweave";
import { decode } from "he";

function Jobs(props) {
  const [show, setShow] = useState("hidden");
  const [showContent, setShowContent] = useState("hidden");
  // const [count, setCount] = useState(0)
  const [btn, setBtn] = useState({ text: "Apply", sending: false });
  const [job, setJob] = useState(null);
  useEffect(() => {
    if (props.show) {
      setShow("");
      // console.log(props.job);
      setJob(props.job);
      setShowContent("slide-in-left");
    } else {
      setShowContent("slide-out-left");
      setTimeout(() => {
        setShow("hidden");
      }, 500);
    }
  }, [props.show, props.job]);

  const submitAppilcation = () => {
    if (isAuth()) {
      if (isAuth().type !== "agency") {
      } else {
        // console.log(isAuth().type === "user")
        // console.log(job.job_type === "fulltime")
        // console.log(isAuth().type)
        // console.log(job.job_type)
        toast.error(
          `Error Applying: This account cannot apply for ${job.job_type} jobs`
        );
        return;
      }
      setBtn({ text: "Submitting Application", sending: true });
      postData(`/user/apply/${job._id}/${job.user}`)
        .then((d) => {
          if (d.error) {
            toast.error(d.message);
          } else {
            toast.success(d.message);
          }
        })
        .catch((e) => {
          console.log(e);
          toast.error("Sorry there was an error submitting your application");
          toast.error("Please Try again");
        })
        .finally(() => setBtn({ text: "Apply", sending: false }));
    } else {
      toast.warning("Login or create an account to apply for this job");
    }
  };
  return (
    <div
      className={`z-50 fixed top-0 left-0 bg-gray-700 bg-opacity-800 ${show} h-screen overflow-hidden flex justify-center w-screen`}
    >
      <ToastContainer />
      {job && (
        <div
          className={`c w-full px-3 h-full md:h-5/6 ring-1 rounded-xl shadow-lg container m-auto ring-gray-200 flex flex-row divide-x bg-white ${showContent}`}
        >
          <div className="flex-grow h-full overflow-auto divide-y container">
            {/* <div className="py-4 px-2">
              <button
                onClick={props.close}
                className="text-red-500 font-bold float-right text-3xl"
              >
                <span className="fa fa-close"></span>
              </button>
            </div>
            <div className="clear-both my-4"></div>
            <div>
              <div className="h-32" />
            </div> */}

            <h3 className="h font-bold text-2xl capitalize text-left p-6">
              Hiring
            </h3>
            <hr className="w-12 border-2 my-auto border-sky-500 m-2 ml-6 mb-8 mt-6" />
            <h3 className="h font-bold p-2 px-6 text-4xl capitalize text-left text-sky-500">
              <div className="h-8" />
              Job: {job.title}
              <div className="h-8" />
            </h3>
            <div className="mt-5 px-6">
              <div className="h-6" />
              <small className="text-sm text-gray-500">
                <span className="text-gray-800 capitalize font-semibold">
                  Posted:
                </span>{" "}
                {new Date(job.createdOn).toUTCString()}
                <br />
                <span className="text-gray-800 capitalize font-semibold">
                  Project Length:
                </span>{" "}
                {job.project_length}, {job.weekly_hours} HRS/WK
                <br />
                <span className="text-gray-800 capitalize font-semibold">
                  Budget:
                </span>{" "}
                {job.budget} {job.budget_type} <br />
                <span className="text-gray-800 capitalize font-semibold">
                  Skill Level:
                </span>{" "}
                {job.skill_level},{" "}
                <span className="font-thin">{job.skill_text}</span>
                <br />
                Posted from{" "}
                <span className="bg-gray-600 text-white p-1 px-2 text-xs font-bold rounded-full">
                  <span className="fa-solid fa-map-pin"></span>&nbsp;
                  {job.job_location}
                </span>
                {job.job_type !== "fulltime" && (
                  <>
                    &nbsp; for workers in{" "}
                    <span className="bg-gray-600 text-white p-1 px-2 text-xs font-bold rounded-full">
                      <span className="fa-solid fa-map-pin"></span>&nbsp;
                      {job.job_location}
                    </span>
                  </>
                )}
              </small>
              <div className="mt-2">
                <span className="text-gray-700 rounded-full uppercase bg-white py-1 ring-1 ring-gray-300 p-1 mr-3 text-sm font-light">
                  {job.category.replace(/[-]+/g, " ")}
                </span>
                {job.skills.map((s) => (
                  <button
                    key={s}
                    className=" text-xs px-2 mr-2 rounded-full text-black font-thin bg-gray-300"
                  >
                    {s.replace(/-/g, " ")}
                  </button>
                ))}
              </div>
              <div className="h-6" />
            </div>
            <div className="p-2 pl-6 my-3 m-auto w-full text-ce nter">
              <div className="mt-5">
                <div className="text-gray-700 my-2">
                  <Markup content={decode(job.description)} />
                </div>
                <p className="text-xs"></p>
                <div className="my-3 text-right">
                  {/* <button
                  onClick={submitAppilcation}
                  disabled={btn.sending}
                  className={`bg-sky-500 ring-1 p-2 px-3 text-sky-100 hover:bg-sky-600 rounded-full text-lg font-bold transition ${
                    btn.sending ? "cursor-loading" : ""
                  }`}
                >
                  {btn.text}{" "}
                  {btn.sending ? (
                    <span className="fa fa-spinner animate-spin"></span>
                  ) : (
                    <span>&rarr;</span>
                  )}
                </button> */}
                </div>
              </div>
              {/* <hr className="my-6 border-gray-400" /> */}
            </div>
          </div>
          <div className="mt-8 my-3 text-center">
            <button
              onClick={submitAppilcation}
              disabled={btn.sending}
              className={`bg-sky-500 ring-1 p-3 px-6 text-sky-100 hover:bg-sky-600 rounded-full text-xl font-bold transition ${
                btn.sending ? "cursor-loading" : ""
              }`}
            >
              {btn.text}{" "}
              {btn.sending ? (
                <span className="fa fa-spinner animate-spin"></span>
              ) : (
                <span>&rarr;</span>
              )}
            </button>
            <button
              onClick={props.close}
              className="text-red-400 font-semibold mx-4 mt-5 underline underline-offset-4 p-2"
            >
              &nbsp;Close&nbsp;&nbsp;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Jobs;
