import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "../../../../Components/component.css";
import PortfolioView from "../../../../Components/PortfolioView";
import { isAuth } from "../../../../Helpers/auth";
import { postData, getData } from "../../../../Helpers/request";
import SetInterview from "./SetInterview";
import { Markup } from "interweave";
import { decode } from "he";
import Hire from "./Hire";

function Jobs(props) {
  const [show, setShow] = useState("hidden");
  const [interview, setInterview] = useState(false);
  const [interviewee, setInterviewee] = useState(null);
  const [showContent, setShowContent] = useState("hidden");
  // const [count, setCount] = useState(0)
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [btn, setBtn] = useState({ text: "Apply", sending: false });
  const [applicants, setApplcants] = useState([]);
  const [hire, setHire] = useState(false);
  const [active, setActive] = useState(null);
  const [job, setJob] = useState(null);

  useEffect(() => {
    if (props.show) {
      setShow("");
      console.log(props.job);
      setJob(props.job);
      setShowContent("slide-in-left");
    } else {
      setShowContent("slide-out-left");
      setTimeout(() => {
        setShow("hidden");
      }, 500);
    }
  }, [props.show]);

  useEffect(() => {
    if (job) {
      getData(`/user/me/applicants/${job._id}`)
        .then((d) => {
          console.log(d);
          if (!d.error) {
            setApplcants(d.applicants);
          }
        })
        .catch((d) => console.log(d));
    }
  }, job);

  const handleApplicant = (m, a, d) => {
    if (window.confirm(m)) {
      postData(`/user/me/postings/${a}`, d)
        .then((d) => console.log(d))
        .catch((d) => console.log(d));
    }
  };

  const handleSchedule = (e) => {
    setInterviewee(e);
    setInterview(true);
  };
  return (
    <div
      className={`z-50 fixed top-0 left-0 bg-black bg-opacity-30 ${show} h-screen overflow-hidden w-screen`}
    >
      {active && hire && (
        <Hire
          application={{
            title: job.title,
            job: job._id,
            name: active.applicant.name,
            email: active.applicant.email,
            employer: job.user,
            employee: active.applicant._id,
          }}
          close={() => {
            setActive(null);
            setHire(false);
          }}
        />
      )}
      <PortfolioView
        show={showPortfolio}
        close={() => {
          setShowPortfolio(false);
          setActive(null);
        }}
        profile={active}
      />
      {job && (
        <SetInterview
          show={interview}
          close={() => {
            setInterview(false);
            setInterviewee(null);
          }}
          application={interviewee}
        />
      )}
      {job && (
        <div
          className={`p-5 w-full md:w-11/12 h-full overflow-auto bg-white md:rounded-r-xl shadow-lg ${showContent}`}
        >
          <div className="py-4 px-2">
            <h3 className="font-bold text-xl capitalize float-left">
              {job.title}
            </h3>
            <button
              onClick={props.close}
              className="text-red-500 font-bold float-right"
            >
              Close
            </button>
          </div>
          <div className="clear-both my-4"></div>
          <hr className="my-2" />
          <div className="p-2 my-3">
            <div className="mt-5">
              <small className="text-sm capitalize font-semibold text-gray-600">
                Posted on - {new Date(job.createdOn).toUTCString()}
                <br />
                <br />
                Project Length - {job.project_length}, {job.weekly_hours} HRS/WK
                <br />
                Budget - GHS {job.budget} {job.budget_type} <br />
                Skill Level - {job.skill_level},{" "}
                <span className="font-thin">{job.skill_text}</span>
                <br /> <br />A Project from{" "}
                <span className="bg-gray-600 text-white p-1 px-2 text-xs font-bold rounded-full">
                  <span className="fa-solid fa-map-pin"></span>&nbsp;
                  {job.job_location}
                </span>{" "}
                &nbsp; posted for workers in{" "}
                <span className="bg-gray-600 text-white p-1 px-2 text-xs font-bold rounded-full">
                  <span className="fa-solid fa-map-pin"></span>&nbsp;
                  {job.job_location}
                </span>
              </small>
              <hr className="w-6 my-3" />
              <div className="text-gray-700 my-2">
                <Markup content={decode(job.description)} />
              </div>
              <div className="mb-3">
                {job.skills.map((s) => (
                  <button
                    key={s}
                    className="text-sm px-3 mr-1 rounded-full text-black font-thin bg-gray-300"
                  >
                    {s.replace(/-/g, " ")}
                  </button>
                ))}
              </div>
              <span className="bg-gray-700 rounded uppercase text-white p-1 px-2 text-sm font-light">
                {job.category.replace(/[-]+/g, " ")}
              </span>
              <p className="text-xs"></p>
              {/*<div className="my-3 text-right">
                 <button
                  onClick={submitAppilcation}
                  disabled={btn.sending}
                  className={`text-blue-700 ring-1 ring-blue-200 p-2 hover:bg-blue-100 hover:text-blue-900 text-lg font-bold ${
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
              </div> */}
            </div>
            <hr className="my-6 border-gray-400" />
            <div className="flex">
              <div className="flex-grow" />
              <button className="rounded ring-1 ring-blue-300 text-blue-600 hover:bg-blue-50 p-2 mx-1 text-lg font-bold">
                I'm done hiring
              </button>
              <button className="rounded ring-1 ring-red-300 text-white bg-red-500 hover:text-red-600 hover:bg-red-50 p-2 mx-1 text-lg font-bold">
                Cancel Job Post
              </button>
            </div>
            <hr className="my-6 border-gray-400" />

            <h3 className="font-bold text-xl capitalize">Applicants</h3>
            <div className="flex flex-row flex-wrap overflow-auto">
              {applicants &&
                applicants.map((applicant) => (
                  <div
                    key={applicant._id}
                    className="p-2 my-3 shadow ring-1 ring-gray-100 rounded cursor-pointer hover:shadow-xl text-center"
                  >
                    <div className="text-right">
                      <button
                        onClick={() => {
                          setShowPortfolio(true);
                          setActive(applicant.applicant);
                        }}
                        className="text-blue-700 px-3 py-1 font-semibold"
                      >
                        View Profile &rarr;
                      </button>
                    </div>
                    <div className="mt-5">
                      {/* {applicant.pic && (
                    <div
                      className="w-32 h-32 m-auto bg-gray-500 rounded-full"
                      style={{
                        backgroundImage: `url(${applicant.pic})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                      }}
                    />
                  )} */}
                      <h5 className="text-xl font-bold mb-1">
                        {applicant.applicant.name}
                      </h5>
                      <p className="text-gray-500 mt-1 text-lg">
                        {applicant.applicant.tag}
                      </p>
                      {/* <hr className="w-6 my-3 mx-auto" /> */}
                      {/* <p className="text-gray-400 font-bold my-2 text-sm">Skills</p>
                  <div className="m-2">
                    {applicant.skill.map((s) => (
                      <button
                        key={s}
                        className="lowercase text-sm py-1 px-2 mr-1 rounded-full text-black font-thin bg-gray-300"
                      >
                        {s.replace(/-/g, " ")}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs"></p> */}
                    </div>
                    <p className="font-semibold text-md mb-2">
                      {!applicant.accepted && !applicant.accepted ? (
                        <small className="text-yellow-400">
                          Application Pending Review
                        </small>
                      ) : applicant.accepted ? (
                        <small className="text-green-400">
                          Application Accepted
                        </small>
                      ) : (
                        <small className="text-red-400">
                          Application Rejected
                        </small>
                      )}
                    </p>
                    <div className="flex flex-row-reverse">
                      {!applicant.accepted && (
                        <button
                          onClick={() => {
                            setHire(true);
                            setActive(applicant);
                          }}
                          className="text-green-700 bg-green-50 hover:bg-green-100 ring-1 ring-green-300 px-3 py-1 font-semibold"
                        >
                          Employ
                        </button>
                      )}
                      {!applicant.accepted && (
                        <button
                          onClick={() => handleSchedule(applicant._id)}
                          className="text-blue-700 bg-blue-50 mx-2 hover:bg-blue-100 ring-1 ring-blue-300 px-3 py-1 font-semibold"
                        >
                          Schedule Interview
                        </button>
                      )}
                      <div className="flex-grow"></div>
                      {/* {!applicant.rejected && (
                        <button
                          onClick={() =>
                            handleApplicant(
                              "Confirm the rejection of " +
                                applicant.applicant.name,
                              applicant._id,
                              { accepted: false, rejected: true }
                            )
                          }
                          className="text-red-700 bg-red-50 hover:bg-red-100 ring-1 ring-red-300 px-3 py-1 font-semibold"
                        >
                          Reject
                        </button>
                      )} */}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Jobs;
