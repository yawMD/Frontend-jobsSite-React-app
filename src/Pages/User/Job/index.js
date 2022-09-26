import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Markup } from "interweave";
import { decode } from "he";
import { getData } from "../../../Helpers/request";
import AddJob from "./Components/AddJob";
import JobDetails from "./Components/JobDetails";
import { isAuth } from "../../../Helpers/auth";
import { useHistory } from "react-router-dom";
import UserMenu from "../../../Components/UserMenu";
function Job(props) {
  const h = useHistory();
  const [show, setShow] = useState(false);
  const [showJD, setShowJD] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [active, setActive] = useState(null);
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    isAuth() &&
      isAuth().status !== "agency" &&
      h.push("/me/applications?t=error");
    setError(false);
    setLoading(true);
    getData("/user/me/jobs")
      .then((d) => {
        console.log(d);
        if (!d.error) {
          setJobs(d.jobs);
        } else setError(true);
      })
      .catch((e) => {
        console.log(e);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refresh]);

  const _refresh = () => {
    setRefresh(refresh + 1);
  };
  return (
    <div className="h-screen bg-white w-full overflow-auto">
      <UserMenu />
      <ToastContainer />
      {show && (
        <AddJob
          show={show}
          close={() => {
            setShow(false);
            setActive(null);
          }}
        />
      )}
      <JobDetails show={showJD} job={active} close={() => setShowJD(false)} />
      <div className="container mx-auto w-full md:w-11/12 pt-5 md:pt-10 px-5 h-auto">
        <div className="container mx-auto pt-5 md:pt-10 mt-8 px-2 md:px-8">
          <h1 className="float-left font-semibold text-3xl">My Job Postings</h1>
          <button
            onClick={() => setShow(true)}
            className="float-right font-semibold text-lg px-5 hover:bg-blue-500 hover:text-blue-50 transition ease-in-out duration-300 py-2 rounded-full bg-blue-50 text-blue-500 ring-2 ring-blue-500"
          >
            Post A Job
          </button>
          <div className="clear-both"></div>
        </div>
      </div>
      <div className="container mx-auto w-full md:w-11/12 pt-5 md:pt-10 px-5 h-auto">
        {loading && (
          <div>
            <h3 className="my-3 text-sm text-blue-500">
              <span className="fa fa-refresh animate-spin"></span> Please
              wait... Loading your job Postings.
            </h3>
          </div>
        )}
        {error && !loading && (
          <div>
            <h3 className="my-3 text-sm text-gray-500">
              There was an error fetching applications. <br />{" "}
              <button
                className="border-b-2 border-gray-300 text-blue-400"
                onClick={_refresh}
              >
                Click here to refresh
              </button>
            </h3>
          </div>
        )}
        <div className="container m-auto">
          {!loading &&
            jobs.map((job, c) => (
              <div
                className="py-6 px-3 hover:bg-gray-50 border-b-2 "
                key={job._id}
              >
                <h1 className="text-sm font-extrabold text-gray-400">
                  {c + 1}
                </h1>
                <h3 className="text-xl font-bold">
                  <span>{job.title}</span>
                </h3>
                <div className="py-3 text-gray-600 truncate">
                  <Markup content={decode(job.description)} />
                </div>

                <div className="my-2 text-right">
                  <button
                    onClick={() => {
                      setActive(job);
                      setShowJD(true);
                    }}
                    className="p-1 px-2 bg-white ring-1 ring-blue-200 text-blue-500"
                  >
                    View more
                  </button>
                </div>
              </div>
            ))}
        </div>
        <div className="h-24"></div>
      </div>
    </div>
  );
}

export default Job;
