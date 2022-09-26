import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { postData } from "../../../../Helpers/request";

export default function Security() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [type, setType] = useState("password")

  const updatePassword = (e) => {
    e.preventDefault();
    if (newPassword.length > 7 && newPassword === confirmPassword) {
      const tld = toast.loading("Updating your password... Please wait");
      postData("/user/me/password", { oldPassword, newPassword })
        .then((d) => {
          console.log(d);
          if (!d.error) {
            toast.update(tld, {
              render: d.message,
              type: "success",
              isLoading: false,
            });
          } else {
            toast.update(tld, {
              render: d.message,
              type: "error",
              isLoading: false,
            });
          }
        })
        .catch((e) => {
          console.log(e);
          toast.update(tld, {
            render: e.message,
            type: "error",
            isLoading: false,
          });
        })
        .finally((e) => {
          setTimeout(() => {
            toast.dismiss(tld);
          }, 4000);
        });
    } else {
      if (newPassword.length < 8) {
        toast.error("Password must be more than 7 characters");
      }
      if (newPassword !== confirmPassword) {
        toast.error("Passwords do not match");
      }
    }
  };

  const viewPassword = () => {
    if(type == "text") {
      setType("password")
    } else {
      setTimeout(() => setType("password"), 4000)
      setType("text")
    }
  }
  return (
    <div className="container bg-gray-50 rounded-lg p-3 py-6">
      <ToastContainer />
      <div className="px-2">
        <h2 className="px-4 py-6 font-bold text-3xl text-sky-700">
          Password &amp; Security
        </h2>
        <form
          onSubmit={updatePassword}
          className="bg-white ring-1 m-auto c ring-gray-100 rounded-lg"
        >
          <div className="flex p-4">
            <h3 className="font-bold text-2xl text-sky-500">Change Password</h3>
            <div className="flex-grow" />
          </div>
          <hr className="border-gray-100" />
          <div className="px-6 w-1/2">
            <div>
              <label className="text-gray-500 text-sm font-bold justify-bottom">
                Old Password
              </label>
              <input
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
                type={type}
                className="w-full p-2 ring-1 ring-gray-200 rounded-lg"
              />
            </div>
          </div>
          <div className="px-6 py-4 w-1/2">
            <div>
              <label className="text-gray-500 text-sm font-bold justify-bottom">
                New Password
              </label>
              <input
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                type={type}
                className="w-full p-2 ring-1 ring-gray-200 rounded-lg"
              />
            </div>
          </div>
          <div className="px-6 py-4 w-1/2">
            <div>
              <label className="text-gray-500 text-sm font-bold justify-bottom">
                Confirm New Password
              </label>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                type={type}
                className="w-full p-2 ring-1 ring-gray-200 rounded-lg"
              />
            </div>
            <small><button className="text-sm underline text-blue-600" type="button" onClick={viewPassword}>View Passwords</button></small>
          </div>
          <div className="p-3 text-right">
            <button
              type="submit"
              className="px-3 py-2 rounded-full bg-sky-700 text-white"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
