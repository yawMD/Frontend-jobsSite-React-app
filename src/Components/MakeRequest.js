import React, { useState } from "react";
import { toast } from "react-toastify";
import { postData, uploadToFirebaseStorage } from "../Helpers/request";

function MakeRequest(props) {
  const [service, setService] = useState("");
  const [description, setDescription] = useState("");
  const [btnTxt, setBtnTxt] = useState("Request");
  const [uploading, setUploading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (service.length > 0 && description.length > 0) {
      setBtnTxt("Uploading...");
      setUploading(true);
      console.log({ title: service, description });
      postData("/user/request/service", { title: service, description })
        .then((res) => {
          console.log(res);
          if (!res.error) {
            toast.success("Pushing Request Successful");
            props.close();
          } else {
            toast.error("Pushing Request addition Failed. Please try again");
          }
        })
        .catch((err) => {
          toast.error("Requesting Service Addition Failed. Please try again");
          console.log("err", err);
        })
        .finally(() => {
          setBtnTxt("Request");
          setUploading(false);
        });
    } else {
      toast.error("Error: Make sure all fields are filled and try again");
      setBtnTxt("Request");
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
        <h1 className="float-left font-semibold text-lg capitalize text-blue-500">
          Request for your service specialization to be added
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
            placeholder="Enter Service Name"
            name="service"
            value={service}
            onChange={(e) => setService(e.target.value)}
          />
        </div>
        <div className="pb-6">
          <textarea
            rows={5}
            className="p-4 rounded-lg w-full hover:shadow-lg border-2 hover:border-4 shadow-none hover:border-gray-200"
            required
            placeholder="Enter Service Description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
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
            &nbsp; <h2 className="inline-block">{btnTxt}</h2>
          </button>
        </div>
      </form>
    </div>
  );
}

export default MakeRequest;
