import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Markup } from "interweave";
import { decode } from "he";
import { getData } from "../../../Helpers/request";
import AddJob from "./Components/AddJob";
import JobDetails from "./Components/JobDetails";
import { isAuth } from "../../../Helpers/auth";
import { useHistory } from "react-router-dom";

function Employees(props) {
  const h = useHistory();
  const [show, setShow] = useState(false);
  const [showJD, setShowJD] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [active, setActive] = useState(null);
  useEffect(() => {
    isAuth().status !== "agency" && h.push("/me/applications?t=error");
    getData("/user/me/employees")
      .then((d) => {
        console.log(d);
        if (!d.error) {
          setEmployees(d.employees);
        } else setError(true);
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setLoading(false);
      });
  }, [refresh]);

  const _refresh = () => {
    setRefresh(refresh + 1);
  };
  return (
    <div className="h-screen bg-white w-full overflow-auto">
      <ToastContainer />
      <JobDetails
        show={showJD}
        employee={active}
        close={() => setShowJD(false)}
      />
      <div className="container mx-auto w-full md:w-11/12 pt-5 md:pt-10 px-5 h-auto">
        <div className="container mx-auto pt-5 md:pt-10 mt-8 px-2 md:px-8">
          <h1 className="float-left font-semibold text-3xl">My Employees</h1>
          <div className="clear-both"></div>
        </div>
      </div>
      <div className="container mx-auto w-full md:w-11/12 pt-5 md:pt-10 px-5 h-auto">
        {loading && (
          <div>
            <h3 className="my-3 text-sm text-blue-500">
              <span className="fa fa-refresh animate-spin"></span> Please
              wait... Fetching your employees.
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
        {!loading && !error && employees && (
          <div className="container m-auto grid grid-cols-1 md:grid-cols-3 gap-3">
            {employees.map((employee, c) => (
              <div className="rounded-lg ring-1 ring-gray-200 bg-gray-50 shadow hover:shadow-lg transition p-4 flex flex-col justify-center">
                <div
                  className="h-32 w-32 mx-auto my-2 rounded-full bg-black"
                  style={{ backgroundImage: `url(${employee.employee.pic})` }}
                ></div>
                <div className="text-center">
                  <h2 className="text-lg font-semibold text-gray-600 my-2">
                    {employee.employee.name}
                  </h2>
                  <hr />
                  <h2 className="text-base font-medium text-gray-600 mt-2">
                    {employee.employee.email}
                  </h2>
                  <h2 className="text-sm text-gray-400 my-2">
                    Employed for{" "}
                    <span className="font-bold text-gray-500">
                      "{employee.job.title}"
                    </span>{" "}
                    job
                  </h2>
                  <hr />
                  <h2 className="text-xs font-bold text-sky-600 text-left mt-4 mb-4">
                    Hire Details
                  </h2>
                  <h2 className="text-sm font-base text-sky-400 text-left my-2">
                    Hired - {new Date(employee.commencementDate).toUTCString()}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="h-24"></div>
      </div>
    </div>
  );
}

export default Employees;
