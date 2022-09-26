import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { isAuth } from "../../../Helpers/auth";
import {
  getData,
  postData,
  uploadToFirebaseStorage,
} from "../../../Helpers/request";

function JobSeeker(props) {
  const [profile, setProfile] = useState(null);
  const name = isAuth() ? isAuth().name : "";
  const email = isAuth() ? isAuth().email : "";
  const phone = isAuth() ? isAuth().phone : "";
  const [gender, setGender] = useState("");
  const [tag, setTag] = useState("");
  const [dob, setDOB] = useState("");
  const [hometown, setHometown] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [about, setAbout] = useState("");
  const [fb, setfb] = useState("");
  const [ig, setig] = useState("");
  const [tt, settt] = useState("");
  const [li, setli] = useState("");
  const [btn, setBtn] = useState({ text: "Update Profile", sending: false });
  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [hireable, setHireable] = useState(false);
  const [file, setFile] = useState(null);
  const [isFreelancer, setIsFreelancer] = useState(false);

  useEffect(() => {
    getData("/user/me/profile")
      .then((d) => {
        console.log(d);
        if (!d.error) {
          // setProfile(d.profile);
          setHometown(d.profile.hometown);
          setIsFreelancer(d.profile.isFreelancer);
          setfb(d.profile.fb);
          settt(d.profile.tt);
          setig(d.profile.ig);
          setTag(d.profile.tag);
          setli(d.profile.li);
          setRegion(d.profile.region);
          setHireable(d.profile.hireable);
          setAbout(d.profile.about);
          setCountry(d.profile.country);
          setDOB(d.profile.dob);
          setGender(d.profile.gender);
          setCategory(d.profile.category);
        }
      })
      .catch((e) => console.log(e));
    getData("/user/categories")
      .then((d) => {
        console.log(d);
        if (!d.error) {
          setCategories(d.categories);
        }
      })
      .catch((e) => console.log(e));
    getData("/user/skills")
      .then((d) => {
        console.log(d);
        if (!d.error) {
          setSkills(d.skills);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  const handleSkill = (e) => {
    let _s = skill;
    if (_s.includes(e)) {
      _s = _s.flatMap((s) => (s === e ? [] : [s]));
    } else {
      _s.push(e);
    }
    setSkill(_s);
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
      fb,
      tag,
      ig,
      hireable,
      tt,
      li,
      category,
      skill,
      isFreelancer,
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
      render: "Uploading profile Picture... Please wait",
      // type: "success",
      isLoading: true,
    });
    console.log(_data);
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
    <div className="h-screen bg-zinc-50 w-full overflow-auto">
      <ToastContainer />
      <div className="container mx-auto w-full md:w-11/12 pt-5 px-5 h-auto">
        <div className="container mx-auto pt-5 mt-8 px-2 md:px-8">
          <div className={`px-4 py-2 h-full w-full`}>
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
                  <span className="text-xl font-normal text-sky-500">
                    Welcome Back
                  </span>
                  <br />
                  Your {isAuth().status} Profile
                </div>
              </h2>
            </div>

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
                    <br />
                    <br />
                    <label key={skill._id} className="text-lg my-2">
                      <input
                        value="freelancer"
                        checked={isFreelancer}
                        type="checkbox"
                        onChange={() => setIsFreelancer(!isFreelancer)}
                      />{" "}
                      I'm a Freelancer
                    </label>
                  </div>
                  <div>
                    <label className="my-2 text-sm font-semibold">
                      Profile Status
                    </label>
                    <div className="w-full flex rounded-lg ring-1 ring-gray-200 bg-gradient-to-br from-gray-200 via-white to-gray-200 text-black">
                      <button
                        type="button"
                        className={`p-3 flex-grow font-bold text-lg ring-1 rounded-l-lg ring-gray-200 bg-gradient-to-br ${
                          !hireable
                            ? "from-gray-500 via-gray-400 to-gray-700 text-white hover:text-black hover:from-gray-200 hover:via-white hover:to-gray-200"
                            : "hover:from-gray-500 hover:via-gray-400 hover:to-gray-700 hover:text-white"
                        } transition duration-300 ease-in-out`}
                        onClick={() => setHireable(false)}
                      >
                        Private
                      </button>
                      <button
                        type="button"
                        onClick={() => setHireable(true)}
                        className={`p-3 flex-grow font-bold text-lg ring-1 rounded-r-lg ring-gray-200 bg-gradient-to-br ${
                          hireable
                            ? "from-green-500 via-green-400 to-green-700 text-white hover:from-gray-200 hover:via-white hover:to-gray-200 hover:text-black"
                            : "hover:from-green-500 hover:via-green-400 hover:to-green-700 hover:text-white"
                        } transition duration-300 ease-in-out`}
                      >
                        Public
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-2">
                  <label className="my-2 text-sm font-semibold">
                    Your Tag: (A very short description) I'm...
                  </label>
                  <input
                    className="w-full bg-white mb-3 p-4 ring-1 ring-blue-500 rounded"
                    placeholder="An innovative Hardworker"
                    value={tag}
                    // disabled
                    maxLength={30}
                    onChange={(e) => setTag(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <label className="my-2 text-sm font-semibold">Name</label>
                  <input
                    className="w-full bg-white mb-3 p-4 ring-1 ring-blue-500 rounded"
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
                  <label className="my-2 text-sm font-semibold">Email</label>
                  <input
                    className="w-full bg-white mb-3 p-4 ring-1 ring-blue-500 rounded"
                    placeholder="username@company.com"
                    value={email}
                    disabled
                    // onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <label className="my-2 text-sm font-semibold">
                    Mobile Number
                  </label>
                  <input
                    className="w-full bg-white mb-3 p-4 ring-1 ring-blue-500 rounded"
                    placeholder="(+233)0550 000 111"
                    value={phone}
                    disabled
                    // onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="clear-both"></div>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="container mx-auto w-full md:w-11/12 pt-5 px-5 h-auto"
      >
        <div className="container w-full overflow-hidden mx-auto mt-8 px-2 md:px-8">
          <div className=" relative text-sky-700 container w-full overflow-hidden h-full my-auto">
            <div className={`px-4 h-full w-full`}>
              <div className="flex-grow flex w-full content-center p-2">
                <div className="my-auto w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="mt-2">
                    <label className="my-2 text-sm font-semibold">
                      Date of Birth
                    </label>
                    <input
                      className="w-full bg-white mb-3 p-4 ring-1 ring-blue-500 rounded"
                      type="date"
                      value={dob}
                      onChange={(e) => setDOB(e.target.value)}
                    />
                  </div>
                  <div className="mt-2">
                    <label className="my-2 text-sm font-semibold">
                      Country
                    </label>
                    <input
                      className="w-full bg-white mb-3 p-4 ring-1 ring-blue-500 rounded"
                      placeholder="Ghana"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </div>
                  <div className="mt-2">
                    <label className="my-2 text-sm font-semibold">Region</label>
                    <input
                      className="w-full bg-white mb-3 p-4 ring-1 ring-blue-500 rounded"
                      placeholder="Greater Accra"
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                    />
                  </div>
                  <div className="mt-2">
                    <label className="my-2 text-sm font-semibold">
                      Home Address
                    </label>
                    <input
                      className="w-full bg-white mb-3 p-4 ring-1 ring-blue-500 rounded"
                      placeholder="No. 1 FillyJobs Arena"
                      value={hometown}
                      onChange={(e) => setHometown(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <label className="my-2 text-sm font-semibold">
                  Write About Yourself
                </label>
                <textarea
                  className="w-full bg-white mb-3 p-4 ring-1 ring-blue-500 rounded"
                  placeholder="Write something about you here..."
                  value={about}
                  rows={`5`}
                  onChange={(e) => setAbout(e.target.value)}
                ></textarea>
              </div>
              <div className="mt-2">
                <label className="my-2 text-sm font-semibold">
                  Make me visible for hiring in the
                </label>
                <select
                  className="w-full bg-white mb-3 p-4 ring-1 ring-blue-500 rounded"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value={``}>Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat.slug}>
                      {cat.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-2">
                <label className="my-2 text-sm font-semibold">
                  Make me visible for hiring of the following skills
                </label>
                <br className="my-3" />
                <div className="p-2 bg-white">
                  {skills.map((skill) => (
                    <label key={skill._id} className="mr-3">
                      <input
                        value={skill.slug}
                        type="checkbox"
                        onChange={() => handleSkill(skill.slug)}
                      />{" "}
                      {skill.title}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className={`p-1 h-full w-full`}>
              <div className="flex-grow flex w-full content-center">
                <div className="my-auto w-full">
                  <div className="my-2 grid grid-cols-1 md:grid-cols-4 gap-3">
                    <label className="my-2 mb-1 text-sm md:col-span-4 font-semibold">
                      Add your social media links here &nbsp;
                    </label>
                    <input
                      className="w-full bg-white mb-1 p-2 rounded ring-1 ring-blue-500"
                      placeholder="Facebook"
                      value={fb}
                      onChange={(e) => setfb(e.target.value)}
                    />
                    <input
                      className="w-full bg-white mb-1 p-2 rounded ring-1 ring-blue-500"
                      placeholder="Instagram"
                      value={ig}
                      onChange={(e) => setig(e.target.value)}
                    />
                    <input
                      className="w-full bg-white mb-1 p-2 rounded ring-1 ring-blue-500"
                      placeholder="Twitter"
                      value={tt}
                      onChange={(e) => settt(e.target.value)}
                    />
                    <input
                      className="w-full bg-white mb-1 p-2 rounded ring-1 ring-blue-500"
                      placeholder="LinkedIn"
                      value={li}
                      onChange={(e) => setli(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-2 text-center ">
                <button
                  type="submit"
                  disabled={btn.sending}
                  className={`${
                    btn.sending ? "disabled cursor-loading" : ""
                  } w-auto rounded p-4 bg-blue-400 uppercase text-sm font-bold text-gray-100`}
                >
                  {btn.text}
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

export default JobSeeker;
