import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { isAuth } from "../../../Helpers/auth";
import JobSeeker from "./JobSeeker";
import Agency from "./Agency";
import Service from "./Service";

function Home(props) {
  return !isAuth() ? (
    <Redirect to="/login" />
  ) : isAuth().status === "agency" ? (
    <Agency />
  ) : isAuth().status === "service" ? (
    <Service />
  ) : (
    <JobSeeker />
  );
}

export default Home;
