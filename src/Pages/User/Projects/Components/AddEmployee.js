import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  getData,
  postData,
  uploadToFirebaseStorage,
} from "../../../../Helpers/request";

function AddEmployee(props) {
  const [btnTxt, setBtnTxt] = useState("Employee");
  const [uploading, setUploading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [selected, setSelected] = useState([]);
  useEffect(() => {
    getData("/user/me/employees")
      .then((d) => {
        // console.log(d);
        if (!d.error) {
          setEmployees(d.employees);
        }
      })
      .catch((e) => console.log(e));

    return () => {
      setEmployees([]);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selected.length > 0) {
      setBtnTxt("Adding Employees...");
      setUploading(true);
      //   validate here
      const tld = toast.loading("Adding Employees... Please wait");
      let _data = {
        // title,
      };
      console.log(_data);
      //   return;
      postData("/user/project", _data)
        .then((res) => {
          console.log(res);
          if (!res.error) {
            toast.update(tld, {
              render: "Employees Added Successfully",
              type: "success",
              isLoading: false,
            });
            props.close();
          } else {
            toast.update(tld, {
              render: "Adding Employees Failed. Please try again",
              type: "success",
              isLoading: false,
            });
          }
        })
        .catch((err) => {
          toast.error("Adding Employees Failed. Please try again");
          console.log("err", err);
        })
        .finally(() => {
          setBtnTxt("Employee");
          setUploading(false);
          setTimeout(() => {
            toast.dismiss(tld);
          }, 5000);
        });
    } else {
      toast.error(
        "Adding Employees Failed. Select at least one employee to proceeds"
      );
    }
  };

  const toggleSelect = (e) => {
    let _selected = selected;
    let _value = e.target.value;
    console.log(_value);
    if (_selected.includes(_value))
      _selected = _selected.flatMap((s) => (s === _value ? [] : [s]));
    else _selected.push(_value);
    console.log(_selected);
    setSelected(_selected);
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
          Add Employee(s)
        </h1>
        <button
          type="button"
          onClick={() => props.close()}
          className="px-3 py-2 rounded bg-red-400 hover:bg-gray-200 float-right font-semibold text-lg text-gray-100"
        >
          x
        </button>
        <div className="clear-both"></div>
        <hr className="my-2" />
        <div className="py-2">
          {employees.map((employee) => (
            <label
              key={employee._id}
              className="capitalize m-2 bg-blue-50 text-gray-700 p-2 rounded-full ring-1 ring-blue-500"
            >
              <input
                type="checkbox"
                value={employee._id}
                onClick={toggleSelect}
              />{" "}
              {employee.employee.name}
            </label>
          ))}
        </div>
        <hr className="my-2" />
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

export default AddEmployee;
