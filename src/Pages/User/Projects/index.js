import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { getData } from "../../../Helpers/request";
import AddEmployee from "./Components/AddEmployee";
import AddProject from "./Components/AddProject";
function Projects(props) {
  const [show, setShow] = useState(false);
  const [showAddEmployees, setShowAddEmployees] = useState(true);
  const [job, setJob] = useState(null);
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    getData("/user/me/project")
      .then((d) => {
        console.log(d);
        if (!d.error) {
          setProjects(d.projects);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  const addFor = (id) => {
    setJob(id);
    setShowAddEmployees(true);
  };
  return (
    <div className="h-full bg-white w-full overflow-auto">
      <ToastContainer />
      <AddProject show={show} close={() => setShow(false)} />
      {job && showAddEmployees && (
        <AddEmployee
          show={showAddEmployees}
          close={() => {
            setShowAddEmployees(false);
            setJob(null);
          }}
        />
      )}
      <div className="container mx-auto w-full md:w-11/12 pt-5 md:pt-10 px-5 h-auto">
        <div className="container mx-auto pt-5 md:pt-10 mt-8 px-2 md:px-8">
          <h1 className="float-left font-semibold text-3xl">My Projects</h1>
          <div className="clear-both"></div>
        </div>
      </div>
      <div className="container mx-auto w-full md:w-11/12 pt-5 md:pt-10 px-5 h-auto">
        <div className="container m-auto">
          <div className="mb-8">
            <div className="text-right mb-8">
              <button
                onClick={() => setShow(true)}
                className="px-3 py-1 mb-0 text-xs uppercase ring-1 ring-blue-500 rounded-full text-blue-500 bg-gray-50"
              >
                Add Project
              </button>
            </div>
            <hr />
            <div className="p-3 max-h-80 overflow-auto grid grid-cols-1 md:grid-cols-4 gap-4">
              {projects.map((e) => (
                <div key={e._id} className="my-2 shadow bg-white">
                  <div className="p-2">
                    <small className="font-bold text-sm text-blue-500">
                      {e.title}
                    </small>
                    {e.description && (
                      <p className="p-2 my-2 border-y-2 text-gray-600 border-blue-300">
                        {e.description}
                      </p>
                    )}
                    <div className="text-right pb-2 px-2">
                      <a
                        href={`${e.image}`}
                        target="_blank"
                        className="text-gray-400 text-sm p-1"
                      >
                        View Document Here
                      </a>
                      <br />
                      <button
                        onClick={() => addFor(e._id)}
                        className="text-blue-500 ring-1 rounded ring-blue-300 px-2 mt-2"
                      >
                        <span className="fa fa-plus"></span> Employees
                      </button>
                    </div>
                  </div>
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

export default Projects;
