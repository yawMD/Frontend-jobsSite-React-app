import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import { toast, ToastContainer } from "react-toastify";
import { isAuth } from "../Helpers/auth";
import { getData, postData, uploadToFirebaseStorage } from "../Helpers/request";

function CompleteAgency(props) {
  const h = useHistory();
  const name = isAuth() ? isAuth().name : "";
  const email = isAuth() ? isAuth().email : "";
  const phone = isAuth() ? isAuth().phone : "";

  const [title, setTitle] = useState("");
  const [agencyEmail, setAgencyEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [staffSize, setStaffSize] = useState(2);
  const [role, setRole] = useState(0);
  const [hiringBudget, setHiringBudget] = useState(0);

  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [fb, setfb] = useState("");
  const [ig, setig] = useState("");
  const [tt, settt] = useState("");
  const [li, setli] = useState("");
  const [btn, setBtn] = useState({
    text: "Update Agency Info",
    sending: false,
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    getData("/user/me/profile")
      .then((d) => {
        console.log(d);
        if (!d.error) {
          setfb(d.profile.fb);
          settt(d.profile.tt);
          setig(d.profile.ig);
          setli(d.profile.li);
          setRegion(d.profile.region);
          setCountry(d.profile.country);
          setGender(d.profile.gender);
          setWebsite(d.profile.website);
          setStaffSize(d.profile.staffSize);
          setHiringBudget(d.profile.hiringBudget);
          setAgencyEmail(d.profile.agencyEmail);
          setTitle(d.profile.title);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tld = toast.loading("Updating Agency's Information... Please wait");
    setBtn({ text: "Updating Information...", sending: true });
    let _data = {
      gender,
      country,
      region,
      fb,
      ig,
      tt,
      li,
      title,
      agencyEmail,
      website,
      staffSize,
      role,
      hiringBudget,
    };
    if (file) {
      let _f = "";
      try {
        toast.update(tld, {
          render: "Uploading Agency Picture... Please wait",
          // type: "success",
          isLoading: true,
        });
        _f = await uploadToFirebaseStorage(`users/profile/`, file);
        toast.update(tld, {
          render: "Uploading Agency Picture... Please wait",
          // type: "success",
          isLoading: true,
        });
      } catch (e) {
        toast.update(tld, {
          render: "Uploading picture failed update cancelled",
          type: "error",
          isLoading: false,
        });
        // toast.error("Error: Uploading Catergory Image Failed.");
        setBtn({ text: "Update Agency Info", sending: false });
        return;
      }
      _data.pic = _f;
    }
    toast.update(tld, {
      render: "Updating Data... Please wait",
      // type: "success",
      isLoading: true,
    });
    postData("/user/profile", _data)
      .then((d) => {
        if (d.error) {
          toast.update(tld, {
            render: d.message,
            type: "error",
            isLoading: false,
          });
          // toast.error(d.message);
        } else {
          toast.update(tld, {
            render: d.message,
            type: "success",
            isLoading: false,
          });
          h.push('/me/home')
          // toast(d.message);
        }
      })
      .catch((e) => {
        // toast.error(e.message);
        toast.update(tld, {
          render: e.message,
          type: "error",
          isLoading: false,
        });
      })
      .finally(() => {
        setBtn({ text: "Update Agency Info", sending: false });
        setTimeout(() => {
          toast.dismiss(tld);
        }, 5000);
      });
  };

  return (
    <div
      className={`${
        props.show
          ? "h-screen w-full fixed overflow-hidden content-center bg-zinc-100 text-zinc-800 visible z-50 left-0 top-0"
          : "invisible hidden"
      } `}
    >
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="h-full text-gray-900 c overflow-auto mx-auto w-full md:w-11/12 pt-5 md:pt-10 px-5"
      >
        <div className="container w-full overflow-hidden mx-auto mt-8 px-2 md:px-8">
          <div className=" relative text-gray-900 container w-full overflow-hidden h-full my-auto">
            <div className={`px-4 h-full w-full`}>
              <div>
                <h2 className="text-3xl font-bold mt-4">Update Information</h2>
              </div>

              <div className="flex-grow flex w-full content-center p-2">
                <div className="my-auto w-full">
                  <div className="grid grid-cols-2">
                    <div className="my-4">
                      <p className="my-2 text-sm font-semibold">Logo Upload</p>
                      <label
                        htmlFor="image"
                        className="bg-blue-500 text-white cursor-pointer rounded p-2"
                      >
                        Upload Agency Logo
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files[0])}
                        name="image"
                        hidden
                        id="image"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    <div className="mt-2 ">
                      <label className="my-2 text-sm font-semibold">Name</label>
                      <input
                        className="w-full bg-white mb-3 p-4 rounded ring-1"
                        placeholder="Mr Kwaku Frimpong"
                        value={name}
                        disabled
                        // onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="mt-2">
                      <label className="my-2 text-sm font-semibold">
                        Mobile Number
                      </label>
                      <PhoneInput
                        className="w-full bg-white mb-3 p-4 rounded ring-1"
                        name="phone"
                        placeholder="(+233)0550 000 111"
                        value={phone}
                        disabled
                        // onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div className="my-2 font-semibold bg-white rounded">
                      <p className="my-2 text-sm">Gender</p>
                      <label>
                        <input
                          type="radio"
                          name="gender"
                          onClick={(e) => setGender("male")}
                          onChange={(e) => setGender("male")}
                        />{" "}
                        Male
                      </label>
                      &nbsp; &nbsp;
                      <label>
                        <input
                          type="radio"
                          name="gender"
                          onClick={(e) => setGender("female")}
                          onChange={(e) => setGender("female")}
                        />{" "}
                        Female
                      </label>
                    </div>
                    <div className="mt-2">
                      <label className="my-2 text-sm font-semibold">
                        Email
                      </label>
                      <input
                        className="w-full bg-white mb-3 p-4 rounded ring-1"
                        placeholder="username@company.com"
                        value={email}
                        disabled
                        // onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-4 h-full w-full`}>
              <div>
                <h2 className="text-3xl font-bold mt-4">
                  Update Agency's Information
                </h2>
              </div>
              <div className="flex-grow flex w-full content-center p-2">
                <div className="my-auto w-full grid gap-4 grid-cols-1 md:grid-cols-4">
                  <div className="col-span-1 md:col-span-4 grid gap-4 grid-cols-1 md:grid-cols-2">
                    <div className="mt-2">
                      <label className="my-2 text-sm font-semibold">
                        Agency Name
                      </label>
                      <input
                        className="w-full bg-white mb-3 p-4 rounded ring-1"
                        placeholder="FillyJobs Limited"
                        value={title}
                        required
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div className="mt-2">
                      <label className="my-2 text-sm font-semibold">
                        Agency Email
                      </label>
                      <input
                        className="w-full bg-white mb-3 p-4 rounded ring-1"
                        placeholder="info@company.com"
                        value={agencyEmail}
                        type="email"
                        required
                        onChange={(e) => setAgencyEmail(e.target.value)}
                      />
                    </div>
                    <div className="mt-2">
                      <label className="my-2 text-sm font-semibold">
                        Staff Size
                      </label>
                      <input
                        className="w-full bg-white mb-3 p-4 rounded ring-1"
                        placeholder="25 Employees"
                        value={staffSize}
                        min={2}
                        type="number"
                        step={1}
                        onChange={(e) => setStaffSize(e.target.value)}
                      />
                    </div>
                    <div className="mt-2">
                      <label className="my-2 text-sm font-semibold">
                        Salaries Range
                      </label>
                      <select
                        className="w-full bg-white mb-3 p-4 rounded ring-1"
                        value={hiringBudget}
                        onChange={(e) => setHiringBudget(e.target.value)}
                      >
                        <option value={null}>Select an option</option>
                        <option value="<1000">Less than GHS 1,000</option>
                        <option value="1000-5000">
                          Between GHS 1,000 and 5,000
                        </option>
                        <option value="5000-15000">
                          Between GHS 5,000 and 15,000
                        </option>
                        <option value="1000-5000">Above GHS 15,000</option>
                      </select>
                    </div>
                    <div className="mt-2">
                      <label className="my-2 text-sm font-semibold">
                        Role in Agency
                      </label>
                      <select
                        className="w-full bg-white mb-3 p-4 rounded ring-1"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <option value={null}>Select an option</option>
                        <option value="chief">Chief Level</option>
                        <option value="senior-management">
                          Senior Management
                        </option>
                        <option value="middle-management">
                          Middle Management
                        </option>
                        <option value="junior-level">Junior Level</option>
                      </select>
                    </div>
                    <div className="mt-2">
                      <label className="my-2 text-sm font-semibold">
                        Company Website
                      </label>
                      <input
                        className="w-full bg-white mb-3 p-4 rounded ring-1"
                        placeholder="https://companyweb.site"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-span-1 md:col-span-4">
                    <label className="my-2 text-sm font-semibold">
                      Add social media links here &nbsp;
                    </label>
                  </div>
                  <div className="my-2">
                    <input
                      className="w-full bg-white mb-1 p-2 ring-1 rounded"
                      placeholder="Facebook"
                      value={fb}
                      onChange={(e) => setfb(e.target.value)}
                    />
                  </div>
                  <div className="my-2">
                    <input
                      className="w-full bg-white mb-1 p-2 ring-1 rounded"
                      placeholder="Instagram"
                      value={ig}
                      onChange={(e) => setig(e.target.value)}
                    />
                  </div>
                  <div className="my-2">
                    <input
                      className="w-full bg-white mb-1 p-2 ring-1 rounded"
                      placeholder="Twitter"
                      value={tt}
                      onChange={(e) => settt(e.target.value)}
                    />
                  </div>
                  <div className="my-2">
                    <input
                      className="w-full bg-white mb-1 p-2 ring-1 rounded"
                      placeholder="LinkedIn"
                      value={li}
                      onChange={(e) => setli(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-10 text-center">
                <button
                  type="submit"
                  disabled={btn.sending}
                  className={`${
                    btn.sending ? "disabled cursor-loading" : ""
                  } rounded w-auto p-4 m-2 bg-blue-500 hover:bg-blue-600 uppercase text-sm font-bold text-white`}
                >
                  {btn.text}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    props.close();
                    h.push("/me/home");
                  }}
                  disabled={btn.sending}
                  className={`rounded w-auto p-4 m-2 bg-red-500 hover:bg-red-600 uppercase text-sm font-bold text-white`}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="h-24"></div>
      </form>
    </div>
  );
}

export default CompleteAgency;
