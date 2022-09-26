import React, { useState } from "react";
import { toast } from "react-toastify";
import { postData } from "../Helpers/request";

function AddSubService(props) {
  const [service, setService] = useState("");
  const [btnTxt, setBtnTxt] = useState("Add");
  const [uploading, setUploading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnTxt("Uploading...");
    setUploading(true);
    if (service.length) {
      toast.info("Uploading Sub-service. Please Wait...");
      console.log({ title: service });
      postData("/admin/sub-service", {
        service: props.service.slug,
        title: service,
      })
        .then((res) => {
          console.log(res);
          if (!res.error) {
            toast.success("Uploading Service Successful");
            props.close();
          } else {
            toast.error("Uploading Service Failed. Please try again");
          }
        })
        .catch((err) => {
          toast.error("Uploading Service Failed. Please try again");
          console.log("err", err);
        })
        .finally(() => {
          setBtnTxt("Add");
          setUploading(false);
        });
    } else {
      toast.error(
        "Catergory addition Failed. Make sure all fields are filled and try again"
      );
      setBtnTxt("Add");
      setUploading(false);
    }
  };
  return (
    <div
      className={`${
        props.show
          ? "h-screen w-full fixed flex flex-wrap content-center bg-blue-200 bg-opacity-80 visible z-50 left-0 top-0"
          : "invisible hidden"
      } `}
    >
      <form
        onSubmit={handleSubmit}
        className="container m-auto v w-1/2 bg-white rounded shadow p-7"
      >
        <h1 className="float-left font-light text-lg text-blue-500">
          Add Sub-service to "
          <span className="font-semibold text-blue-700">
            {props.service.title}
          </span>
          "
        </h1>
        <button
          type="button"
          onClick={() => props.close()}
          className="px-3 py-2 rounded bg-red-400 hover:bg-gray-200 float-right font-semibold text-lg text-gray-100"
        >
          x
        </button>
        <div className="py-6 clear-both">
          <input
            className="p-4 rounded-lg w-full hover:shadow-lg border-2 hover:border-4 shadow-none hover:border-gray-200"
            required
            placeholder="Enter Sub-Service Title"
            name="service"
            value={service}
            onChange={(e) => setService(e.target.value)}
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={uploading}
            className={`px-4 py-2 rounded shadow-lg float-right hover:bg-blue-900 bg-blue-600 text-white ${
              uploading ? "disabled cursor-wait" : ""
            }`}
          >
            {uploading ? (
              <span className="text-white animate-spin fa fa-spinner"></span>
            ) : (
              <span className="fa fa-plus"></span>
            )}
            &nbsp; <p className="font-bold inline-block">{btnTxt}</p>
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddSubService;
