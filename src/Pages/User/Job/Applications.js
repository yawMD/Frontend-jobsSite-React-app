import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Markup } from "interweave";
import { decode } from "he";
import { getData } from "../../../Helpers/request";
import { useLocation } from "react-router-dom";
function JobApplications(props) {
  const { search } = useLocation();
  const _s = search.replace(/\?/, "").split("&");
  const [show, setShow] = useState(false);
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);
  const [errMsg, setErrMsg] = useState(false)
  useEffect(() => {
    if(_s[0].length > 0) {
      setErrMsg(true)
      setTimeout(() => {
        setErrMsg(false)
      }, 30000)
    }
    const tld = toast.loading("Fetching Your Job Applications");
    setError(false);
    setLoading(true);
    getData("/user/me/applications")
      .then((d) => {
        console.log(d);
        if (!d.error) {
          setApplications(d.applications);
          toast.update(tld, {
            render: d.message,
            type: "success",
            isLoading: false,
          });
        } else {
          setError(true);
          toast.update(tld, {
            render: d.message,
            type: "info",
            isLoading: false,
          });
        }
      })
      .catch((e) => {
        toast.update(tld, {
          render: e.message,
          type: "error",
          isLoading: false,
        });
        console.log(e);
      })
      .finally((e) => {
        setTimeout(() => {
          toast.dismiss(tld);
        }, 5000);
        setLoading(false);
      });
  }, [refresh]);

  const _refresh = () => setRefresh(refresh + 1);
  return (
    <div className="h-screen bg-white w-full overflow-auto">
      <ToastContainer />
      <div className="container mx-auto w-full md:w-11/12 pt-5 md:pt-10 px-5 h-auto">
        <div className="container mx-auto pt-5 md:pt-10 mt-8 px-2">
          <h1 className="float-left font-semibold text-3xl">
            My Job Applications
          </h1>
          <div className="clear-both"></div>
          {errMsg && <p className="my-3 text-sm text-red-500">You need to be registered with an agency account to post jobs.</p>}
        </div>
      </div>
      <div className="container mx-auto w-full md:w-11/12 pt-5 md:pt-10 px-5 h-auto">
        <div className="container m-auto grid grid-cols-1 gap-3">
          {loading && (
            <div>
              <h3 className="my-3 text-sm text-blue-500">
                <span className="fa fa-refresh animate-spin"></span> Please
                wait... Loading your applications data.
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
          {!error &&
            !loading &&
            applications &&
            applications.map((application, c) => (
              <div
                className="py-6 px-3 bg-zinc-50 text-sky-700 hover:shadow-inner ring-1 ring-gray-100"
                key={application._id}
              >
                <h3 className="text-xl font-bold">
                  <span>{application.job.title}</span>
                </h3>
                <small className="text-sm text-gray-400 my-2">
                  Posted by{" "}
                  <span className="font-bold">{application.poster.name}</span>{" "}
                  on{" "}
                  <span className="font-bold">
                    {new Date(application.job.createdOn).toDateString()}
                  </span>
                </small>
                <p className="font-semibold">
                  {!application.accepted && !application.accepted ? (
                    <small className="text-yellow-400">
                      Application Pending Review
                    </small>
                  ) : application.accepted ? (
                    <small className="text-green-400">
                      Application Accepted
                    </small>
                  ) : (
                    <small className="text-red-400">Application Rejected</small>
                  )}
                </p>
                <div className="py-3">
                  <Markup content={decode(application.job.description)} />
                </div>
                {/* <div className="my-2 text-right">
                <button className="mr-1 p-1 px-2 ring-1 ring-green-200 hover:bg-white hover:text-green-400 text-white bg-green-400">
                  <span className="fa fa-paper-plane"></span> Message{" "}
                  <span className="font-bold">{application.poster.name}</span>
                </button>
              </div> */}
              </div>
            ))}
        </div>
        <div className="h-24"></div>
      </div>
    </div>
  );
}

export default JobApplications;
