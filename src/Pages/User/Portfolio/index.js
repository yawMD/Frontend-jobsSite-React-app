import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { getData } from "../../../Helpers/request";
import AddEducation from "./Components/AddEducation";
import AddWork from "./Components/AddWork";
function Portfolio(props) {
  const [show, setShow] = useState(false);
  const [showWork, setShowWork] = useState(false);
  // const [jobs, setJobs] = useState([]);
  const [work, setWork] = useState([]);
  const [education, setEducation] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    setError(false);
    getData("/user/me/portfolio")
      .then((d) => {
        setLoading(true);
        console.log(d);
        toast(d.message)
        if (!d.error) {
          setWork(d.work);
          setEducation(d.education);
        } else {
          if(d.err) {
            setError(true);
          }
        }
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        setError(true);
        console.log(e);
      });
  }, [refresh]);

  const _refresh = () => setRefresh(refresh + 1);
  return (
    <div className="h-full bg-white w-full overflow-auto">
      <ToastContainer />
      <AddEducation
        show={show}
        close={() => setShow(false)}
        success={(message) => {
          toast(message);
          _refresh();
        }}
      />
      <AddWork
        show={showWork}
        close={() => setShowWork(false)}
        success={(message) => {
          toast(message);
          _refresh();
        }}
      />
      <div className="container mx-auto w-full md:w-11/12 pt-5 md:pt-10 px-5 h-auto">
        <div className="container mx-auto pt-5 md:pt-10 mt-8">
          <h1 className="float-left font-semibold text-3xl">My Portfolio</h1>
          <div className="clear-both"></div>
          {error && !loading && (
            <div>
              <h3 className="my-3 text-sm text-gray-500">
                There was an error fetching portfolio data. <br />{" "}
                <button  className="border-b-2 border-gray-300 text-blue-400" onClick={_refresh}>
                  Click here to refresh
                </button>
              </h3>
            </div>
          )}
          {loading && (
            <div>
              <h3 className="my-3 text-sm text-blue-500">
                <span className="fa fa-refresh animate-spin"></span> Please wait... Loading your portfolio data.
              </h3>
            </div>
          )}
        </div>
      </div>
      <div className="container mx-auto w-full md:w-11/12 pt-5 md:pt-10 px-5 h-auto">
        <div className="container m-auto">
          <div className="mb-8">
            <div className="flex">
              <h5 className="py-3 text-2xl font-semibold">Education</h5>
              <div className="flex-grow"></div>
              <div className="h-auto flex flex-col justify-center">
                <button
                  onClick={() => setShow(true)}
                  className="px-3 py-1 mb-0 text-xs uppercase ring-1 ring-blue-500 rounded-full text-blue-500 bg-gray-50"
                >
                  Add Education
                </button>
              </div>
              {/* <div className="clear-both"></div> */}
            </div>
            <hr />
            <div className="p-3 shadow bg-white max-h-80 overflow-auto">
              {!error &&
                !loading &&
                education.map((e, c) => (
                  <div key={e._id} className="my-2">
                    <div className="p-2">
                      <small className="font-bold text-sm text-gray-500">
                        {e.programme}
                      </small>
                      <p className="text-lg font-semibold">{e.institution}</p>
                      <p className="text-gray-500 font-bold">
                        <span className="text-sm font-thin">From</span>{" "}
                        {new Date(e.from).toDateString()}{" "}
                        <span className="text-sm font-thin">to</span>{" "}
                        {new Date(e.to).toDateString()}
                      </p>
                    </div>
                    {c !== education.length - 1 && <hr />}
                  </div>
                ))}
            </div>
          </div>
          <div className="mb-8">
            <div className="flex">
              <h5 className="py-3 text-2xl font-semibold">Work History</h5>
              <div className="flex-grow"></div>
              <div className="h-auto flex flex-col justify-center">
                <button
                  onClick={() => setShowWork(true)}
                  className="px-3 py-1 mb-0 text-xs uppercase ring-1 ring-blue-500 rounded-full text-blue-500 bg-gray-50"
                >
                  Add Work History
                </button>
              </div>
              {/* <div className="clear-both"></div> */}
            </div>
            <hr />
            <div className="p-3 shadow bg-white max-h-80 overflow-auto">
              {!error &&
                !loading &&
                work.map((e, c) => (
                  <div key={e._id} className="my-2">
                    <div className="p-2">
                      <small className="font-bold text-sm text-gray-500">
                        {e.programme}
                      </small>
                      <p className="text-lg font-semibold">{e.position}</p>
                      <p className="text-sm text-gray-600">{e.organisation}</p>
                      <p className="text-gray-500 font-bold">
                        <span className="text-sm font-thin">From</span>{" "}
                        {new Date(e.from).toDateString()}{" "}
                        <span className="text-sm font-thin">to</span>{" "}
                        {!e.there ? new Date(e.to).toDateString() : "current"}
                      </p>
                    </div>
                    {c !== work.length - 1 && <hr />}
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="h-24"></div>
      </div>
    </div>
  );
}

export default Portfolio;
