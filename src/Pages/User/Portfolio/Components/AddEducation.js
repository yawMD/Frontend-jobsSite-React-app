import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  getData,
  postData,
  uploadToFirebaseStorage,
} from "../../../../Helpers/request";

function AddEducation(props) {
  const [btnTxt, setBtnTxt] = useState("Education");
  const [uploading, setUploading] = useState(false);
  const [programme, setProgramme] = useState("");
  const [institution, setInstitution] = useState("");
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnTxt("Uploading...");
    setUploading(true);
    if (true) {
      //   validate here
      toast.info("Uploading Education. Please Wait...");
      let _data = {
        programme,
        institution,
        from,
        to,
      };
      console.log(_data);
      //   return;
      postData("/user/education", _data)
        .then((res) => {
          console.log(res);
          if (!res.error) {
            props.success("Uploading Educatiion Successful")
            props.close();
          } else {
            toast.error("Uploading Educatiion Failed. Please try again");
          }
        })
        .catch((err) => {
          toast.error("Uploading Educatiion Failed. Please try again");
          console.log("err", err);
        })
        .finally(() => {
          setBtnTxt("Education");
          setUploading(false);
        });
    } else {
      toast.error(
        "Educatiion Post Upload Failed. Make sure all fields are filled and try again"
      );
      setBtnTxt("Education");
      setUploading(false);
    }
  };

  return (
    <div
      className={`${
        props.show
          ? "h-screen w-full fixed flex content-center bg-black bg-opacity-80 visible z-50 left-0 top-0"
          : "invisible hidden"
      } `}
    >
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="container md:mx-auto w-full mx-2 my-auto md:w-1/2 bg-white rounded shadow p-7  overflow-auto"
      >
        <h1 className="float-left font-light text-3xl text-blue-500">
          Add Education
        </h1>
        <button
          type="button"
          onClick={() => props.close()}
          className="px-3 py-2 rounded bg-red-400 hover:bg-gray-200 float-right font-semibold text-lg text-gray-100"
        >
          x
        </button>
        <div className="clear-both"></div>
        <div className="py-2">
          <label className="text-sm uppercase mb-2 text-gray-400 p-2 font-bold">
            Programme
          </label>
          <input
            className="p-4 rounded-lg w-full hover:shadow-lg border-2 hover:border-4 shadow-none hover:border-gray-200"
            required
            placeholder="BSc. Computer Science"
            name="programme"
            value={programme}
            onChange={(e) => setProgramme(e.target.value)}
          />
        </div>
        <div className="py-2">
          <label className="text-sm uppercase mb-2 text-gray-400 p-2 font-bold">
            Institution
          </label>
          <input
            className="p-4 rounded-lg w-full hover:shadow-lg border-2 hover:border-4 shadow-none hover:border-gray-200"
            required
            placeholder="University of Ghana"
            name="institution"
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
          />
        </div>
        <div className="m-2 grid grid-col-1 md:grid-cols-2 gap-2">
          <div className="py-2">
            <label className="text-sm uppercase mb-2 text-gray-400 p-2 font-bold">
              From
            </label>
            <input
              className="p-4 rounded-lg w-full hover:shadow-lg border-2 hover:border-4 shadow-none hover:border-gray-200"
              required
              type="date"
              placeholder="YYYY"
              name="from"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
          <div className="py-2">
            <label className="text-sm uppercase mb-2 text-gray-400 p-2 font-bold">
              To
            </label>
            <input
              className="p-4 rounded-lg w-full hover:shadow-lg border-2 hover:border-4 shadow-none hover:border-gray-200"
              required
              type="date"
              placeholder="YYYY"
              name="to"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-4 md:mb-1 text-right">
          <button
            type="submit"
            disabled={uploading}
            className={`px-4 py-2 rounded shadow-lg hover:bg-blue-900 bg-blue-600 text-white ${
              uploading ? "disabled cursor-wait" : ""
            }`}
          >
            {uploading ? (
              <span className="text-white animate-spin fa fa-spinner"></span>
            ) : (
              <span className="fa fa-plus"></span>
            )}
            &nbsp; <p className="inline-block">{btnTxt}</p>
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEducation;
