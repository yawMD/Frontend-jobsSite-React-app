import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { getData } from "../../../Helpers/request";
import AddJob from "./Components/AddJob";
function Job(props) {
  const [show, setShow] = useState(false);
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    getData("/user/me/jobs")
      .then((d) => {
        console.log(d);
        if (!d.error) {
          setJobs(d.jobs);
        }
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <div className="h-screen bg-white w-full overflow-auto">
      <ToastContainer />
      <AddJob show={show} close={() => setShow(false)} />
      <div className="container mx-auto w-full md:w-11/12 pt-5 md:pt-10 px-5 h-auto">
        <div className="container mx-auto pt-5 md:pt-10 mt-8 px-2 md:px-8">
          <h1 className="float-left font-semibold text-3xl">
            Your Job Postings
          </h1>
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
        <div className="container m-auto">
          {jobs.map((job, c) => (
            <div
              className="py-6 px-3 hover:bg-gray-50 border-b-2 "
              key={job._id}
            >
              <h1 className="text-sm font-extrabold text-gray-400">{c + 1}</h1>
              <h3 className="text-xl font-bold">
                <span>{job.title}</span>
              </h3>
              <p className="py-3 text-gray-600">{job.description}</p>
            </div>
          ))}
        </div>
        <div className="h-24"></div>
      </div>
    </div>
  );
}

export default Job;
