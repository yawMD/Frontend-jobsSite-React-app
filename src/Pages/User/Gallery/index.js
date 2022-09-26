import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { getData } from "../../../Helpers/request";
import AddProject from "./Components/AddProject";
function Gallery(props) {
  const [show, setShow] = useState(false);
  // const [jobs, setJobs] = useState([]);
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
  return (
    <div className="h-full bg-white w-full overflow-auto">
      <ToastContainer />
      <AddProject show={show} close={() => setShow(false)} />
      <div className="container mx-auto w-full md:w-11/12 pt-5 md:pt-10 px-5 h-auto">
        <div className="container mx-auto pt-5 md:pt-10 mt-8 px-2 md:px-8">
          <h1 className="float-left font-semibold text-3xl">My Gallery</h1>
          <div className="clear-both"></div>
        </div>
      </div>
      <div className="container mx-auto w-full md:w-11/12 pt-5 md:pt-10 px-5 h-auto">
        <div className="container m-auto">
          <div className="mb-8">
            <div className="flex">
              <h5 className="py-3 text-2xl font-semibold">Projects</h5>
              <div className="flex-grow"></div>
              <div className="h-auto flex flex-col justify-center">
                <button
                  onClick={() => setShow(true)}
                  className="px-3 py-1 mb-0 text-xs uppercase ring-1 ring-blue-500 rounded-full text-blue-500 bg-gray-50"
                >
                  Add Project
                </button>
              </div>
              {/* <div className="clear-both"></div> */}
            </div>
            <hr />
            <div className="p-3 shadow bg-white max-h-80 overflow-auto grid grid-cols-4 gap-4">
              {projects.map((e) => (
                <div key={e._id} className="my-2">
                  <div className="p-2">
                    <small className="font-bold text-sm text-gray-500">
                      {e.title}
                    </small>
                    <img src={e.image} />
                  </div>
                  <hr />
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

export default Gallery;
