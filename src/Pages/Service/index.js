import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./index.css";
import { getData } from "../../Helpers/request";

function Service(props) {
  const {cat} = useParams()
  const h = useHistory()
  const [error, setError] = useState(false);
  const [ref, setRef] = useState(0);
  const load = [0, 1, 2];
  const [services, setServices] = useState([]);
  const [serviceCategories, setServiceCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');

  useEffect(() => {
    setServices([]);
    setError(false);
    getData("/user/service-categories")
      .then((d) => {
        if (!d.error) {
          setServiceCategories(d.categories);
          if(cat) {
            setActiveCategory(cat)
          } else {
            let temmp = d.categories[0]
            setActiveCategory(temmp.slug)
            h.push(`/services/cat/${temmp.slug}`)
          }
        } else {
          setError(true);
          toast.error("There was an error loading service categories");
        }
      })
      .catch((e) => {
        setError(true);
        toast.error("There was an error loading service categories");
      });

    return () => {
      setServiceCategories([]);
    };
  }, [ref]);

  useEffect(() => {
    // console.log('hree', cat)
    // if(cat === undefined) {
    //   setRef(ref+1)
    // }
    if (activeCategory) {
      setServices([]);
      setError(false);
      getData("/user/services/" + activeCategory)
        .then((d) => {
          if (!d.error) {
            setServices(d.services);
          } else {
            setError(true);
            toast.error("There was an error loading page data");
          }
        })
        .catch((e) => {
          setError(true);
          toast.error("There was an error loading page data");
        });
    } else {
      // setRef(ref+1)
    }
  }, [activeCategory, ref, cat]);
  return (
    <div className="m-0 p-0">
      <div className="w-full h-full z-50">
        <ToastContainer />
        <div className="py-8 bg-zinc-50">
          <div className="container bg-white ring-zinc-100 rounded shadow mx-auto p-4">
            <p className="font-semibold text-md text-sky-500 mb-2">
              Search through our services lists to find what you're looking for
              you
            </p>
            <h3 className="font-semibold text-4xl mb-4">
              Browse professionals in the various services
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4">
              <div className="hidden md:block">
                <h3 className="font-bold text-3xl my-3 text-blue-700 capitalize">
                  Service Categories
                </h3>
                <ul>
                  {serviceCategories &&
                    serviceCategories.map((cat, _c) => (
                      <li className="my-2" key={_c}>
                        <button
                          onClick={() => {h.push(`/services/cat/${cat.slug}`);setActiveCategory(cat.slug)}}
                          className={`font-semibold text-lg capitalize ${activeCategory === cat.slug ? 'text-sky-500' : ' text-gray-700'}`}
                        >
                          {cat.title}
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
              <div className="p-3 py-8 md:col-span-3 grid gap-4 grid-cols-1 md:grid-cols-3">
                {services &&
                  services.map((service) => (
                    <Link to={`/service/${service.slug}`} key={service._id}>
                      <div className="flex flex-col rounded-b-lg shadow hover:shadow-lg transition rounded-t">
                        <div
                          className="bg-black h-60 rounded"
                          style={{
                            backgroundImage: `url(${service.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        />
                        <div className="p-4 font-bold text-xl rounded-b capitalize bg-white">
                          <p>{service.title}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                {services.length === 0 &&
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
                  <div className="col-span-1 md:col-span-3 flex flex-col bg-white rounded-t">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Service;
