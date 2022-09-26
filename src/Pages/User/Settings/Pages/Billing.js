import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { getData, postData } from "../../../../Helpers/request";

export default function Billing() {
  const h = useHistory();
  const [billing, setBilling] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [type, setType] = useState("");
  const [card, setCard] = useState("");
  const [phone, setPhone] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [mm, setMm] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [code, setCode] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");

  useEffect(() => {
    const tld = toast.loading("Looking up billing information... Please wait");
    getData("/user/me/billing")
      .then((d) => {
        console.log(d);
        if (!d.error) {
          setBilling(d.billings);
          toast.update(tld, {
            render: d.message,
            type: "success",
            isLoading: false,
          });
        } else {
          d.message === "Access Denied. Invalid Validation token" &&
            h.push("/me/home");
          toast.update(tld, {
            render: `${d.message}`,
            type: "error",
            isLoading: false,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        toast.update(tld, {
          render: `${error.message}`,
          type: "error",
          isLoading: false,
        });
      })
      .finally((e) => {
        setTimeout(() => {
          toast.dismiss(tld);
        }, 4000);
      });

    return () => {
      setBilling([]);
    };
  }, [refresh]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let _d = {
      type,
      phone,
      card,
      name: { first, last },
      expire: new Date(mm).getTime(),
      code,
      address: { first: line1, second: line2, city, country, postal },
    };
    console.log(_d);
    const tld = toast.loading("Adding your billing information... Please wait");
    postData("/user/billing", _d)
      .then((d) => {
        if (!d.error) {
          toast.update(tld, {
            render: `Added Billing Method`,
            type: "success",
            isLoading: false,
          });
        } else {
          toast.update(tld, {
            render: `Error: ${d.message}`,
            type: "error",
            isLoading: false,
          });
        }
      })
      .catch((e) => {
        console.log("err", e);
        toast.update(tld, {
          render: `Error: ${e.message}`,
          type: "error",
          isLoading: false,
        });
      })
      .finally((e) => {
        setTimeout(() => {
          toast.dismiss(tld);
        }, 5000);
      });
  };

  const toggleDetails = (e) => {
    document.querySelectorAll('.content').forEach(el => el.classList.add('hidden'))
    let _div = document.querySelector('#z'+e)
    // console.log(_div)
    if(_div.classList.contains('hidden')) {
      _div.classList.remove('hidden')
    } else {
      _div.classList.add('hidden')
    }

  };

  const deleteBill = (e) => {
    if(window.confirm('Confirm Deletion of Billing Method. Billing information cannot be retrieved once deleted')) {
      const tld = toast.loading("Deleting Billing information... Please wait");
      postData('/user/me/billing/'+e)
      .then(d => {
        console.log(d)
        if(!d.error) {
          toast.update(tld, {
            render: d.message,
            type: "success",
            isLoading: false,
          });
          setRefresh(refresh+1)
        } else {
          toast.update(tld, {
            render: d.message,
            type: "error",
            isLoading: false,
          });
        }
      })
      .catch(e => {
        console.log(e)
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
    }
  };

  return (
    <div className="container bg-gray-50 rounded-lg p-3 py-6">
      <ToastContainer />
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
            <button
              className="ring-1 px-3 py-2 rounded-full"
              onClick={() => setShowAddPayment(!showAddPayment)}
            >
              <span className="fa fa-plus"></span> Billing Method
            </button>
          </div>
          <hr className="border-gray-100" />
          {!showAddPayment && (
            <div className="p-6">
              {billing.length === 0 && (
                <p className="text-gray-400">
                  You have not setup any billing yet.
                </p>
              )}

              {billing.length !== 0 &&
                billing.map((bill) => (
                  <div key={bill._id}>
                    <h3 className="font-semibold w-full flex flex-row  rounded p-2 ring-1 mt-2 text-sky-700 text-lg ">
                      <span className="flex-grow">
                        {bill.type === "momo" ? "Mobile Money" : "Card "}{" "}
                        Billing - {bill.name.first + " " + bill.name.last}
                      </span>
                      <button
                        onClick={() => toggleDetails(bill._id)}
                        className="text-blue-600 mx-2 ml-4 text-sm"
                      >
                        <span className="fa fa-eye" /> View
                      </button>
                      <button
                        onClick={() => deleteBill(bill._id)}
                        className="text-red-600 mx-2 text-sm"
                      >
                        <span className="fa fa-trash" /> Delete
                      </button>
                    </h3>
                    <div id={`z${bill._id}`} className="content hidden p-3 ring-1 ring-gray-200 rounded-xl">
                        <h4 className="text-xl font-semibold text-gray-700 my-2">{bill.name.first + " " + bill.name.last}</h4>
                        <small className="font-bold">Payment Type</small>
                        <p>{bill.type === "momo" ? "Mobile Money" : "Card"}</p>
                        <hr className="my-4" />
                      {bill.type === "card" ? <div>
                      <p><small className="font-bold text-sm">Card Details</small></p>
                      <p className="mb-4">{bill.card}</p>
                      </div> : <div>
                      <p><small className="font-bold text-sm">Phone Details</small></p>
                      <p className="mb-4">{bill.phone}</p></div>}
                        <p><small className="font-bold text-sm">Address</small></p>
                        <p>{bill.address.first}</p>
                        <p>{bill.address.second}</p>
                        <p>{bill.address.country}, {bill.address.city}, {bill.address.postal}.</p>
                    </div>
                  </div>
                ))}
            </div>
          )}
          {showAddPayment && (
            <div className="container p-4">
              <div>
                <h3 className="font-semibold text-xl text-sky-500 px-2 py-4">
                  Add New Payment Method
                </h3>
                <label className="p-2 mx-2">
                  <input
                    className="m-1"
                    type={"radio"}
                    onChange={() => setType("card")}
                    name="type"
                  />{" "}
                  Payment card
                </label>
                <label className="p-2 mx-2">
                  <input
                    className="m-1"
                    type={"radio"}
                    onChange={() => setType("momo")}
                    name="type"
                  />{" "}
                  Mobile money
                </label>

                <hr className="border-gray-100" />
                {type === "card" && (
                  <form onSubmit={handleSubmit}>
                    <div>
                      <div className="m-2">
                        <label className="text-gray-500 text-sm font-bold">
                          Card Number
                        </label>
                        <input
                          required
                          value={card}
                          onChange={(e) => setCard(e.target.value)}
                          className="w-full p-2 ring-1 ring-gray-200 rounded-lg"
                        />
                      </div>
                      <div className="m-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-gray-500 text-sm font-bold">
                            Firstname
                          </label>
                          <input
                            required
                            value={first}
                            onChange={(e) => setFirst(e.target.value)}
                            className="w-full p-2 ring-1 ring-gray-200 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="text-gray-500 text-sm font-bold">
                            Lastname
                          </label>
                          <input
                            required
                            value={last}
                            onChange={(e) => setLast(e.target.value)}
                            className="w-full p-2 ring-1 ring-gray-200 rounded-lg"
                          />
                        </div>
                      </div>
                      <div className="m-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-gray-500 text-sm font-bold">
                              MM / YYYY
                            </label>
                            <input
                              required
                              value={mm}
                              onChange={(e) => setMm(e.target.value)}
                              type="month"
                              className="w-full p-2 ring-1 ring-gray-200 rounded-lg"
                            />
                          </div>
                          <div>
                            <label className="text-gray-500 text-sm font-bold">
                              CVV/CVC
                            </label>
                            <input
                              required
                              value={code}
                              onChange={(e) => setCode(e.target.value)}
                              className="w-full p-2 ring-1 ring-gray-200 rounded-lg"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="my-6">
                      <h3 className="font-semibold text-lg text-sky-500 px-2 pt-4">
                        Billing Address
                      </h3>
                      <div className="m-2">
                        <label className="text-gray-500 text-sm font-bold">
                          Address Line 1
                        </label>
                        <input
                          required
                          value={line1}
                          onChange={(e) => setLine1(e.target.value)}
                          className="w-full p-2 ring-1 ring-gray-200 rounded-lg"
                        />
                      </div>
                      <div className="m-2">
                        <label className="text-gray-500 text-sm font-bold">
                          Address Line 2
                        </label>
                        <input
                          value={line2}
                          onChange={(e) => setLine2(e.target.value)}
                          className="w-full p-2 ring-1 ring-gray-200 rounded-lg"
                        />
                      </div>
                      <div className="m-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="text-gray-500 text-sm font-bold">
                            Country
                          </label>
                          <input
                            required
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="w-full p-2 ring-1 ring-gray-200 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="text-gray-500 text-sm font-bold">
                            City
                          </label>
                          <input
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full p-2 ring-1 ring-gray-200 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="text-gray-500 text-sm font-bold">
                            Postal Code
                          </label>
                          <input
                            required
                            value={postal}
                            onChange={(e) => setPostal(e.target.value)}
                            className="w-full p-2 ring-1 ring-gray-200 rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="p-6 flex flex-row">
                      <div className="flex-grow " />
                      <div className="">
                        <button
                          type="submit"
                          className=" px-3 py-2 rounded-full bg-sky-700 text-white"
                        >
                          Add Billing Details
                        </button>
                      </div>
                    </div>
                  </form>
                )}
                {type === "momo" && (
                  <form onSubmit={handleSubmit}>
                    <div>
                      <div className="m-2">
                        <label className="text-gray-500 text-sm font-bold">
                          Phone Number
                        </label>
                        <input
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full p-2 ring-1 ring-gray-200 rounded-lg"
                        />
                      </div>
                      <div className="m-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-gray-500 text-sm font-bold">
                            Firstname
                          </label>
                          <input
                            value={first}
                            onChange={(e) => setFirst(e.target.value)}
                            className="w-full p-2 ring-1 ring-gray-200 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="text-gray-500 text-sm font-bold">
                            Lastname
                          </label>
                          <input
                            value={last}
                            onChange={(e) => setLast(e.target.value)}
                            className="w-full p-2 ring-1 ring-gray-200 rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="my-6">
                      <h3 className="font-semibold text-lg text-sky-500 px-2 pt-4">
                        Billing Address
                      </h3>
                      <div className="m-2">
                        <label className="text-gray-500 text-sm font-bold">
                          Address Line 1
                        </label>
                        <input
                          value={line1}
                          onChange={(e) => setLine1(e.target.value)}
                          className="w-full p-2 ring-1 ring-gray-200 rounded-lg"
                        />
                      </div>
                      <div className="m-2">
                        <label className="text-gray-500 text-sm font-bold">
                          Address Line 2
                        </label>
                        <input
                          value={line2}
                          onChange={(e) => setLine2(e.target.value)}
                          className="w-full p-2 ring-1 ring-gray-200 rounded-lg"
                        />
                      </div>
                      <div className="m-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="text-gray-500 text-sm font-bold">
                            Country
                          </label>
                          <input
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="w-full p-2 ring-1 ring-gray-200 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="text-gray-500 text-sm font-bold">
                            City
                          </label>
                          <input
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full p-2 ring-1 ring-gray-200 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="text-gray-500 text-sm font-bold">
                            Postal Code
                          </label>
                          <input
                            value={postal}
                            onChange={(e) => setPostal(e.target.value)}
                            className="w-full p-2 ring-1 ring-gray-200 rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="p-6 flex flex-row">
                      <div className="flex-grow " />
                      <div className="">
                        <button
                          type="submit"
                          className=" px-3 py-2 rounded-full bg-sky-700 text-white"
                        >
                          Add Billing Details
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
