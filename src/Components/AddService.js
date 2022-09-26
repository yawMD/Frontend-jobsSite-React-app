import React, { useState } from "react";
import { toast } from "react-toastify";
import { postData, uploadToFirebaseStorage } from "../Helpers/request";

function AddService(props) {
  const [service, setService] = useState("");
  const [btnTxt, setBtnTxt] = useState("Add");
  const [file, setFile] = useState(null);
  const [enabled, setEnabled] = useState(true);
  const [uploading, setUploading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnTxt("Uploading...");
    setUploading(true);
    if (service.length > 0 && file !== null) {
      toast.info("Uploading Service. Please Wait...");
      let _f = "";
      try {
        _f = await uploadToFirebaseStorage(`services/`, file);
      } catch (e) {
        toast.error("Error: Uploading Service Image Failed.");
        setBtnTxt("Add");
        setUploading(false);
        return;
      }
      console.log({ title: service, enabled, image: _f });
      postData("/admin/service", { title: service, enabled, image: _f })
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
        "Service addition Failed. Make sure all fields are filled and try again"
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
        <h1 className="float-left font-semibold text-lg text-blue-500">
          Add Service
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
        <div className="pb-6 font-semibold text-gray-900">
          <label htmlFor="enabled">
            {" "}
            &nbsp; Enabled{" "}
            <input
              type="radio"
              id="enabled"
              onClick={() => setEnabled(true)}
              name="enabled"
            />
          </label>
          <label htmlFor="disabled">
            {" "}
            &nbsp; Disabled{" "}
            <input
              type="radio"
              id="disabled"
              onClick={() => setEnabled(false)}
              name="enabled"
            />
          </label>
        </div>
        <div className="pb-6 ">
          <label
            htmlFor="d_img"
            className="cursor-pointer bg-gray-500 py-3 px-4 text-white rounded shadow-lg border-2 border-gray-600 hover:bg-gray-600"
          >
            <span className="fa fa-upload"></span>&nbsp;Upload Image
          </label>
          <input
            id="d_img"
            accept="image/*"
            type="file"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
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
            &nbsp; <h2 className="inline-block">{btnTxt}</h2>
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddService;
