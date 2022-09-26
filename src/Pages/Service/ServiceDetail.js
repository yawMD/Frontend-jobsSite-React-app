import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./index.css";
import PortfolioView from "../../Components/PortfolioView";
import { getData } from "../../Helpers/request";

function ServiceDetail(props) {
  const [services, setServices] = useState([]);
  const [subservices, setSubservices] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [active, setActive] = useState(null);
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const [ref, setRef] = useState(0);
  const load = [0, 1, 2, 3, 4];
  const h = useHistory();
  const { slug, sub } = useParams();
  const [serGot, setSerGot] = useState(false);
  useEffect(() => {
    console.log(slug);
    setProfiles([]);
    console.log(sub);
    if (slug === undefined) {
      h.push("/services");
    } else {
      setProfiles([]);
      // setServices([]);
      setSubservices([]);
      setErr(false);
      if (!serGot) {
        getData("/user/services")
          .then((d) => {
            if (!d.error) {
              setServices(d.services);
              setSerGot(true);
            } else {
              setErr(true);
              setErrMsg(d.message);
              toast.error("There was an error loading page data.");
            }
          })
          .catch((e) => {
            setErr(true);
            toast.error("There was an error loading page data.");
          });
      }

      getData(`/user/subservices/${slug}`)
        .then((d) => {
          // console.log(d);
          if (!d.error) {
            setSubservices(d.subservices);
          } else {
            setErr(true);
            toast.error("There was an error loading page data.");
          }
        })
        .catch((e) => {
          setErr(true);
          toast.error("There was an error loading page data.");
        });
      // console.log(sub ? "/" + sub : "");
      getData(`/user/profiles/services/${slug}/${sub ? "/" + sub : ""}`)
        .then((d) => {
          console.log(d);
          if (!d.error) {
            setProfiles(d.profiles);
          } else {
            setErrMsg(d.message);
            setErr(true);
          }
        })
        .catch((e) => {
          console.log(e);
          setErr(true);
        });
    }
  }, [slug, sub, ref]);
  return (
    <div className="my-8 p-0">
      <ToastContainer />
      <PortfolioView
        close={() => setShowPortfolio(false)}
        show={showPortfolio}
        profile={active}
      />
      <div className="w-full z-50">
        <div className="container relative ring-1 ring-zinc-100 p-3 mx-auto mb-8 rounded-2xl shadow-xl bg-white">
          <div className="shadow-lg bg-gradient-to-r from-sky-700 to-cyan-700 via-teal-700 rounded-lg mb-6 mb-12">
            <h2 className="text-3xl text-center font-semibold py-4 px-3 text-white my-2">
              Browse through our list of service professionals...
            </h2>
          </div>
          <div className="container grid grid-cols-1 md:grid-cols-6">
            <div className=" hidden md:block ">
              <div className="sticky top-0 p-3">
                <h3 className="font-bold text-3xl my-3 text-blue-700 capitalize">Services</h3>
                <ul className="list text-gray-700">
                  <li className="my-2">
                    <Link
                      to={`/services`}
                      className="font-semibold text-lg capitalize"
                    >
                      All Services
                    </Link>
                  </li>
                  {services.length === 0 && serGot && !err && (
                    <li className="w-full my-2">
                      <ul className="w-full">
                        <li className="h-6 w-full rounded animate-pulse my-3 bg-zinc-100"></li>
                        <li className="h-6 w-5/6 rounded animate-pulse my-3 bg-zinc-100"></li>
                        <li className="h-6 w-1/3 rounded animate-pulse my-3 bg-zinc-100"></li>
                        <li className="h-6 w-2/3 rounded animate-pulse my-3 bg-zinc-100"></li>
                      </ul>
                    </li>
                  )}
                  {services &&
                    services.map((cat) => (
                      <li key={cat._id} className="my-2">
                        <Link
                          to={`/service/${cat.slug}`}
                          className="font-semibold text-lg capitalize"
                        >
                          {cat.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="col-span-1 md:col-span-5 p-2 md:p-4">
              <div className="p-2 col-span-1 md:col-span-3">
                <div className="">
                  <h6 className="font-extrabold capitalize text-3xl text-sky-700">
                    {slug.replace(/-/g, " ")} Service Professionals
                  </h6>
                </div>
                <hr className="w-16 my-2" />
                <div>
                  <h3 className="text-md text-gray-400 font-semibold">
                    Find Professionals specializing in
                  </h3>
                  <div className="bg-zinc-50 ring-1 ring-zinc-100  shadow-inner p-1 rounded-full flex flex-row overflow-auto">
                    {subservices.map((subservice) => (
                      <Link
                        key={subservice._id}
                        to={`/service/${slug}/${subservice.slug}`}
                        className="bg-white ring-1 ring-zinc-200 shadow m-1 py-1 px-3 font-bold rounded-full text-black whitespace-nowrap"
                      >
                        {subservice.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {profiles.length === 0 &&
                  !err &&
                  load.map((m) => (
                    <div
                      key={m}
                      className="p-2 my-3 animate-pulse rounded text-center"
                    >
                      <div className="mt-5">
                        <div className="w-32 h-32 m-auto bg-gray-200 rounded-full" />
                        <h5 className="text-xl font-bold mb-1"></h5>
                        <p className="text-gray-500 my-2 text-lg w-full h-6 rounded bg-gray-200"></p>
                        <hr className="w-6 my-3 mx-auto" />
                        <p className="text-gray-400 font-bold my-2 text-sm h-6 rounded bg-gray-200 w-20 mx-auto"></p>
                        <div className="m-2 h-6 rounded bg-gray-200 h-6 rounded bg-gray-200"></div>
                        <p className="text-xs h-4 rounded bg-gray-200"></p>
                      </div>
                    </div>
                  ))}

                {err && profiles.length === 0 && (
                  <div className="bg-white rounded-t">
                    <div className="p-4 font-bold text-xl rounded-b capitalize bg-white">
                      <p className="w-full">
                        {`${
                          errMsg
                            ? errMsg
                            : "There was an error loading page data"
                        }`}
                        . <br />{" "}
                        <button
                          className=""
                          onClick={() => {
                            setRef(ref + 1);
                          }}
                        >
                          <span className="fa fa-refresh p-2 rounded-full ring-1"></span>
                          &nbsp; Click here to refresh
                        </button>
                      </p>
                    </div>
                  </div>
                )}

                {profiles &&
                  profiles.map((profile) => (
                    <div
                      key={profile._id}
                      className="p-2 my-3 ring-1 ring-blue-200 rounded text-center"
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
                          Services
                        </p>
                        <div className="m-2">
                          {profile.subservice.map((s, i) => (
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceDetail;
