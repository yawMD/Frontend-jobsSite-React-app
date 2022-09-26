import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Cryptr from "cryptr";
import { getData, postData } from "../../../Helpers/request";
import MyConfirmModal from "../../../Components/MyConfirm";
import ResetInterview from "./Components/SetInterview";
import Hire from "../Job/Components/Hire";
function Interview(props) {
  // const [cryptr, setCryptr] = useState(null)
  const [interview, setInterviews] = useState([]);
  const [current, setCurrent] = useState(null);
  const [show, setShow] = useState(false);
  const [hire, setHire] = useState(false);
  const [application, setApplication] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [refresh, setRefresh] = useState(0);

  const cryptr = new Cryptr("e7b75a472b65bc4a42e7b3f78833a4d00040beba79")
  
  useEffect(() => {
    getData("/user/me/interviews")
      .then((d) => {
        console.log(d);
        if (!d.error) {
          setInterviews(d.interviews);
        }
      })
      .catch((e) => console.log(e));
  }, [refresh]);

  const cancelInterview = (i) => {
    postData("/user/me/interview", {
      application: i,
      cancelled: true,
    })
      .then((d) => {})
      .catch((d) => {});
  };

  const hireApplicant = (application) => {
    // alert('hire applicat')
    // return
    setHire(true);
    setApplication(application);
  };
  
  return (
    <div className="h-screen bg-white w-full overflow-auto">
      {hire && application && (
        <Hire
          application={{
            name: application.application.applicant.name,
            email: application.application.applicant.email,
            title: application.application.job.title,
            job: application.application.job._id,
            employee: application.application.applicant._id,
            employer: application.application.job.user,
          }}
          close={() => {
            setHire(false);
            setApplication(null);
          }}
        />
      )}
      {current && (
        <MyConfirmModal
          show={showConfirm}
          message={`Confirm the cancellation of the interview with...`}
          title={"Confirm Interview's Cancellation"}
          confirm={() => cancelInterview(current._id)}
          close={() => setShowConfirm(false)}
        />
      )}
      
      {current && show && (
        <ResetInterview
          show={show}
          close={() => {
            setShow(false);
            setCurrent(null);
          }}
          application={current}
        />
      )}
      <ToastContainer />
      <div className="container mx-auto w-full md:w-11/12 pt-5 md:pt-10 px-5 h-auto">
        <div className="container mx-auto pt-5 md:pt-10 mt-8 px-4">
          <h1 className="font-semibold text-3xl">Scheduled Interviews</h1>
        </div>
      </div>
      <div className="container mx-auto w-full md:w-11/12 pt-5 px-5 h-auto">
        <div className="container m-auto">
          {interview.map((interview, c) => (
            <div
              className={`"py-6 px-3 hover:bg-gray-50 border-b-2 " ${
                interview.cancelled ? "bg-red-50" : ""
              }`}
              key={interview._id}
            >
              <h3 className="text-lg font-semibold text-sky-700 pt-2 flex">
                <p className="text-sm font-extrabold text-gray-400 m-1">
                  {c + 1}.
                </p>
                <span>
                  Interview Scheduled
                  {interview.application !== null &&
                    `  with ${interview.application.applicant.name}`}
                  {` on `}
                  {new Date(interview.time).toUTCString()}
                </span>
              </h3>
              <p className="text-gray-500 text-sm mb-2 mx-1 p-2">
                For "{interview.application.job.title}" Job
              </p>
              {!interview.cancelled ? (
                <div className="my-2 w-full block md:flex flex-row">
                  <div className="inline-block">
                    <button
                      onClick={() => {
                        setCurrent(interview);
                        setShowConfirm(true);
                      }}
                      className="m-1 rounded p-1 px-2 bg-white ring-1 ring-rose-300 text-rose-500 hover:bg-rose-100 transition"
                    >
                      Cancel Interview
                    </button>
                    <button
                      onClick={() => {
                        setCurrent(interview);
                        setShow(true);
                      }}
                      className="m-1 ml-2 rounded p-1 px-2 bg-white ring-1 ring-yellow-300 text-yellow-500 hover:bg-yellow-100 transition"
                    >
                      Reschedule
                    </button>
                  </div>
                  {interview.time <= Date.now() && (
                    <div className="inline-block flex-grow text-center">
                      <Link
                        to={`/me/messenger/${cryptr.encrypt(
                          interview.application.applicant.phone
                        )}`}
                        className="m-1 ml-2 rounded p-1 px-2 bg-white ring-1 ring-blue-300 text-blue-500 hover:bg-blue-100 transition"
                      >
                        Start Interview
                      </Link>
                    </div>
                  )}
                  {interview.time <= Date.now() && (
                    <div className="inline-block flex-grow text-right">
                      <button
                        onClick={() => hireApplicant(interview)}
                        className="m-1 ml-2 rounded p-1 px-2 bg-white ring-1 ring-green-300 text-green-500 hover:bg-green-100 transition"
                      >
                        Hire
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="my-2 text-right">
                  <span
                    onClick={() => {
                      cancelInterview(interview._id);
                    }}
                    className="text-red-500 italic"
                  >
                    Cancelled
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="h-24"></div>
      </div>
    </div>
  );
}

export default Interview;
