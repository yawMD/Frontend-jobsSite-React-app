import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import AddService from "../../../Components/AddService";
import AddServiceCategory from "../../../Components/AddServiceCategory";
import ViewService from "../../../Components/ViewService";
import AddSubService from "../../../Components/AddSubService";
import UpdateService from "../../../Components/UpdateService";

import { isAuth, signout } from "../../../Helpers/auth";
import { getData, postData } from "../../../Helpers/request";

function Services(props) {
  const [services, setServices] = useState([]);
  const [showAddService, setShowAddService] = useState(false);
  const [showAddServiceCategory, setShowAddServiceCategory] = useState(false);
  const [showViewService, setShowViewService] = useState(false);
  const [showAddSubService, setShowAddSubService] = useState(false);
  const [showUpdateService, setShowUpdateService] = useState(false);

  const [active, setActive] = useState({});

  const getServices = () => {
    toast.info("Please Wait. Fetching Services...");
    getData("/admin/services")
      .then((data) => {
        if (data.error) {
          if (data.message === "Access Denied") {
            if (
              window.confirm(
                "Fetching data failed. Login again to verify your credentials"
              )
            ) {
              signout();
            }
          } else {
            toast.error(data.message);
          }
        } else {
          // console.log(data);
          setServices(data.services);
        }
      })
      .catch((err) => console.log("err", err));
  };

  useEffect(getServices, []);

  const catAction = (msg, id, data) => {
    if (window.confirm(msg)) {
      toast.info("Updating Service...");
      postData(`/admin/service/${id}`, data)
        .then((e) => {
          //   console.log(e);
          getServices();
        })
        .catch((e) => console.error(e));
    }
  };

  const handleShow = (d, i) => {
    setActive(d);
    if (i === 1) {
      setShowAddSubService(true);
    } else if (i === 2) {
      // setShowAddSkill(true);
    } else if (i === 3) {
      setShowViewService(true);
    } else if (i === 4) {
      setShowUpdateService(true);
    }
  };

  return (
    <div className="h-screen overflow-auto bg-gray-50 w-full">
      {!isAuth() || isAuth().type !== "admin" ? (
        <Redirect to="/admin/login" />
      ) : null}
      <ToastContainer />
      <AddService
        show={showAddService}
        close={() => setShowAddService(false)}
      />
      <AddServiceCategory
        show={showAddServiceCategory}
        close={() => setShowAddServiceCategory(false)}
      />
      {showViewService && (
        <ViewService
          service={active}
          show={showViewService}
          close={() => setShowViewService(false)}
        />
      )}
      <AddSubService
        service={active}
        show={showAddSubService}
        close={() => setShowAddSubService(false)}
      />
      <UpdateService
        service={active}
        show={showUpdateService}
        close={() => setShowUpdateService(false)}
      />
      <div className="container mx-au to w-11/12 pt-10 px-5 h-full">
        <div className="container mx-auto pt-10 mt-8 px-8 flex">
          <h1 className="flex-grow font-semibold text-2xl">
            Services
            <br />
            <button
              className="p-1 mt-1 text-sm border-2 border-blue-400 bg-blue-300 text-white rounded"
              onClick={getServices}
            >
              Refresh
            </button>
          </h1>
          <div className="text-right">
            <button
              className="block mb-1 cursor-pointer shadow bg-gray-800 rounded-2xl text-xs uppercase px-5 py-2 text-gray-50 font-semibold hover:bg-gray-700 hover:shadow-lg tracking-wide"
              onClick={() => {
                setShowAddServiceCategory(!showAddServiceCategory);
              }}
            >
              <i className="fa fa-plus"></i> Add Service Category
            </button>
            <button
              className="block cursor-pointer shadow bg-gray-800 rounded-2xl text-xs uppercase px-5 py-2 text-gray-50 font-semibold hover:bg-gray-700 hover:shadow-lg tracking-widest"
              onClick={() => {
                setShowAddService(!showAddService);
              }}
            >
              <i className="fa fa-plus"></i> Add Service
            </button>
          </div>
          <div className="clear-both"></div>
        </div>
        <div className="container mx-auto pt-10 mt-8 px-8">
          <input
            className="w-full rounded shadow-md hover:shadow-lg p-4 ring-1 ring-gray-100 hover:ring-gray-200"
            placeholder="Search"
          />
        </div>
        <div className="container mx-auto mt-4 px-8">
          <table className="table-fixed  min-w-80 rounded-lg shadow">
            <thead className="text-sm uppercase p-4 font-thin bg-blue-50 text-gray-400">
              <tr className="">
                <th className="p-3 font-medium text-left w-4/5">Service</th>
                {/* <th className="p-3 font-medium w-1/5">Description</th> */}
                <th className="p-3 font-medium w-1/5 text-right">...</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => {
                return (
                  <tr
                    key={service._id}
                    className="text-center bg-white border-b-2 border-gray-100 rounded-lg hover:bg-gray-50"
                  >
                    <td className="px-3 py-3 text-left relative flex flex-wrap">
                      <div
                        className="h-20 w-20 rounded-full bg-blue-200"
                        style={{
                          backgroundImage: `url(${service.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }}
                      ></div>
                      <div className=" ml-4 my-auto">
                        <h2 className="mr-2 text-lg font-bold text-gray-700 my-auto">
                          {service.title}
                        </h2>
                        <div className="">
                          <span className="text-sm font-semibold text-sky-300">
                            {service.service_category}
                          </span>
                        </div>
                        {service.enabled ? (
                          <span className="text-sm font-semibold bg-green-300 p-1 rounded text-gray-100">
                            Enabled
                          </span>
                        ) : (
                          <span className="text-sm font-semibold bg-red-300 p-1 rounded text-gray-100">
                            Disabled
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-6 text-right">
                      <div className="flex flex-row text-sm">
                        {!service.enabled ? (
                          <button
                            onClick={() =>
                              catAction("Confirm Enable Service", service._id, {
                                enabled: true,
                              })
                            }
                            className="p-2 rounded whitespace-nowrap bg-green-400 font-semibold text-white mr-2"
                          >
                            Enable
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              catAction(
                                "Confirm Disable Service",
                                service._id,
                                {
                                  enabled: false,
                                }
                              )
                            }
                            className="p-2 rounded whitespace-nowrap bg-red-400 font-semibold text-white mr-2"
                          >
                            Disable
                          </button>
                        )}

                        <button
                          onClick={() => handleShow(service, 1)}
                          className="p-2 rounded whitespace-nowrap bg-blue-400 font-semibold text-white mr-2"
                        >
                          + Sub-service
                        </button>
                        <button
                          onClick={() => handleShow(service, 4)}
                          className="p-2 rounded whitespace-nowrap bg-slate-400 font-semibold text-white mr-2"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleShow(service, 3)}
                          className="p-2 rounded whitespace-nowrap bg-white border-2 border-pink-400 font-semibold text-pink-400 mr-2"
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="h-20"></div>
      </div>
    </div>
  );
}

export default Services;
