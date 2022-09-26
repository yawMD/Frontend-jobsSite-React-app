import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./index.css";
import PortfolioView from "../../Components/PortfolioView";
import { getData } from "../../Helpers/request";

function Portfolios(props) {
  // const [show, setShow] = useState(true);
  const [categories, setCategories] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [active, setActive] = useState(null);
  const [err, setErr] = useState(false);
  const [ref, setRef] = useState(0);
  const load = [0, 1, 2, 3, 4];

  useEffect(() => {
    getData("/user/categories")
      .then((d) => {
        if (!d.error) {
          setCategories(d.categories);
        } else {
          setErr(true);
          toast.error("There was an error loading page data.");
        }
      })
      .catch((e) => {
        setErr(true);
        toast.error("There was an error loading page data.");
      });

    getData("/user/profiles")
      .then((d) => {
        console.log(d);
        if (!d.error) {
          setProfiles(d.profiles);
        }
      })
      .catch((e) => console.log(e));
  }, [ref]);
  return (
    <div className="my-8 p-0">
      {/* <ToastContainer /> */}
      <PortfolioView
        close={() => setShowPortfolio(false)}
        show={showPortfolio}
        profile={active}
      />
      <div className="w-full z-50">
        <div className="container ring-1 ring-zinc-100 relative p-3 mx-auto mb-8 rounded-2xl shadow-xl bg-white grid grid-cols-1 md:grid-cols-6">
          <div className="col-span-1 md:col-span-6 shadow-lg bg-gradient-to-r from-sky-700 to-cyan-700 via-teal-700 rounded-lg mb-6 mb-12">
            <h2 className="text-3xl text-center font-semibold py-4 px-3 text-white my-2">
              Browse through our list of workers, all ready and eager to help
              you complete your projects
            </h2>
          </div>
          <div className="hid den">
            <div className="sticky top-0 p-3">
              <h3 className="font-bold text-3xl my-3 text-cyan-700 capitalize">
                Categories
              </h3>
              <ul className="list">
                {categories &&
                  categories.map((cat) => (
                    <li key={cat._id} className="my-2">
                      <Link
                        to={`/portfolio/${cat.slug}`}
                        className="font-semibold text-lg capitalize"
                      >
                        {cat.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className=" col-span-1 md:col-span-5 p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-2 col-span-1 md:col-span-4">
              <div className="">
                <h6 className="font-extrabold text-3xl text-sky-900">
                  Job Seeker Profiles
                </h6>
              </div>
              <hr className="w-16 my-2" />
            </div>

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

            {profiles &&
              profiles.map((profile) => (
                <div
                  key={profile._id}
                  className="p-2 my-3 ring-1 ring-blue-200 rounded text-center"
                >
                  <div className="mt-5">
                    {profile.pic && (
                      <div
                        className="w-32 h-32 m-auto bg-gray-500 rounded-full"
                        style={{
                          backgroundImage: `url(${profile.pic})`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                        }}
                      />
                    )}
                    <h5 className="text-xl font-bold mb-1">{profile.name}</h5>
                    <p className="text-gray-500 my-2 text-lg">{profile.tag}</p>
                    <hr className="w-6 my-3 mx-auto" />
                    <p className="text-gray-400 font-bold my-2 text-sm">
                      Skills
                    </p>
                    <div className="m-2">
                      {profile.skill.map((s) => (
                        <button
                          key={s}
                          className="lowercase text-sm py-1 px-2 mr-1 rounded-full text-black font-thin bg-gray-300"
                        >
                          {s.replace(/-/g, " ")}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs"></p>
                  </div>
                  <button
                    onClick={() => {
                      setShowPortfolio(true);
                      setActive(profile);
                    }}
                    className="rounded-full bg-gradient-to-r my-3 from-green-700 via-green-500 to-green-700 text-white px-3 py-1 font-bold"
                  >
                    View Profile
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Portfolios;
