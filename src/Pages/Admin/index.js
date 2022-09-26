import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { isAuth } from "../../Helpers/auth";

function AdminHome(props) {
  const [merchants, setMerchants] = useState([]);
  const userAction = (a, b, c, d) => {};
  return (
    <div className="h-screen bg-gray-50 w-full overflow-auto">
      {!isAuth() || isAuth().type !== "admin" ? (
        <Redirect to="/admin/login" />
      ) : null}
      <div className="container mx-auto w-full md:w-11/12 pt-5 md:pt-10 px-5 h-auto">
        <div className="container mx-auto pt-5 md:pt-10 mt-8 px-2 md:px-8">
          <h1 className="float-left font-semibold text-2xl">Welcome Back</h1>
          <div className="clear-both"></div>
          <h2 className="text-lg">View users, job postings and categories</h2>
        </div>
      </div>
      <div className="container mx-auto w-full md:w-11/12 pt-5 md:pt-10 px-5 h-auto">
        <div className="container mx-auto pt-5 md:pt-10 mt-8 px-2 md:px-8">
          <h1 className="float-left font-semibold text-2xl">
            Platform Summary
          </h1>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
