import React, { useState } from "react";

export default function Notifications() {
    const [showAddPayment, setShowAddPayment] = useState(false)
  return (
    <div className="container bg-gray-50 rounded-lg p-3 py-6">
      <div className="px-2">
        <h2 className="px-4 py-6 font-bold text-3xl text-sky-700">
          Billing &amp; Payments
        </h2>
        <div className="bg-white ring-1 m-auto c ring-gray-100 rounded-lg">
          <div className="flex p-4">
            <h3 className="font-bold text-2xl text-sky-500">
              Billing &amp; Payments
            </h3>
            <div className="flex-grow" />
            <button className="ring-1 px-3 py-2 rounded-full" onClick={() => setShowAddPayment(!showAddPayment) }>
              <span className="fa fa-plus"></span> Billing Method
            </button>
          </div>
          <hr className="border-gray-100" />
          {!showAddPayment && <div className="p-6">
            <p className="text-gray-400">You have not setup any billing yet.</p>
          </div>}
          {showAddPayment && <div className="container p-4">
            <div>
              <h3 className="font-semibold text-xl text-sky-500 px-2 py-4">
                Add New Payment Method
              </h3>
              <label className="p-2 mx-2">
                <input className="m-1" type={"radio"} /> Payment card
              </label>
              <label className="p-2 mx-2">
                <input className="m-1" type={"radio"} /> Mobile money
              </label>

              <hr className="border-gray-100" />
              <form>
                <div className="m-2">
                  <label className="text-gray-500 text-sm font-bold">
                    Card Number
                  </label>
                  <input className="w-full p-2 ring-1 ring-gray-200 rounded-lg" />
                </div>
                <div className="m-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-500 text-sm font-bold">
                      Firstname
                    </label>
                    <input className="w-full p-2 ring-1 ring-gray-200 rounded-lg" />
                  </div>
                  <div>
                    <label className="text-gray-500 text-sm font-bold">
                      Lastname
                    </label>
                    <input className="w-full p-2 ring-1 ring-gray-200 rounded-lg" />
                  </div>
                </div>
                <div className="m-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-gray-500 text-sm font-bold">
                          MM
                        </label>
                        <input className="w-full p-2 ring-1 ring-gray-200 rounded-lg" />
                      </div>
                      <div>
                        <label className="text-gray-500 text-sm font-bold">
                          YY
                        </label>
                        <input className="w-full p-2 ring-1 ring-gray-200 rounded-lg" />
                      </div>
                    </div>
                    <div>
                      <label className="text-gray-500 text-sm font-bold">
                        CVV/CVC
                      </label>
                      <input className="w-full p-2 ring-1 ring-gray-200 rounded-lg" />
                    </div>
                  </div>
                </div>
              </form>
              <form className="my-6">
              <h3 className="font-semibold text-lg text-sky-500 px-2 pt-4">
                Billing Address
              </h3>
                <div className="m-2">
                  <label className="text-gray-500 text-sm font-bold">
                    Address Line 1
                  </label>
                  <input className="w-full p-2 ring-1 ring-gray-200 rounded-lg" />
                </div>
                <div className="m-2">
                  <label className="text-gray-500 text-sm font-bold">
                    Address Line 2
                  </label>
                  <input className="w-full p-2 ring-1 ring-gray-200 rounded-lg" />
                </div>
                <div className="m-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-gray-500 text-sm font-bold">
                      Country
                    </label>
                    <input className="w-full p-2 ring-1 ring-gray-200 rounded-lg" />
                  </div>
                  <div>
                    <label className="text-gray-500 text-sm font-bold">
                      City
                    </label>
                    <input className="w-full p-2 ring-1 ring-gray-200 rounded-lg" />
                  </div>
                  <div>
                    <label className="text-gray-500 text-sm font-bold">
                      Postal Code
                    </label>
                    <input className="w-full p-2 ring-1 ring-gray-200 rounded-lg" />
                  </div>
                </div>
              </form>
            </div>
          </div>}
        </div>
      </div>
    </div>
  );
}
