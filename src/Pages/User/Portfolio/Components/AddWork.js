import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { postData } from "../../../../Helpers/request";

function AddWork(props) {
  const [btnTxt, setBtnTxt] = useState("Work History");
  const [uploading, setUploading] = useState(false);
  const [organisation, setOrganisation] = useState("");
  const [description, setDescription] = useState("");
  const [position, setPosition] = useState("");
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  // const [there, setThere] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnTxt("Uploading...");
    setUploading(true);
    if (true) {
      //   validate here
      toast.info("Uploading Work History. Please Wait...");
      let _data = {
        organisation,
        from,
        to,
        description,
        position,
        there: false,
      };
      console.log(_data);
      //   return;
      postData("/user/work", _data)
        .then((res) => {
          console.log(res);
          if (!res.error) {
            props.success("Uploading Work History Successful");
            props.close();
          } else {
            toast.error("Uploading Work History Failed. Please try again");
          }
        })
        .catch((err) => {
          toast.error("Uploading Work History Failed. Please try again");
          console.log("err", err);
        })
        .finally(() => {
          setBtnTxt("Work History");
          setUploading(false);
        });
    } else {
      toast.error(
        "Work History Upload Failed. Make sure all fields are filled and try again"
      );
      setBtnTxt("Work History");
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
        className="container md:mx-auto w-full mx-2 my-auto w-screen md:w-1/2 bg-white h-screen md:h-auto rounded shadow p-7  overflow-auto"
      >
        <h1 className="float-left font-light text-3xl text-blue-500">
          Add Work History
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
            Organisation
          </label>
          <input
            className="p-4 rounded-lg w-full hover:shadow-lg border-2 hover:border-4 shadow-none hover:border-gray-200"
            required
            placeholder="Google LLC."
            name="organisation"
            value={organisation}
            onChange={(e) => setOrganisation(e.target.value)}
          />
        </div>
        <div className="py-2">
          <label className="text-sm uppercase mb-2 text-gray-400 p-2 font-bold">
            Position
          </label>
          <input
            className="p-4 rounded-lg w-full hover:shadow-lg border-2 hover:border-4 shadow-none hover:border-gray-200"
            required
            placeholder="Lead Product Officer"
            name="position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
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
        <div className="py-2">
          <label className="text-sm uppercase mb-2 text-gray-400 p-2 font-bold">
            Job Description
          </label>
          <textarea
            className="p-4 rounded-lg w-full hover:shadow-lg border-2 hover:border-4 shadow-none hover:border-gray-200"
            name="description"
            rows={`5`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
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

export default AddWork;
