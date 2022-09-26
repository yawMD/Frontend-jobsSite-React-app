import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { signout } from "../../../Helpers/auth";
import { ToastContainer, toast } from "react-toastify";
import { getData, postData } from "../../../Helpers/request";

function Users(props) {
  const [buyers, setBuyers] = useState([]);
  const [count, setCount] = useState();
  useEffect(() => {
    getCustomers();
  }, [count]);

  const getCustomers = () => {
    toast("Please Wait. Fetching Users...");
    getData("/admin/customers")
      .then((data) => {
        console.log(data);
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
          // console.log(data)
          setBuyers(data.users);
          // setCount(data.merchants.length);
        }
      })
      .catch((err) => {
        console.log("err", err);
        toast.error("An error occurred fetching users");
      });
  };

  return (
    <div className="h-screen overflow-auto bg-gray-50 w-full">
      <ToastContainer />
      <div className="container mx-au to w-full lg:w- 11/12 pt-10 px-5 h-full">
        <div className="container mx-auto pt-10 mt-8 px-8">
          <h1 className="float-left font-semibold text-2xl">Users</h1>
          <div className="clear-both"></div>
        </div>
        <div className="container mx-auto pt-10 mt-8 px-8">
          <input
            className="w-full rounded shadow-md hover:shadow-lg p-4 ring-1 ring-gray-100 hover:ring-gray-200"
            placeholder="Search Users..."
          />
        </div>
        <div className="container mx-auto mt-8 px-8">
          <h1 className="m-2 font-semibold text-lg">All Users</h1>
          <table className="table w-full rounded-lg shadow">
            <thead className="rounded-t-lg uppercase font-thin bg-blue-500 text-white">
              <tr className="">
                <th className="p-3">#</th>
                <th className="p-3 font-medium ">Name</th>
                <th className="p-3 font-medium ">Phone</th>
                <th className="p-3 font-medium ">Account Type</th>
                <th className="p-3 font-medium" colSpan="2">
                  email
                </th>
              </tr>
            </thead>
            <tbody>
              {buyers.map((user, i) => {
                return (
                  <tr
                    key={user._id}
                    className=" bg-white border-b-2 border-gray-100 rounded-lg hover:bg-gray-50"
                  >
                    <td className="p-3">
                      <span className="text-blue-800">{i + 1}</span>
                    </td>
                    <td className="p-3">
                      <span className="text-lg text-gray-800">{user.name}</span>
                    </td>
                    <td className="p-3" colSpan="">
                      {user.phone}
                    </td>
                    <td className="capitalize p-3 text-center">
                      {user.status}
                    </td>
                    <td className="text-right p-3" colSpan="2">
                      {user.email}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="h-24"></div>
      </div>
    </div>
  );
}

export default Users;
