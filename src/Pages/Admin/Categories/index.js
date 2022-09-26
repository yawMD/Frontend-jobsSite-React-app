import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import AddCategory from "../../../Components/AddCategory";
import ViewCategory from "../../../Components/ViewCategory";
import AddSubCategory from "../../../Components/AddSubCategory";
import AddSkill from "../../../Components/AddSkill";
import { isAuth, signout } from "../../../Helpers/auth";
import { getData, postData } from "../../../Helpers/request";

function Categories(props) {
  const [categories, setCategories] = useState([]);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showViewCategory, setShowViewCategory] = useState(false);
  const [showAddSubCategory, setShowAddSubCategory] = useState(false);
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [active, setActive] = useState({});

  const getCategories = () => {
    toast.info("Please Wait. Fetching Categories...");
    getData("/admin/categories")
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
          setCategories(data.categories);
        }
      })
      .catch((err) => console.log("err", err));
  };

  useEffect(getCategories, []);

  const catAction = (msg, id, data) => {
    if (window.confirm(msg)) {
      toast.info("Updating Category...");
      postData(`/admin/category/${id}`, data)
        .then((e) => {
          //   console.log(e);
          getCategories();
        })
        .catch((e) => console.error(e));
    }
  };

  const handleShow = (d, i) => {
    setActive(d);
    if (i === 1) {
      setShowAddSubCategory(true);
    } else if (i === 2) {
      setShowAddSkill(true);
    } else if (i === 3) {
      setShowViewCategory(true);
    }
  };

  return (
    <div className="h-screen overflow-auto bg-gray-50 w-full">
      {!isAuth() || isAuth().type !== "admin" ? (
        <Redirect to="/admin/login" />
      ) : null}
      <ToastContainer />
      {showAddCategory && (
        <AddCategory
          show={showAddCategory}
          close={() => setShowAddCategory(false)}
        />
      )}
      {showViewCategory && (
        <ViewCategory
          category={active}
          show={showViewCategory}
          close={() => setShowViewCategory(false)}
        />
      )}
      {showAddSubCategory && (
        <AddSubCategory
          category={active}
          show={showAddSubCategory}
          close={() => setShowAddSubCategory(false)}
        />
      )}
      {showAddSkill && (
        <AddSkill
          category={active}
          show={showAddSkill}
          close={() => setShowAddSkill(false)}
        />
      )}
      <div className="container mx-au to w-11/12 pt-10 px-5 h-full">
        <div className="container mx-auto pt-10 mt-8 px-8">
          <h1 className="float-left font-semibold text-2xl">
            Categories
            <br />
            <button
              className="p-1 mt-1 text-sm border-2 border-blue-400 bg-blue-300 text-white rounded"
              onClick={getCategories}
            >
              Refresh
            </button>
          </h1>
          <button
            className="float-right cursor-pointer shadow bg-gray-800 rounded-2xl text-xs uppercase px-5 py-2 text-gray-50 font-semibold hover:bg-gray-700 hover:shadow-lg tracking-widest"
            onClick={() => {
              setShowAddCategory(!showAddCategory);
            }}
          >
            <i className="fa fa-plus"></i> Add Category
          </button>
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
                <th className="p-3 font-medium text-left w-4/5">Category</th>
                {/* <th className="p-3 font-medium w-1/5">Description</th> */}
                <th className="p-3 font-medium w-1/5 text-right">...</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => {
                return (
                  <tr
                    key={category._id}
                    className="text-center bg-white border-b-2 border-gray-100 rounded-lg hover:bg-gray-50"
                  >
                    <td className="px-3 py-3 text-left relative flex flex-wrap">
                      <div
                        className="h-20 w-20 rounded-full bg-blue-200"
                        style={{
                          backgroundImage: `url(${category.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }}
                      ></div>
                      <div className=" ml-4 my-auto">
                        <h2 className="font-bold text-gray-700 my-auto">
                          {category.title}
                        </h2>
                        {/* <br /> */}
                        {category.enabled ? (
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
                      <div className="flex flex-row">
                        {!category.enabled ? (
                          <button
                            onClick={() =>
                              catAction(
                                "Confirm Enable Category",
                                category._id,
                                {
                                  enabled: true,
                                }
                              )
                            }
                            className="p-2 rounded whitespace-nowrap bg-green-400 font-semibold text-white mr-2"
                          >
                            Enable
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              catAction(
                                "Confirm Disable Category",
                                category._id,
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
                          onClick={() => handleShow(category, 1)}
                          className="p-2 rounded whitespace-nowrap bg-blue-400 font-semibold text-white mr-2"
                        >
                          + Sub-category
                        </button>
                        <button
                          onClick={() => handleShow(category, 2)}
                          className="p-2 rounded whitespace-nowrap bg-blue-400 font-semibold text-white mr-2"
                        >
                          + Skill
                        </button>
                        <button
                          onClick={() => handleShow(category, 3)}
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

export default Categories;
