import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation, useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { getData } from "../../Helpers/request";
import PortfolioView from "../../Components/PortfolioView";
import Jobs from "../../Components/Jobs";
import { isAuth } from "../../Helpers/auth";

function Search(props) {
  const h = useHistory();
  const { filter, cat } = useParams();
  const { search } = useLocation();
  const _s = search.replace(/\?/, "").split("&");

  const [ref, setRef] = useState(0);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filterMain, setFilterMain] = useState("");
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [active, setActive] = useState(null);
  const [showJob, setShowJob] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loadErr, setLoadErr] = useState(false);
  const [load, setLoad] = useState(true);
  const [services, setServices] = useState([]);

  useEffect(() => {
    console.log(isAuth());
    setCategories([]);
    setServices([]);
    setLoadErr(false);
    setLoad(true);
    if (type === "jobs") {
      getData("/user/categories")
        .then((d) => {
          if (!d.error) {
            setCategories(d.categories);
          } else {
            setLoadErr(true);
            toast.error("There was an error loading categories");
          }
        })
        .catch((e) => {
          setLoadErr(true);
          toast.error("There was an error loading categories");
        })
        .finally(() => setLoad(false));
    } else if (type === "service") {
      getData("/user/services")
        .then((d) => {
          if (!d.error) {
            setServices(d.services);
          } else {
            setLoadErr(true);
            // setErrMsg(d.messages);
            toast.error("There was an error loading page data.");
          }
        })
        .catch((e) => {
          setLoadErr(true);
          toast.error("There was an error loading page data.");
        })
        .finally(() => setLoad(false));
    }
  }, [type]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    setFilterMain(filter);
    console.log("querying");
    let q = _s[0].replace("q=", "");
    setQuery(q);
    setType(filter === "fulltime-jobs" ? "jobs" : "service");
    getData(`/user/search/${cat}/${filter}/${q}`)
      .then((d) => {
        setLoading(false);
        if (!d.error) {
          // console.log(d.results);
          setResults(d.results);
          setType(d.type);
          setError(false);
        } else {
          setError(true);
          toast.error(d.message);
        }
        console.log(d);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        setError(true);
        toast.error(e.message);
      });
  }, [window.location.pathname, ref]);

  useEffect(() => {
    if (ref > 0) {
      h.push(
        `/search/${filterMain}/${cat}?q=${encodeURI(
          query
            .toLowerCase()
            .replace(/\s/g, "-")
            .replace(/\?/g, "")
            .replace(/&/g, "")
            .replace(/\$/g, "")
            .replace(/\(/g, "")
            .replace(/\)/g, "")
            .replace(/[-]+/g, "-")
            .replace(/'/g, "")
            .replace(/"/g, "")
        )}`
      );
    }
  }, [filterMain, query]);

  const filterBy = (d) => {
      h.push(
        `/search/${filterMain}/${encodeURI(
          d.slug
        )}?${encodeURI(
          _s[0]
            .toLowerCase()
            .replace(/\s/g, "-")
            .replace(/\?/g, "")
            .replace(/&/g, "")
            .replace(/\$/g, "")
            .replace(/\(/g, "")
            .replace(/\)/g, "")
            .replace(/[-]+/g, "-")
            .replace(/'/g, "")
            .replace(/"/g, "")
        )}`
      );
  };
  const filterNone = () => {

    h.push(
      `/search/${filterMain}/all?${encodeURI(
        _s[0]
          .toLowerCase()
          .replace(/\s/g, "-")
          .replace(/\?/g, "")
          .replace(/&/g, "")
          .replace(/\$/g, "")
          .replace(/\(/g, "")
          .replace(/\)/g, "")
          .replace(/[-]+/g, "-")
          .replace(/'/g, "")
          .replace(/"/g, "")
      )}`
    );
  };

  return (
    <div className="border-t-2 m-0 p-0 bg-white text-gray-600">
      {active && showPortfolio && (
        <PortfolioView
          close={() => setShowPortfolio(false)}
          show={showPortfolio}
          profile={active}
        />
      )}
      {active && showJob && (
        <Jobs
          show={showJob}
          job={active}
          close={() => {
            setShowJob(false);
            setActive(null);
          }}
        />
      )}
      <ToastContainer />
      <div className="w-full h-full z-50">
        <div className="container m-auto">
          <div className="">
            <div className="py-8">
              <div className=" font-semibold text-md text-sky-500 mb-4 p-4">
                <div className="p-2 rounded-lg flex ring-1 ring-sky-200">
                  <span className="my-auto fa fa-search text-lg m-1 text-gray-400"></span>
                  <input
                    className="p-2 rounded-lg my-auto mx-2 flex-grow"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <button
                    onClick={(e) => setRef(ref + 1)}
                    className="rounded-lg p-2 px-4 font-semibold text-white bg-teal-500"
                  >
                    Search
                  </button>
                </div>
              </div>
              <hr />
              <div className="grid grid-cols-6 container m-auto">
                <div className="hidden md:block p-4 md:py-8">
                  <div className="sticky top-0 p-3">
                    <h3 className="font-bold text-lg my-3 text-teal-500 capitalize">
                      Filter by {type === "jobs" ? "Categories" : "Services"}
                    </h3>
                    <ul className="list">
                      {!load && (
                        <li className="my-2">
                          <button
                            onClick={filterNone}
                            to={`/jobs/${type}`}
                            className="font-semibold text-lg capitalize"
                          >
                            All
                          </button>
                        </li>
                      )}
                      {!load &&
                        type === "jobs" &&
                        categories &&
                        categories.map((cat, _c) => (
                          <li className="my-2 text-left" key={_c}>
                            <hr className="my-1" />
                            <button
                              onClick={() => filterBy(cat)}
                              to={`/jobs/${type}/${cat.slug}`}
                              className="font-semibold text-left text-lg capitalize"
                            >
                              {cat.title}
                            </button>
                          </li>
                        ))}

                      {!load &&
                        type !== "jobs" &&
                        services &&
                        services.map((cat) => (
                          <li key={cat._id} className="my-2">
                            <hr className="my-1" />
                            <button
                              onClick={() => filterBy(cat)}
                              to={`/service/${cat.slug}`}
                              className="font-semibold text-lg capitalize"
                            >
                              {cat.title}
                            </button>
                          </li>
                        ))}
                      {load && !loadErr && (
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
                            <button
                              className=""
                              onClick={() => setRef(ref + 1)}
                            >
                              <span className="fa fa-refresh p-2 rounded-full ring-1"></span>
                              &nbsp; Click here to refresh
                            </button>
                          </p>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
                <div className="col-span-5">
                  <div className="p-4 flex overflow-y-auto mx-auto align-center justify-center">
                    <div
                      onClick={(e) => setFilterMain("fulltime-jobs")}
                      className={`mx-4 transition duration-500 cursor-pointer  ${
                        filterMain === "fulltime-jobs"
                          ? "p-2 rounded-lg ring-4 shadow-inner ring-teal-400 flex flex-row bg-zinc-100 "
                          : "p-2 rounded-lg ring-4 shadow-inner ring-gray-200 flex flex-row bg-zinc-50"
                      }`}
                    >
                      <span className="fa fa-business-time text-4xl text-sky-500 m-3 my-auto"></span>
                      <div className="flex-grow px-2 my-auto">
                        <p className="text-sm text-gray-400">
                          Posts by Agencies
                        </p>
                        <h4 className="text-xl font-bold text-gray-600 whitespace-nowrap">
                          Job Postings
                        </h4>
                      </div>
                      <button
                        className={` transition duration-500 rounded-lg m-2 my-auto text-gray-100 ring-1 ring-gray-50 p-2 ${
                          filterMain === "fulltime-jobs"
                            ? "bg-teal-400"
                            : " bg-white"
                        }`}
                      >
                        <span className="fa fa-check"></span>
                      </button>
                    </div>
                    <div
                      onClick={(e) => setFilterMain("service-professionals")}
                      className={`mx-4 transition duration-500 cursor-pointer  ${
                        filterMain === "service-professionals"
                          ? "p-2 rounded-lg ring-4 shadow-inner ring-teal-400 flex flex-row bg-zinc-100 "
                          : "p-2 rounded-lg ring-4 shadow-inner ring-gray-200 flex flex-row bg-zinc-50"
                      }`}
                    >
                      <span className="fa fa-address-book text-4xl text-sky-500 m-3 my-auto"></span>
                      <div className="flex-grow px-2 my-auto">
                        <p className="text-sm text-gray-400">
                          Search Service profiles
                        </p>
                        <h4 className="text-xl font-bold text-gray-600 whitespace-nowrap">
                          Service Professionals
                        </h4>
                      </div>
                      <button
                        className={` transition duration-500 rounded-lg m-2 my-auto text-gray-100 ring-1 ring-gray-50 p-2 ${
                          filterMain === "service-professionals"
                            ? "bg-teal-400"
                            : " bg-white"
                        }`}
                      >
                        <span className="fa fa-check"></span>
                      </button>
                    </div>
                  </div>
                  <hr />
                  <div className="w-full p-3 h-screen shadow-inner bg-neutral-50 text-gray-500 font-semibold text-base">
                    <div className="p-3 flex">
                      <div className="m-2 my-auto">
                        <p className="">{results.length} result(s)</p>
                      </div>
                      <div className="flex-grow"></div>
                      <div className="flex">
                        <p className="m-2 m-auto">Sort by:</p>
                        <select className="p-2 mr-4 my-auto rounded bg-white shadow">
                          <option>Best Match</option>
                          <option>Date</option>
                        </select>
                        <button className="p-2 ml-6 mr-2 text-gray-800 my-auto bg-white rounded shadow">
                          <span className="fa fa-list"></span>
                        </button>
                        <button className="p-2 mr-2 text-gray-800 my-auto bg-white rounded shadow">
                          <span className="fa fa-border-all"></span>
                        </button>
                      </div>
                    </div>
                    <div className="p-3">
                      <h2 className="text-3xl my-3">
                        {type === "jobs" && "Job Listings"}
                        {type === "service" && "Service Professionals"} for "
                        <span className="font-extrabold text-sky-400">
                          {query}
                        </span>
                        "
                      </h2>
                      <div className="py-6">
                        {loading && (
                          <div className=" transition p-2 py-4">
                            <div className="flex m-4">
                              <div className="rounded-lg m-2 my-auto w-24 h-24 bg-gray-300 animate-pulse" />
                              <div className="flex-grow p-2 m-2 my-auto">
                                <h3 className="m-2 bg-gray-300 animate-pulse w-5/6 p-3 rounded-full"></h3>
                                <div className="bg-gray-300 animate-pulse p-3 animate-pulse rounded-full w-full"></div>
                              </div>
                              <div className="my-auto text-right">
                                <p className="float-right w-32 m-2 p-3 rounded-full animate-pulse bg-sky-100"></p>
                                <p className="w-24 float-right rounded-full clear-both p-3 animate-pulse bg-slate-400 p-3"></p>
                                <p className="clear-both"></p>
                              </div>
                            </div>
                            <div className="flex m-4">
                              <div className="rounded-lg m-2 my-auto w-24 h-24 bg-gray-300 animate-pulse" />
                              <div className="flex-grow p-2 m-2 my-auto">
                                <h3 className="m-2 bg-gray-300 animate-pulse w-5/6 p-3 rounded-full"></h3>
                                <div className="bg-gray-300 animate-pulse p-3 animate-pulse rounded-full w-full"></div>
                              </div>
                              <div className="my-auto text-right">
                                <p className="float-right w-32 m-2 p-3 rounded-full animate-pulse bg-sky-100"></p>
                                <p className="w-24 float-right rounded-full clear-both p-3 animate-pulse bg-slate-400 p-3"></p>
                                <p className="clear-both"></p>
                              </div>
                            </div>
                            <div className="flex m-4">
                              <div className="rounded-lg m-2 my-auto w-24 h-24 bg-gray-300 animate-pulse" />
                              <div className="flex-grow p-2 m-2 my-auto">
                                <h3 className="m-2 bg-gray-300 animate-pulse w-5/6 p-3 rounded-full"></h3>
                                <div className="bg-gray-300 animate-pulse p-3 animate-pulse rounded-full w-full"></div>
                              </div>
                              <div className="my-auto text-right">
                                <p className="float-right w-32 m-2 p-3 rounded-full animate-pulse bg-sky-100"></p>
                                <p className="w-24 float-right rounded-full clear-both p-3 animate-pulse bg-slate-400 p-3"></p>
                                <p className="clear-both"></p>
                              </div>
                            </div>
                          </div>
                        )}
                        {!loading && error && (
                          <div className="p-2 py-4">
                            <div className="flex m-4">
                              <h3 className="m-2 p-3 text-red-400">
                                Search Failed: Error processing query
                              </h3>
                            </div>
                          </div>
                        )}
                        {!loading &&
                          type === "jobs" &&
                          results.length > 0 &&
                          results.map((result, _c) => (
                            <div
                              key={_c}
                              className="bg-white p-2 py-4 rounded-xl shadow-lg shadow-cyan-50 ring-1 ring-neutral-200"
                            >
                              <div className="flex">
                                <img
                                  className="rounded-lg m-2 my-auto w-32"
                                  src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/business-logo-design-template-78655edda18bc1196ab28760f1535baa_screen.jpg?ts=1617645324"
                                />
                                <div className="flex-grow p-2 m-2 my-auto">
                                  <h3 className="text-2xl font-thin">
                                    {result.title}
                                  </h3>
                                  <div className="text-slate-400 text-sm p-2 w-full">
                                    <p className="float-left capitalize">
                                      <span className="fa fa-building"></span>
                                      &nbsp; {result.user && result.user.title}
                                    </p>
                                    <p className="float-right">
                                      <span className="fa fa-map-pin"></span>
                                      &nbsp; {result.job_location}
                                    </p>
                                    <div className="clear-both"></div>
                                  </div>
                                </div>
                                <div className="flex-grow my-auto text-right">
                                  <span className="p-2 px-3 rounded-full text-sky-800 bg-sky-100">
                                    {result.job_type}
                                  </span>
                                  <p className="text-slate-400 text-sm p-2">
                                    <span className="fa fa-calendar"></span>
                                    &nbsp;
                                    {new Date(result.createdOn).toDateString()}
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() => {
                                  setActive(result);
                                  setShowJob(true);
                                }}
                                className="float-right text-sm text-gray-300 p-2"
                              >
                                Details &rarr;
                              </button>
                              <div className="clear-both"></div>
                            </div>
                          ))}
                        {type === "service" && (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {!loading &&
                              results.length > 0 &&
                              results.map((profile) => (
                                <div
                                  key={profile._id}
                                  className="p-2 my-3 ring-1 ring-neutral-200 bg-white rounded text-center shadow-lg shadow-cyan-100"
                                >
                                  <div className="text-right">
                                    <button
                                      onClick={() => {
                                        setShowPortfolio(true);
                                        setActive(profile);
                                      }}
                                      className="hover:text-blue-600 text-sky-600 px-3 py-1 font-bold"
                                    >
                                      View Profile &rarr;
                                    </button>
                                  </div>
                                  <div className="mt-3">
                                    <div
                                      className="w-32 h-32 m-auto bg-gray-500 rounded-full"
                                      style={{
                                        backgroundImage: `url(${
                                          profile.pic && profile.pic
                                        })`,
                                        backgroundPosition: "center",
                                        backgroundSize: "cover",
                                      }}
                                    />
                                    <h5 className="text-xl font-bold mb-1">
                                      {profile.name}
                                    </h5>
                                    <p className="text-gray-500 my-2 text-lg">
                                      {profile.tag}
                                    </p>
                                    <hr className="w-6 my-3 mx-auto" />
                                    <p className="text-gray-400 font-bold my-2 text-sm">
                                      Summary
                                    </p>
                                    <p className="text-gray-500 truncate font-thin m-2 text-sm">
                                      {profile.about}
                                    </p>
                                    <div className="m-2">
                                      {profile.subservice &&
                                        profile.subservice.map((s, i) => (
                                          <span
                                            key={s}
                                            className="capitalize text-sm rounded-full text-black font-thin"
                                          >
                                            {i > 0 && ", "}
                                            {s.replace(/-/g, " ")}
                                          </span>
                                        ))}
                                    </div>
                                    <p className="text-xs"></p>
                                  </div>
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
