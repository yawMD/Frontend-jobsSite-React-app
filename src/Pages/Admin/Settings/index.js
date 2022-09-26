import React, { useState } from "react";
import { authenticate, isAuth } from "../../../Helpers/auth";
import { postData, uploadToFirebaseStorage } from "../../../Helpers/request";

function AdminSettings(props) {
  const store = isAuth();
  const [description, setDescription] = useState("");
  const [customerCare, setCustomerCare] = useState("");
  const [logo, setLogo] = useState("");
  const bannerRef = React.createRef(),
    logoRef = React.createRef();

  const handleLogo = (e) => {
    console.log(logoRef.current.files);
    setLogo(logoRef.current.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //   upload and get logo
    // if (logo) {
    //   let paths = uploadToFirebaseStorage(
    //     `${isAuth().business.replace(/ /g, "-")}/logo/`,
    //     logo[0]
    //   );
    //   logo_path = await Promise.resolve(paths);
    // }
    // if (banner) {
    //   let _paths = uploadToFirebaseStorage(
    //     `${isAuth().business.replace(/ /g, "-")}/banner/`,
    //     banner[0]
    //   );
    //   banner_path = await Promise.resolve(_paths);
    // }
    // //   upload and get banner
    // let _data = {
    //   description,
    //   support,
    //   customerCare,
    //   logo: logo_path,
    //   banner: banner_path,
    //   workingHours,
    // };
    // console.log(_data);
    // postData("/vendor/store/", _data)
    //   .then((data) => authenticate(data, () => console.log("done")))
    //   .catch((err) => console.log("err", err));
  };
  return (
    <div className="h-screen overflow-y-scroll bg-gray-50 w-full">
      {/* {isAuth().banner.length > 1 && (
        <div
          className="h-60 w-full bg-b lack static top-0 z-10"
          style={{
            backgroundImage: `url('${store.banner}')`,
            backgroundPosition: `center`,
            backgroundSize: "cover",
          }}
        ></div>
      )} */}
      <form onSubmit={handleSubmit}>
        <div className="container sm:mx-auto w-full md:w-11/12 pt-3 md:px-5">
          <div className="h-24"></div>
          <div className="container mx-auto mt-5 px-5">
            <div className="float-left font-semibold text-2xl text-gray-600">
              {/* {isAuth().logo.length > 1 && (
                <div
                  className="h-24 w-24 rounded-full inline-block shadow"
                  style={{
                    backgroundImage: `url('${store.logo}')`,
                    backgroundPosition: `center`,
                    backgroundSize: "cover",
                  }}
                ></div>
              )} */}
              <h1 className="my-4 inline-block text-2xl font-bold">
                Account Settings
              </h1>
            </div>
            <div className="float-right">
                <button className="py-2 px-4 rounded bg-blue-500 font-bold text-white text-sm shadow-lg">Change Password</button>
            </div>
            <div className="clear-both"></div>
          </div>

          <div className="container mx-auto mt-4 px-5">
            <div className="grid grid-cols-12 h-60 gap-6">
              <div className="col-span-12">
                {/* <div className="bg-white rounded ring-1 ring-gray-200 shadow-md p-3 mb-3">
                  <div>
                    <h1 className="mb-2 text-indigo-400 text-sm uppercase font-semibold">
                      Details
                      <hr className="my-3 w-full border-gray-200" />
                    </h1>
                    <textarea
                      className="w-full shadow p-3 ring-1 ring-gray-200 border-2 border-gray-50 hover:border-gray-400 mb-4 rounded"
                      rows="5"
                      name="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Any information about the Product here..."
                    ></textarea>
                  </div>
                </div> */}

                <div className="bg-white rounded ring-1 ring-gray-200 shadow-md p-3 mb-3">
                  <h1 className="mb-2 text-indigo-400 text-sm uppercase font-semibold">
                    My Name
                    <hr className="my-3 w-full border-gray-200" />
                  </h1>
                  <div className="w-full my-3">
                    <div className="">
                      <input
                        className="w-full shadow p-3 ring-1 ring-gray-200 border-2 border-gray-50 mb-4 rounded"
                        placeholder="support@company.com"
                        name="support"
                        // value={support}
                        // onChange={(e) => setSupport(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded ring-1 ring-gray-200 shadow-md p-3 mb-3">
                  <h1 className="mb-2 text-indigo-400 text-sm uppercase font-semibold">
                    My Email Address
                    <hr className="my-3 w-full border-gray-200" />
                  </h1>
                  <div className="w-full my-3">
                    <div className="">
                      <input
                        className="w-full shadow p-3 ring-1 ring-gray-200 border-2 border-gray-50 mb-4 rounded"
                        placeholder="support@company.com"
                        name="support"
                        // value={support}
                        // onChange={(e) => setSupport(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded ring-1 ring-gray-200 shadow-md p-3 mb-3">
                  <h1 className="mb-2 text-indigo-400 text-sm uppercase font-semibold">
                    My Phone Number
                    <hr className="my-3 w-full border-gray-200" />
                  </h1>
                  <div className="w-full my-3">
                    <div className="">
                      <input
                        className="w-full shadow p-3 ring-1 ring-gray-200 border-2 border-gray-50 mb-4 rounded"
                        placeholder="+(233)234 123 456"
                        name="customerCare"
                        value={customerCare}
                        onChange={(e) => setCustomerCare(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded ring-1 ring-gray-200 shadow-md p-3 mb-3">
                  <div>
                    <h1 className="mb-2 text-indigo-400 text-sm uppercase font-semibold">
                      My Logo
                      <hr className="my-3 w-full border-gray-200" />
                    </h1>
                    <div className="mb-2 text-gray-700 text-sm uppercase font-semibold grid grid-cols-2 gap-2">
                      {/* <div className="col-span-1"> */}
                      {/* <label
                        className="p-2 mr-2 w-full shadow rounded bg-yellow-500 text-white hover:shadow-lg hover:rounded-lg hover:bg-indigo-600"
                        htmlFor="banner"
                      >
                        <span className="fa fa-camera-retro"></span> My Banner
                      </label>
                      <input
                        type="file"
                        id="banner"
                        ref={bannerRef}
                        // onChange={handleBanner}
                        hidden
                        accept="image/*"
                      /> */}
                      {/* </div>
                      <div className="col-span-1"> */}
                      <label
                        className="p-2 w-full mr-2 shadow rounded bg-indigo-500 text-white hover:shadow-lg hover:rounded-lg hover:bg-indigo-600"
                        htmlFor="logo"
                      >
                        <span className="fa fa-certificate"></span> My Logo
                      </label>
                      <input
                        type="file"
                        id="logo"
                        ref={logoRef}
                        onChange={handleLogo}
                        hidden
                        accept="image/*"
                      />
                      {/* </div> */}
                    </div>
                  </div>
                </div>

                {/* <div className="bg-white rounded ring-1 ring-gray-200 shadow-md p-3 mb-3">
                  <div>
                    <h1 className="mb-2 text-indigo-400 text-sm uppercase font-semibold">
                      Set My Location
                      <hr className="my-3 w-full border-gray-200" />
                    </h1>
                    <div className="mb-2 text-gray-700 text-sm uppercase font-semibold">
                      <button className="p-2 mr-2 shadow rounded bg-gray-500 text-white hover:shadow-lg hover:rounded-lg hover:bg-indigo-600">
                        <span className="fa fa-map-marker"></span> Get My
                        Current Location
                      </button>
                      <button className="p-2 mr-2 shadow rounded bg-blue-500 text-white hover:shadow-lg hover:rounded-lg hover:bg-indigo-600">
                        <span className="fa fa-map"></span> Choose on Map
                      </button>
                    </div>
                  </div>
                </div> */}

                {/* <div className="bg-white rounded ring-1 ring-gray-200 shadow-md p-3 mb-3">
                  <div>
                    <h1 className="mb-2 text-indigo-400 text-sm uppercase font-semibold">
                      Working Hours
                      <hr className="my-3 w-full border-gray-200" />
                    </h1>
                    {component}
                  </div>
                </div> */}
                {/* {images.length > 0 && (
                  <div className="bg-white rounded ring-1 ring-gray-200 shadow-md p-3 mb-3">
                    <h1 className="float-left text-xs text-gray-600 font-extrabold uppercase">
                      Image(s) Preview
                    </h1>
                    <div className="clear-both">
                      {images.map((image, key) => (
                        <img
                        alt=""
                          key={key}
                          className="bg-local inline-block rounded m-1"
                          src={image}
                        />
                      ))}
                    </div>
                  </div>
                )} */}
                <div className="h-40"></div>
              </div>
              <div className="col-span-3 absolute bottom-5 m-5 right-5 z-30">
                <div className="w-full bg-white rounded shadow-md ring-1 ring-gray-200 p-3">
                  <button
                    className="w-full font-semibold capitalize rounded shadow-md bg-green-500 hover:bg-green-600 text-white p-3"
                    type="submit"
                  >
                    <i className="fa fa-save"></i> Update Info
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AdminSettings;
