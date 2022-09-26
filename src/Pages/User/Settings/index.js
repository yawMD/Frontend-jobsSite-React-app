import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import UserMenu from "../../../Components/UserMenu";
import Billing from "./Pages/Billing";
import Notifications from "./Pages/Notifications";
import Profile from "./Pages/Profile";
import Security from "./Pages/Security";

export default function Settings() {
  const h = useHistory();
  const { page } = useParams();
  const [component, setComponent] = useState(<div />);
  useEffect(() => {
    switch (page) {
      case "billing":
        setComponent(<Billing />);
        break;
      case "profile":
        setComponent(<Profile />);
        break;
      case "security":
        setComponent(<Security />);
        break;
      case "notifications":
        setComponent(<Notifications />);
        break;
      case undefined:
        setComponent(<Billing />);
        break;
      default:
        h.push("/me/home");
    }

    return () => {};
  }, [page]);

  return (
    <div className="h-screen w-screen">
      <UserMenu />
      <div className="h-fill w-screen overflow-auto">
        <div className="h-16" />
        <div className="container m-auto grid grid-cols-1 md:grid-cols-6 gap-3">
          <div className="flex flex-col">
            <h2 className="font-bold text-2xl m-2 my-4 text-sky-700">
              Billing
            </h2>
            <Link
              to="/me/settings/billing"
              className="border-l-4 border-sky-700 m-2 px-2"
            >
              Billing &amp; Payments
            </Link>
            <hr className="my-6" />
            <h2 className="font-bold text-2xl m-2 text-sky-700">
              User Settings
            </h2>
            <Link
              to="/me/settings/profile"
              className="border-l-6 border-sky-700 m-2 px-2"
            >
              Profile Settings
            </Link>
            <Link
              to="/me/settings/security"
              className="border-l-6 border-sky-700 m-2 px-2"
            >
              Password &amp; Security
            </Link>
            <Link
              to="/me/settings/notifications"
              className="border-l-6 border-sky-700 m-2 px-2"
            >
              Notifications
            </Link>
          </div>
          <div className="col-span-5 p-6">{component}</div>
        </div>
      </div>
    </div>
  );
}
