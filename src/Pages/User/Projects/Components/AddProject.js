import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  getData,
  postData,
  uploadToFirebaseStorage,
} from "../../../../Helpers/request";

function AddProject(props) {
  const [btnTxt, setBtnTxt] = useState("Project");
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('')
  const [staff, setStaff] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnTxt("Uploading Project...");
    setUploading(true);
    if (true) {
      //   validate here
      const tld = toast.loading("Uploading Project... Please wait");
      let _data = {
        title,
      };
      if (file) {
        let _f = "";
        try {
          toast.update(tld, {
            render: "Uploading Project Image... Please wait",
            // type: "success",
            isLoading: true,
          });
          _f = await uploadToFirebaseStorage(`users/profile/`, file);
          toast.update(tld, {
            render: "Uploading Project Image... Please wait",
            // type: "success",
            isLoading: true,
          });
        } catch (e) {
          toast.update(tld, {
            render: "Uploading picture failed update cancelled",
            type: "error",
            isLoading: true,
          });
          // toast.error("Error: Uploading Catergory Image Failed.");
          setBtnTxt("Update");
          return;
        }
        _data.image = _f;
      }
      console.log(_data);
      //   return;
      postData("/user/project", _data)
        .then((res) => {
          console.log(res);
          if (!res.error) {
            toast.update(tld, {
              render: "Uploading Project Successful",
              type: "success",
              isLoading: false,
            });
            props.close();
          } else {
            toast.update(tld, {
              render: "Uploading Project Failed. Please try again",
              type: "success",
              isLoading: false,
            });
          }
        })
        .catch((err) => {
          toast.error("Uploading Project Failed. Please try again");
          console.log("err", err);
        })
        .finally(() => {
          setBtnTxt("Project");
          setUploading(false);
          setTimeout(() => {
            toast.dismiss(tld);
          }, 5000);
        });
    } else {
      toast.error(
        "Project Post Upload Failed. Make sure all fields are filled and try again"
      );
      setBtnTxt("Project");
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
          Add Project
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
            Title
          </label>
          <input
            className="p-4 rounded-lg w-full hover:shadow-lg border-2 shadow-none hover:border-gray-200"
            // required
            placeholder="Some Title here"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="py-2">
          <label className="text-sm uppercase mb-2 text-gray-400 p-2 font-bold">
            Project Description
          </label>
          <textarea
            className="p-4 rounded-lg w-full hover:shadow-lg border-2 shadow-none hover:border-gray-200"
            // required
            placeholder="Project Description..."
            name="description"
            value={description}
            rows="5"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="py-2">
          <label
            htmlFor="image"
            className="border-b-2 border-blue-500 text-blue-500 cursor-pointer p-2"
          >
            <span className="fa fa-upload"></span> Upload Relevant Project Document
          </label>
          <input
            type="file"
            // accept="image/*"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            name="image"
            hidden
            id="image"
          />
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

export default AddProject;
