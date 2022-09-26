import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import { toast, ToastContainer } from "react-toastify";
import UserMenu from "../../../Components/UserMenu";
import MakeRequest from "../../../Components/MakeRequest";
import { isAuth } from "../../../Helpers/auth";
import {
  getData,
  postData,
  uploadToFirebaseStorage,
} from "../../../Helpers/request";

function Agency(props) {
const [show, setShow] = useState(false)

  const name = isAuth() ? isAuth().name : "";
  const email = isAuth() ? isAuth().email : "";
  const phone = isAuth() ? isAuth().phone : "";
  const [gender, setGender] = useState("");
  const [tag, setTag] = useState("");
  const [dob, setDOB] = useState("");
  const [hometown, setHometown] = useState("");
  const [serviceCost, setServiceCost] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  const [about, setAbout] = useState("");
  const [fb, setfb] = useState("");
  const [ig, setig] = useState("");
  const [tt, settt] = useState("");
  const [li, setli] = useState("");
  const [btn, setBtn] = useState({ text: "Update Profile", sending: false });
  const [subservices, setSubservices] = useState([]);
  const [subservice, setSubservice] = useState([]);
  const [services, setServices] = useState([]);
  const [service, setService] = useState("");
  const [hireable, setHireable] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    getData("/user/me/profile")
      .then((d) => {
        console.log(d);
        if (!d.error) {
          // setProfile(d.profile);
          setHometown(d.profile.hometown);
          setfb(d.profile.fb);
          settt(d.profile.tt);
          setig(d.profile.ig);
          setTag(d.profile.tag);
          setli(d.profile.li);
          setRegion(d.profile.region);
          setHireable(d.profile.hireable);
          setAbout(d.profile.about);
          setCountry(d.profile.country);
          setCity(d.profile.city);
          setZip(d.profile.zip);
          setState(d.profile.state);
          setDOB(d.profile.dob);
          setGender(d.profile.gender);
          setService(d.profile.service);
          setSpecialty(d.profile.service);
        }
      })
      .catch((e) => console.log(e));
    getData("/user/services")
      .then((d) => {
        console.log(d);
        if (!d.error) {
          setServices(d.services);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    setSubservices([]);
    if (service && service.length > 0) {
      getData(`/user/subservices/${service}`)
        .then((d) => {
          console.log(d);
          if (!d.error) {
            setSubservices(d.subservices);
          }
        })
        .catch((e) => console.log(e));
    }
  }, [service]);

  const handleSubservice = (e) => {
    let _s = subservice;
    if (_s.includes(e)) {
      _s = _s.flatMap((s) => (s === e ? [] : [s]));
    } else {
      _s.push(e);
    }
    setSubservice(_s);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tld = toast.loading("Updating your profile... Please wait");
    setBtn({ text: "Updating Profile...", sending: true });
    let _data = {
      about,
      gender,
      dob,
      hometown,
      country,
      region,
      city,
      state,
      zip,
      serviceCost,
      fb,
      tag,
      ig,
      hireable,
      tt,
      li,
      service,
      subservice,
      specialty,
    };
    if (file) {
      let _f = "";
      try {
        toast.update(tld, {
          render: "Uploading profile Picture... Please wait",
          // type: "success",
          isLoading: true,
        });
        _f = await uploadToFirebaseStorage(`users/profile/`, file);
        toast.update(tld, {
          render: "Uploading profile Picture... Please wait",
          type: "success",
          isLoading: true,
        });
      } catch (e) {
        toast.update(tld, {
          render: "Uploading profile picture failed update cancelled",
          type: "error",
          isLoading: false,
        });
        // toast.error("Error: Uploading Catergory Image Failed.");
        setBtn({ text: "Update Profile", sending: false });
        return;
      }
      _data.pic = _f;
    }
    toast.update(tld, {
      render: "Uploading Profile data... Please wait",
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
        setBtn({ text: "Update Profile", sending: false });
        setTimeout(() => {
          toast.dismiss(tld);
        }, 5000);
      });
  };

  return (
    <div className="h-screen bg-slate-50 w-full overflow-auto">
      <ToastContainer />
      <UserMenu />
      <MakeRequest show={show} close={() => setShow(false)} />
      {/* <div className="container mx-auto w-full pt-5 md:pt-10 px-5 h-auto"></div> */}
      <form
        onSubmit={handleSubmit}
        className="h-full text-gray-900 mx-auto w-full ring-1 ring-gray-200"
      >
        <div className=" w-full mx-auto">
          <div className=" w-full overflow-auto h-11/12 my-auto">
            <div
              className={`p-4 h-full w-full bg-white p-8 ring-1 ring-gray-200 shadow`}
            >
              <div className="flex">
                {isAuth().pic && (
                  <div className="py-2 px-4">
                    <div
                      className="bg-black rounded-full w-32 h-32"
                      style={{
                        backgroundImage: `url(${isAuth().pic})`,
                        backgroundPosition: "center center",
                        backgroundSize: "cover",
                      }}
                    ></div>
                  </div>
                )}
                <h2 className="text-2xl font-bold mt-4 flex justify-center capitalize mb-0">
                  <div className="my-auto">
                    <span className="text-2xl font-semibold text-sky-700">
                      {isAuth().name}
                    </span>
                    <br />
                    {isAuth().status} Profile
                  </div>
                </h2>
              </div>
            </div>
            <div className={`p-4 h-full w-full m-auto container c`}>
              <div className="flex-grow flex w-full content-center p-2">
                <div className="my-auto w-full">
                  <div className="grid grid-cols-2">
                    <div className="my-4">
                      <p className="my-2 text-sm font-semibold">Image Upload</p>
                      {/* <br /> */}
                      <label
                        htmlFor="image"
                        className="bg-blue-500 text-white cursor-pointer rounded p-2"
                      >
                        Upload Profile Picture
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

                  <div className="grid mt-2 gap-4 grid-cols-1 md:grid-cols-2">
                    <div className="">
                      <label className="text-sky-500 my-2 text-sm font-semibold">
                        Name
                      </label>
                      <input
                        className="ring-1 ring-gray-300 text-gray-500 rounded w-full bg-gray-100 p-2 mb-3"
                        placeholder="Mr Kwaku Frimpong"
                        value={name}
                        disabled
                        // onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="my-2 font-semibold">
                      <p className="my-2 text-sm">Gender</p>
                      <label>
                        <input
                          type="radio"
                          name="gender"
                          checked={gender === "male"}
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
                          checked={gender === "female"}
                          onClick={(e) => setGender("female")}
                          onChange={(e) => setGender("female")}
                        />{" "}
                        Female
                      </label>
                    </div>
                  </div>

                  <div className="grid mt-2 gap-4 grid-cols-1 md:grid-cols-6">
                    <div className="mt-2 col-span-1 md:col-span-3">
                      <label className="text-sky-500 my-2 text-sm font-semibold">
                        Email
                      </label>
                      <input
                        className="ring-1 ring-gray-300 text-gray-500 rounded w-full bg-gray-100 p-2 mb-3"
                        placeholder="username@company.com"
                        value={email}
                        disabled
                        // onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mt-2 col-span-1 md:col-span-3">
                      <label className="text-sky-500 my-2 text-sm font-semibold">
                        Mobile Number
                      </label>
                      <input
                        className="ring-1 ring-gray-300 text-gray-500 rounded w-full bg-gray-100 p-2 mb-3"
                        placeholder="(+233)0550 000 111"
                        value={phone}
                        disabled
                        // onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className={`p-2 h-full w-full`}>
                <div className="flex-grow flex w-full content-center p-2">
                  <div className="my-auto w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="mt-2">
                      <label className="text-sky-500 my-2 text-sm font-semibold">
                        Date of Birth
                      </label>
                      <input
                        className="ring-1 ring-sky-500 text-sky-600 rounded w-full bg-white mb-3 p-4"
                        type="date"
                        value={dob}
                        onChange={(e) => setDOB(e.target.value)}
                      />
                    </div>
                    <div className="mt-2">
                      <label className="text-sky-500 my-2 text-sm font-semibold">
                        Country
                      </label>
                      <input
                        className="ring-1 ring-sky-500 text-sky-600 rounded w-full bg-white mb-3 p-4"
                        placeholder="Ghana"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      />
                    </div>
                    {country.toLowerCase() === "ghana" && (
                      <div className="mt-2">
                        <label className="text-sky-500 my-2 text-sm font-semibold">
                          Region
                        </label>
                        <input
                          className="ring-1 ring-sky-500 text-sky-600 rounded w-full bg-white mb-3 p-4"
                          placeholder="Greater Accra"
                          value={region}
                          onChange={(e) => setRegion(e.target.value)}
                        />
                      </div>
                    )}
                    {country.toLowerCase() !== "ghana" && (
                      <div className="mt-2">
                        <label className="text-sky-500 my-2 text-sm font-semibold">
                          City
                        </label>
                        <input
                          className="ring-1 ring-sky-500 text-sky-600 rounded w-full bg-white mb-3 p-4"
                          placeholder="New York"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </div>
                    )}
                    {country.toLowerCase() !== "ghana" && (
                      <div className="mt-2">
                        <label className="text-sky-500 my-2 text-sm font-semibold">
                          State
                        </label>
                        <input
                          className="ring-1 ring-sky-500 text-sky-600 rounded w-full bg-white mb-3 p-4"
                          placeholder="New York"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                        />
                      </div>
                    )}
                    {country.toLowerCase() !== "ghana" && (
                      <div className="mt-2">
                        <label className="text-sky-500 my-2 text-sm font-semibold">
                          Zip code
                        </label>
                        <input
                          className="ring-1 ring-sky-500 text-sky-600 rounded w-full bg-white mb-3 p-4"
                          placeholder="90210"
                          value={zip}
                          onChange={(e) => setZip(e.target.value)}
                        />
                      </div>
                    )}
                      <div className="mt-2">
                        <label className="text-sky-500 my-2 text-sm font-semibold">
                         {country.toLowerCase() === "ghana" ?  "Home " : ""} Address
                        </label>
                        <input
                          className="ring-1 ring-sky-500 text-sky-600 rounded w-full bg-white mb-3 p-4"
                          placeholder="No. 1 FillyJobs Arena"
                          value={hometown}
                          onChange={(e) => setHometown(e.target.value)}
                        />
                      </div>
                    
                    <div className="mt-2 mb-3">
                      <label className="text-sky-500 my-2 text-sm font-semibold">
                        Make me searcheable in
                      </label>
                      <select
                        className="ring-1 ring-sky-500 text-sky-600 rounded w-full bg-white p-4"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                      >
                        <option value={``}>Select Service</option>
                        {services.map((cat) => (
                          <option key={cat._id} value={cat.slug}>
                            {cat.title} Services
                          </option>
                        ))}
                      </select>
                      <button type="button" onClick={() => setShow(true)} className="float-right text-sky-500 my-2 text-xs underline">Can't find your service?</button>
                    </div>
                    <div className="mt-2">
                      <label className="text-sky-500 my-2 text-sm font-semibold">
                        Service Cost starting from (GHS)
                      </label>
                      <input
                        className="ring-1 ring-sky-500 text-sky-600 rounded w-full bg-white mb-3 p-4"
                        placeholder="20"
                        min={10}
                        step={1}
                        type="number"
                        value={serviceCost}
                        onChange={(e) => setServiceCost(e.target.value)}
                      />
                    </div>
                    {subservices.length > 0 && (
                      <div className="mt-2 md:col-span-3">
                        <label className="text-sky-500 my-2 text-sm font-semibold">
                          I specialize in the following services
                        </label>
                        <br className="my-3" />
                        <div className="ring-1 rounded ring-sky-500 p-2 bg-white">
                          {subservices.map((subservice) => (
                            <label key={subservice._id} className="mr-3">
                              <input
                                value={subservice.slug}
                                type="checkbox"
                                onChange={() =>
                                  handleSubservice(subservice.slug)
                                }
                              />{" "}
                              {subservice.title}
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="my-2 col-span-1 md:col-span-3">
                      <label className="text-sky-500 my-2 text-sm font-semibold">
                        Input any extra specializations you may have here (comma
                        seperated)
                      </label>
                      <input
                        className="ring-1 ring-sky-500 text-sky-600 rounded w-full bg-white mb-3 p-4"
                        placeholder="eg. plumbing, carpentry, furnisihing, painting"
                        value={specialty}
                        name="specialty"
                        onChange={(e) => setSpecialty(e.target.value)}
                      />
                    </div>
                    <div className="my-2 col-span-1 md:col-span-3 grid gap-4 grid-cols-1 md:grid-cols-4">
                      <div className="col-span-1 md:col-span-4">
                        <label className="text-sky-500 text-sm font-semibold">
                          Add your social media links here &nbsp;
                        </label>
                      </div>
                      {/* <div> */}
                      <input
                        className="ring-1 ring-sky-500 text-sky-600 rounded w-full bg-white mb-1 p-2"
                        placeholder="Facebook"
                        value={fb}
                        onChange={(e) => setfb(e.target.value)}
                      />
                      <input
                        className="ring-1 ring-sky-500 text-sky-600 rounded w-full bg-white mb-1 p-2"
                        placeholder="Instagram"
                        value={ig}
                        onChange={(e) => setig(e.target.value)}
                      />
                      <input
                        className="ring-1 ring-sky-500 text-sky-600 rounded w-full bg-white mb-1 p-2"
                        placeholder="Twitter"
                        value={tt}
                        onChange={(e) => settt(e.target.value)}
                      />
                      <input
                        className="ring-1 ring-sky-500 text-sky-600 rounded w-full bg-white mb-1 p-2"
                        placeholder="LinkedIn"
                        value={li}
                        onChange={(e) => setli(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-2 p-2">
                  <label className="text-sky-500 my-2 text-sm font-semibold">
                    Write About Yourself
                  </label>
                  <textarea
                    className="ring-1 ring-sky-500 text-sky-600 rounded w-full bg-white mb-3 p-4"
                    placeholder="Write something about you here..."
                    value={about}
                    rows={`5`}
                    onChange={(e) => setAbout(e.target.value)}
                  ></textarea>
                </div>
              </div>

              <div className={`p-2 h-full w-full`}>
                <div className="flex-grow flex w-full content-center">
                  <div className="my-auto w-full"></div>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={btn.sending}
                    className={`${
                      btn.sending ? "disabled cursor-loading" : ""
                    } rounded w-auto p-4 m-2 bg-sky-500 hover:bg-sky-600 uppercase text-sm font-bold text-gray-100`}
                  >
                    {btn.text}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-20"></div>
      </form>
    </div>
  );
}

export default Agency;
