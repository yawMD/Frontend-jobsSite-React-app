import React, { useState } from "react";

export default function Profile() {
  const [showAddPayment, setShowAddPayment] = useState(false);
  return (
    <div className="container bg-gray-50 rounded-lg p-3 py-6">
      <div className="px-2">
        <h2 className="px-4 py-6 font-bold text-3xl text-sky-700">
          Profile Settings
        </h2>
        <div className="bg-white ring-1 m-auto c ring-gray-100 rounded-lg">
          <div className="flex p-4">
            <h3 className="font-bold text-2xl text-sky-500">My Profile</h3>
            <div className="flex-grow" />
            <button
              className="ring-1 px-3 py-2 rounded-full"
              onClick={() => setShowAddPayment(!showAddPayment)}
            >
              <span className="fa fa-eye"></span> My Profile as others see it
            </button>
          </div>
          <hr className="border-gray-100" />
          <div className="p-6 flex flex-row">
            <div>
              <label className="text-gray-500 text-sm font-bold justify-bottom">
                Work Preference
              </label>
              <input className="w-full p-2 ring-1 ring-gray-200 rounded-lg" />
            </div>
            <div className="flex-grow " />
            <div className="">
              <button className="px-3 py-2 rounded-full bg-sky-700 text-white">
                Update
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white ring-1 m-auto c mt-6 ring-gray-100 rounded-lg">
          <div className="flex p-4">
            <h3 className="font-bold text-2xl text-sky-500">
              Experience Level
            </h3>
            <div className="flex-grow" />
          </div>
          <hr className="border-gray-100" />
          <div className="p-6 grid gap-6 grid-cols-1 md:grid-cols-3">
            <div className="text-center ring-1 ring-gray-200 p-3">
              <input type={"radio"} className="p-3" />
              <div className="font-semibold">Entry Level</div>
              <div className="text-sm">I am relatively new to this field</div>
            </div>
            <div className="text-center ring-1 ring-gray-200 p-3">
              <input type={"radio"} className="p-3" />
              <div className="font-semibold">Intermediate</div>
              <div className="text-sm">
                I have substantial Experience this field
              </div>
            </div>
            <div className="text-center ring-1 ring-gray-200 p-3">
              <input type={"radio"} className="p-3" />
              <div className="font-semibold">Expert</div>
              <div className="text-sm">
                I have comprehensive and deep Experience this field
              </div>
            </div>
          </div>
          <div className="p-6 flex flex-row">
            <div className="flex-grow " />
            <div className="">
              <button className="px-3 py-2 rounded-full bg-sky-700 text-white">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
