import React, { useEffect, useState } from "react";
import { getData } from "../Helpers/request";

function ViewService(props) {
  const [subServices, setSubServices] = useState([]);
  const [get, setGet] = useState(0);

  useEffect(() => {
    // alert();
    getData(`/admin/service/${props.service.slug}`)
      .then((d) => {
        console.log(d);
        if (!d.error) {
          setSubServices(d.services);
          // setSkills(d.skills);
        }
      })
      .catch((e) => console.log(e));
  }, [get]);

  useEffect(() => {
    // console.log("here");
    if (props.show === true) {
      setGet(get + 1);
    }
  }, [props.show]);
  return (
    <div
      className={`${
        props.show
          ? "h-screen w-full fixed flex flex-wrap content-center bg-blue-200 bg-opacity-80 visible z-50 left-0 top-0"
          : "invisible hidden"
      } `}
    >
      <div className="container m-auto v w-1/2 bg-white rounded shadow p-7">
        <h1 className="float-left font-semibold text-lg text-blue-500">
          {props.service.title}
        </h1>
        <button
          type="button"
          onClick={() => props.close()}
          className="px-3 py-2 rounded bg-red-400 hover:bg-gray-200 float-right font-semibold text-lg text-gray-100"
        >
          x
        </button>
        <div className="py-6 clear-both">
          <div className="p-3">
            <h3 className="my-2 font-light font-blue-800 text-3xl">
              Sub-Services
            </h3>
            <div className="flex flex-wrap">
              {subServices.map((sc, _i) => (
                <span key={_i} className="p-2 m-2 border-r-2 border-gray-200">
                  {sc.title}
                </span>
              ))}
            </div>
          </div>
          <hr />
          {/* <div className="p-3">
            <h3 className="my-2 font-light font-blue-800 text-3xl">Skills</h3>
            <div className="flex flex-wrap">
              {skills.map((skill, _i) => (
                <span
                  key={_i}
                  className="m-2 p-1 px-3 bg-gray-500 text-white rounded-l-full rounded-r-full"
                >
                  {skill.title}
                </span>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default ViewService;
