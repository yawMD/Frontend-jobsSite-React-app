import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./index.css";
import jumbotron from "../../assets/image/jumbotron.jpg";
import { getData } from "../../Helpers/request";

function Home(props) {
  const h = useHistory();
  // const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [ref, setRef] = useState(0);
  const load = [0, 1, 2];
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    setCategories([]);
    setError(false);
    getData("/user/categories")
      .then((d) => {
        if (!d.error) {
          setCategories(d.categories);
        } else {
          setError(true);
          toast.error("There was an error loading page data");
        }
      })
      .catch((e) => {
        setError(true);
        toast.error("There was an error loading page data");
      });
  }, [ref]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (filter) {
      let param = encodeURI(
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
      );
      h.push(`/search/${filter}/all?q=${param}`);
    } else {
      toast.error("Search Failed: Select a query filter to search");
    }
  };
  return (
    <div className="containerm-0 p-0">
      <div className="w-full h-full z-50">
        <ToastContainer />
        <div className="h-full p-4">
          <div className="h-20" />
          <div className="container c m-auto grid grid-cols-1 md:grid-cols-2 ">
            <div className="px-3 flex flex-col justify-center align-center">
              <div className="my-auto">
                <h2 className="text-5xl text-sky-600 font-semibold py-4">
                  Find the right talent and professionals for your projects
                </h2>
                <form
                  onSubmit={handleSearch}
                  className="flex flex-row text-lg drop-shadow-lg hover:drop-shadow transition duration-300 rounded-lg"
                >
                  <input
                    className="w-full p-3 flex-grow rounded-l-full ring-1 ring-sky-300"
                    placeholder="What are you looking for?"
                    name="query"
                    required
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <select
                    value={filter}
                    required
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-full ring-1 ring-sky-200 p-3 rounded-r-full"
                  >
                    <option value={null}>Filter query to...</option>
                    {/* <option value="job-seeker-profiles">Job Seekers</option>
                    <option value="freelancer-profiles">Freelancers</option> */}
                    <option value="fulltime-jobs">Job Postings</option>
                    {/* <option value="freelance-jobs">
                      Remote/Freelance Work
                    </option> */}
                    <option value="service-professionals">
                      Service professionals
                    </option>
                  </select>
                  <button
                    type="submit"
                    className="ml-3 rounded-full p-3 px-5 text-white bg-sky-400 hover:bg-sky-500 transition duration-300 font-semibold ring-1 ring-sky-200 shadow"
                  >
                    Search
                  </button>
                </form>
              </div>
            </div>
            <div className="h-full m-0 p-0">
              <img className="m-0 p-0 h-full my-auto w-full" src={jumbotron} />
            </div>
          </div>
        </div>
        <div className="bg-sky-400 px-4">
          <div className="container c text-center text-lg md:text-2xl text-white m-auto grid grid-cols-1 md:grid-cols-3">
            {/* <div className="p-6 py-12 text-center bg-sky-500">
              <Link to="/portfolios">Find Talent</Link>
            </div> */}
            <div className="p-6 py-12 text-center bg-sky-600">
              <Link to="/services">Explore Services</Link>
            </div>
            <div className="p-6 py-12 text-center bg-sky-700">
              <Link to="/jobs">Find Freelance Jobs</Link>
            </div>
            <div className="p-6 py-12 text-center bg-sky-500">
              <Link to="/me/jobs">Post Jobs</Link>
            </div>
          </div>
        </div>
        <hr />
        <div className="py-8 px-4 bg-zinc-50">
          <div className="container c mx-auto py-6">
            <p className="font-semibold text-md text-sky-500 mb-2">
              Go through our recently added categories to find gigs meant for
              you
            </p>
            <h3 className="font-semibold text-5xl mb-4">Browse Categories</h3>
            <div className="py-8 grid gap-4 grid-cols-1 md:grid-cols-3">
              {categories &&
                categories.map((cat) => (
                  <Link to={`/jobs/fulltime/${cat.slug}`} key={cat._id}>
                    <div className="flex flex-col drop-shadow rounded-t">
                      <div
                        className="bg-black h-60 rounded"
                        style={{
                          backgroundImage: `url(${cat.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                      <div className="p-4 font-bold text-xl rounded-b capitalize bg-white">
                        <p>{cat.title}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              {categories.length === 0 &&
                !error &&
                load.map((e) => (
                  <div key={e} className="flex flex-col bg-white rounded-t">
                    <div className="bg-gray-300 h-60 rounded animate-pulse" />
                    <div className="p-4 w-full font-bold text-xl rounded-b capitalize bg-white">
                      <p className="w-full rounded-full h-6 bg-gray-300 my-2 animate-pulse"></p>
                      <p className="w-4/6 h-6 rounded-full bg-gray-300 my-2 animate-pulse"></p>
                    </div>
                  </div>
                ))}
              {error && (
                <div className="flex flex-col bg-white rounded-t">
                  <div className="p-4 font-bold text-xl rounded-b capitalize bg-white">
                    <p className="w-full">
                      There was an error loading page data. <br />{" "}
                      <button className="" onClick={() => setRef(ref + 1)}>
                        <span className="fa fa-refresh p-2 rounded-full ring-1"></span>
                        &nbsp; Click here to refresh
                      </button>
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="text-right text-sky-500 font-semibold text-lg my-3">
              <Link to="/jobs">Look through all jobs &rarr;</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
