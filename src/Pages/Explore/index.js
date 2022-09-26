import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./index.css";
import Jobs from "../../Components/Jobs";
import jumbotron from "../../assets/image/jumbotron.jpg";
import { getData } from "../../Helpers/request";
import { Markup } from "interweave";
import { decode } from "he";

function Explore(props) {
  const [showJob, setShowJob] = useState(false);
  const [active, setActive] = useState(null);
  const [categories, setCategories] = useState([]);
  // const [show, setShow] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [ref, setRef] = useState(0);
  const [load, setLoad] = useState(true);
  const [loadErr, setLoadErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const { cat, type } = useParams();

  useEffect(() => {
    setLoadErr(false);
    setJobs([]);
    setCategories([]);
    getData("/user/categories")
      .then((d) => {
        if (!d.error) {
          setCategories(d.categories);
        } else {
          setLoadErr(true);
          toast.error("There was an error loading page data");
        }
      })
      .catch((e) => {
        setLoadErr(true);
        toast.error("There was an error loading page data");
      })
      .finally(setTimeout(setLoad(false), 5000));
    getData(`/user/jobs/${type}${cat ? "/" + cat : ""}`)
      .then((d) => {
        // console.log(d);
        if (!d.error) {
          setJobs(d.jobs);
        } else {
          setLoadErr(true);
          setErrMsg(d.message);
        }
      })
      .catch((e) => {
        setLoadErr(true);
        console.log(e);
      })
      .finally(setTimeout(setLoad(false), 5000));
  }, [cat, ref, type]);
  
  return (
    <div className={`my-6 p-0 ${showJob ? 'fixed top-0 bg-white w-screen h-screen overflow-hidden mt-16' : ''} `}>
      <Jobs
        show={showJob}
        job={active}
        close={() => {
          setShowJob(false);
          setActive(null);
        }}
      />
      <div className="w-full z-50">
        <ToastContainer />
        <div className="container ring-1 ring-zinc-100 relative p-3 mx-auto my-8 rounded-2xl shadow-xl bg-white grid grid-cols-1 md:grid-cols-6">
          <div className="hidden md:block">
            <div className="sticky top-0 p-3">
              <h3 className="font-bold text-3xl mb-3 text-blue-700 capitalize">
                Categories
              </h3>
              <ul className="list">
                <li className="my-2">
                  <Link
                    to={`/jobs/${type}`}
                    className="font-semibold capitalize"
                  >
                    All
                  </Link>
                </li>
                {!load &&
                  categories &&
                  categories.map((cat, _c) => (
                    <li className="my-2" key={_c}>
                      <Link
                        to={`/jobs/${type}/${cat.slug}`}
                        className="font-semibold capitalize"
                      >
                        {cat.title}
                      </Link>
                    </li>
                  ))}
                {categories.length === 0 && !loadErr && (
                  <li className="my-6">
                    <p className="w-full mb-6 bg-gray-200 rounded-full animate-pulse h-6"></p>
                    <p className="w-full mb-6 bg-gray-200 rounded-full animate-pulse h-6"></p>
                    <p className="w-full mb-6 bg-gray-200 rounded-full animate-pulse h-6"></p>
                  </li>
                )}
                {loadErr && !categories && (
                  <li className="my-2">
                    <p className="w-full h-6 p-2 m-2">
                      There was an error loading page data.
                      <button className="" onClick={() => setRef(ref + 1)}>
                        <span className="fa fa-refresh p-2 rounded-full ring-1"></span>
                        &nbsp; Click here to refresh
                      </button>
                    </p>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className=" col-span-1 md:col-span-5 p-2 md:p-4">
            {cat && categories && (
              <h5 className="text-lg capitalize">
                <b>{type}</b> jobs in "
                <span className="font-bold text-sky-500">
                  {categories.length > 0 &&
                    cat &&
                    categories.flatMap((c) => (c.slug === cat ? [c] : []))[0]
                      .title}
                </span>
                "
              </h5>
            )}
            {!cat && (
              <h5 className="text-lg capitalize">
                All <b>{type}</b> Jobs
              </h5>
            )}
            {!load &&
              jobs &&
              jobs.map((job) => (
                <div key={job._id} className="p-2 ring-1 ring-gray-100 shadow rounded my-3">
                  <div className="m-2 mt-5 ">
                    <h5 className="text-xl font-bold mb-1">{job.title}</h5>
                    <small className="text-xs capitalize font-bold text-gray-400">
                      <span className="text-sm text-gray-500">
                        Posted - {new Date(job.createdOn).toDateString()}
                      </span>
                      <br /> Project Length - {job.project_length}, Skill
                      Level - {job.skill_level}
                    </small>
                    <hr className="w-6 my-3" />
                    {/* <div className="text-gray-700 my-2 truncate h-8"><Markup content={decode(job.description)} />
                    </div> */}
                    {/* <div className="mb-3">
                      {job.skills.map((s) => (
                        <button
                          key={s}
                          className="uppercase text-sm px-3 mr-1 rounded-full text-black font-thin bg-gray-300"
                        >
                          {s.replace(/-/g, " ")}
                        </button>
                      ))}
                    </div> */}
                    <Link
                      to={`/jobs/fulltime/${job.category}`}
                      className="bg-gray-500 rounded-full text-white p-1 px-2 text-sm font-light"
                    >
                      {job.category.replace(/[-]+/g, " ")}
                    </Link>
                    <p className="text-xs"></p>
                    <div className="my-3 text-right">
                      <button
                        onClick={() => {
                          setActive(job);
                          setShowJob(true);
                        }}
                        className="bg-sky-500 rounded-full text-sm p-2 px-3 text-white hover:bg-sky-700 transition font-semibold"
                      >
                        <span className="fa fa-eye"></span> View Details
                      </button>
                    </div>
                  </div>
                  {/* <hr className="my-6 border-gray-200" /> */}
                </div>
              ))}
            {jobs.length === 0 && !loadErr && (
              <div className="p-2 my-3">
                <div className="mt-5">
                  <h5 className="text-xl font-bold mb-1 bg-gray-200 rounded-full animate-pulse h-10 w-60"></h5>
                  <small className="text-xs capitalize font-bold text-gray-400 bg-gray-200 rounded-full animate-pulse h-6 w-1/3">
                    <span className="text-sm text-gray-500"></span>
                    <br />
                  </small>
                  <hr className="w-6 my-3" />
                  <p className="text-gray-700 my-2 truncate bg-gray-200 rounded-full animate-pulse h-6 w-32"></p>
                  <div className="mb-3 bg-gray-200 rounded-full animate-pulse h-6 w-20"></div>
                  <div className="mb-3 w-full">
                    <div className="mb-3 bg-gray-200 rounded-full animate-pulse h-6 w-1/2"></div>
                    <div className="mb-3 bg-gray-200 rounded-full animate-pulse h-6 w-1/3"></div>
                  </div>
                </div>
              </div>
            )}
            {jobs.length === 0 && loadErr && (
              <div className="p-2 my-3">
                <div className="mt-5">
                  <h5 className="text-xl font-bold capitalize mb-1 text-red-500">
                    {errMsg} {cat && `under ${cat.replace(/-/g, " ")}`}
                  </h5>
                  <button className="" onClick={() => setRef(ref + 1)}>
                    <span className="fa fa-refresh p-2 rounded-full ring-1"></span>
                    &nbsp; Click here to refresh
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Explore;
