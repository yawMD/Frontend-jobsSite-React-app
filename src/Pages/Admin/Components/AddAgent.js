import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getData,
  postData,
  uploadToFirebaseStorage,
} from "../../../Helpers/request";

function AddAgent(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [verify, setVerify] = useState("");
  const [province, setProvince] = useState("");
  const [btnTxt, setBtnTxt] = useState("Add New Agent");

//   useEffect(() => {
//   }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let _data = {name, email, phone, password, province, status: 'active' };
    console.log(_data);
    postData("/admin/user/agent", _data)
      .then((e) => console.log(e))
      .catch((e) => console.error(e));
  };

  return (
    <div className="h-screen fixed justify-center content-center flex top-0 left-0 z-50 w-full bg-white bg-opacity-10">
      <form className="my-auto w-1/2" onSubmit={handleSubmit}>
        <Link to="/users" className="font-bold text-sm">
          <span className="fa fa-arrow-left"></span>&nbsp; Back to Users
        </Link>
        <hr className="my-2" />
        <h2 className="text-3xl font-bold">Add New Agent</h2>
        {/* <hr className="my-2" /> */}
        <div className="my-2 p-6 col-s pan-2 md:col-spa n-1">
          <div className="mt-3">
            <input
              className="w-full shadow rounded-md border-2 border-gray-100 hover:border-gray-200 p-3 font-semibold"
              placeholder="Agent's Full Name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </div>
          <div className="mt-3">
            <input
              className="w-full shadow rounded-md border-2 border-gray-100 hover:border-gray-200 p-3 font-semibold"
              placeholder="Province"
              value={province}
              required
              onChange={(e) => setProvince(e.target.value)}
              autoComplete="province"
            />
          </div>
          <div className="mt-3">
            <input
              className="w-full shadow rounded-md border-2 border-gray-100 hover:border-gray-200 p-3 font-semibold"
              placeholder="Phone Number"
              value={phone}
              required
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="phone"
            />
          </div>
          <div className="mt-3">
            <input
              className="w-full shadow rounded-md border-2 border-gray-100 hover:border-gray-200 p-3 font-semibold"
              placeholder="Email"
              value={email}
              required
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="mt-3">
            <input
              className="w-full shadow rounded-md border-2 border-gray-100 hover:border-gray-200 p-3 font-semibold"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              autoComplete="new-password"
            />
          </div>
          <div className="mt-3">
            <input
              className="w-full shadow rounded-md border-2 border-gray-100 hover:border-gray-200 p-3 font-semibold"
              placeholder="Verify Password"
              value={verify}
              required
              onChange={(e) => setVerify(e.target.value)}
              type="password"
              autoComplete="new-password"
            />
          </div>
          {/* <div className="mt-2">
            <label htmlFor="doc">Agent's Profile Picture</label>
            <label htmlFor="file-upload">
              <div className="w-full shadow ring-1 cursor-pointer text-white bg-blue-400 hover:bg-blue-500 text-center ring-gray-200 font-semibold p-3 rounded">
                <i className="fa fa-upload"></i> Upload Profile Picture
              </div>
            </label>
            <input
              type="file"
              accept="image/*"
              id="file-upload"
              ref={fileInput}
              hidden
              name="fileUpload"
              onChange={(e) => {
                // console.log(fileInput);
                // console.log(e.target.files[0]);
                setDocuments(e.target.files[0]);
              }}
            />
          </div>
          <div className="mt-3">
            <label htmlFor="doc">Agent's Documents</label>
            <label htmlFor="doc-upload">
              <div className="w-full shadow ring-1 cursor-pointer text-white bg-blue-400 hover:bg-blue-500 text-center ring-gray-200 font-semibold p-3 rounded">
                <i className="fa fa-upload"></i> Upload Documents
              </div>
            </label>
            <input
              type="file"
              accept="image/*"
              id="doc-upload"
              ref={otherFiles}
              hidden
              name="fileUpload"
              onChange={(e) => {
                // console.log(fileInput);
                // console.log(e.target.files[0]);
                setDocuments(e.target.files);
              }}
            />
          </div>
           */}
          <div className="mt-2">
            <button
              className="w-full shadow rounded-md border-2 border-gray-100 hover:border-gray-200 bg-green-500 hover:bg-green-400 text-white p-3 font-semibold"
              type="submit"
            >
              {btnTxt}
            </button>
            <div className="text-blue-500 text-right">
              <label className="cursor-pointer">
                {/* <Link to="/">Go back Home</Link> */}
              </label>
            </div>
          </div>
        </div>
        {/* </div> */}
        {/* <div className="my-2 p-6 col-span-2 md:col-span-1 min-w-40">
          <label className="text-lg font-semibold">
            Upload an audio of you reading the following text
          </label>
          <p className="p-4 mt-2 border-2 rounded bg-gray-100 text-2xl">
            老板，我 经常 来 这里 吃饭， 您 看 能 不能 便宜 一点儿
            ？你每天都在家干什么？抖 音 是 现在 中国 年轻人 中 最 流行 的 短视
            频从前 有 个人 养 了 很 多 羊
          </p>
          <label
            htmlFor="audioFile"
            className="block mt-4 font-semibold text-lg  mb-2"
          >
            Upload Audio File
          </label>
          {/* <input required accept="audio/*" id="audioFile" type="file" /> 
          <input
            type="file"
            accept="audio/*"
            id="audioFile"
            ref={audioFile}
            // hidden
            onChange={(e) => {
              // console.log(audioFile);
              setAudio(e.target.files[0]);
            }}
          />
          <div className="mt-6">
            <button
              className="w-full shadow rounded-md border-2 border-gray-100 hover:border-gray-200 bg-green-500 hover:bg-green-400 text-white p-3 font-semibold"
              type="submit"
            >
              {btnTxt}
            </button>
            <div className="text-blue-500 text-right">
              <label className="cursor-pointer">
                <Link to="/">Go back Home</Link>
              </label>
            </div>
          </div> 
        </div>*/}
      </form>
    </div>
  );
}

export default AddAgent;
