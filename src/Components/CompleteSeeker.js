import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { isAuth } from "../Helpers/auth";
import { getData, postData, uploadToFirebaseStorage } from "../Helpers/request";

function CompleteSeeker(props) {
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
  const h = useHistory();

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
          toast("Redirecting you home...");
          setTimeout(() => h.push("/me/home"), 1500);
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
    <div
      className={`${
        props.show
          ? "h-screen w-full fixed overflow-hidden content-center bg-zinc-100 visible z-50 left-0 top-0"
          : "invisible hidden"
      } `}
    >
      <form
        onSubmit={handleSubmit}
        className="h-full text-gray-900 c overflow-auto mx-auto w-full md:w-11/12 pt-5 md:pt-10 px-5"
      >
        <div className="container w-full mx-auto mt-8 px-2 md:px-8">
          <div className="container w-full overflow-auto h-11/12 my-auto">
            <div className={`p-4 h-full w-full`}>
              <div>
                <h2 className="text-3xl font-bold mt-4">
                  Update your personal here
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
                    </div>
                  </div>

                  <div className="grid mt-2 gap-4 grid-cols-1 md:grid-cols-2">
                    <div className="">
                      <label className="text-blue-500 my-2 text-sm font-semibold">
                        Your Tag: (A very short description) I'm...
                      </label>
                      <input
                        className="ring-1 ring-blue-500 text-sky-600 rounded w-full bg-white mb-3 p-4"
                        placeholder="A Website Developer"
                        value={tag}
                        // disabled
                        maxLength={30}
                        onChange={(e) => setTag(e.target.value)}
                      />
                    </div>
                    <div className="">
                      <label className="text-blue-500 my-2 text-sm font-semibold">
                        Name
                      </label>
                      <input
                        className="ring-1 ring-blue-500 text-sky-600 rounded w-full bg-white mb-3 p-4"
                        placeholder="Mr Kwaku Frimpong"
                        value={name}
                        disabled
                        // onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid mt-2 gap-4 grid-cols-1 md:grid-cols-6">
                    <div className="mt-2 col-span-1 md:col-span-3">
                      <label className="text-blue-500 my-2 text-sm font-semibold">
                        Email
                      </label>
                      <input
                        className="ring-1 ring-blue-500 text-sky-600 rounded w-full bg-white mb-3 p-4"
                        placeholder="username@company.com"
                        value={email}
                        disabled
                        // onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mt-2 col-span-1 md:col-span-2">
                      <label className="text-blue-500 my-2 text-sm font-semibold">
                        Mobile Number
                      </label>
                      <input
                        className="ring-1 ring-blue-500 text-sky-600 rounded w-full bg-white mb-3 p-4"
                        placeholder="(+233)0550 000 111"
                        value={phone}
                        disabled
                        // onChange={(e) => setPhone(e.target.value)}
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
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-2 h-full w-full`}>
              <div className="flex-grow flex w-full content-center p-2">
                <div className="my-auto w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="mt-2">
                    <label className="text-blue-500 my-2 text-sm font-semibold">
                      Date of Birth
                    </label>
                    <input
                      className="ring-1 ring-blue-500 text-sky-600 rounded w-full bg-white mb-3 p-4"
                      type="date"
                      value={dob}
                      onChange={(e) => setDOB(e.target.value)}
                    />
                  </div>
                  <div className="mt-2">
                    <label className="text-blue-500 my-2 text-sm font-semibold">
                      Make me visible for hiring in
                    </label>
                    <select
                      className="ring-1 ring-blue-500 text-sky-600 rounded w-full bg-white mb-3 p-4"
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
                    <label className="text-blue-500 my-2 text-sm font-semibold">
                      Country
                    </label>
                    <input
                      className="ring-1 ring-blue-500 text-sky-600 rounded w-full bg-white mb-3 p-4"
                      placeholder="Ghana"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </div>
                  <div className="mt-2">
                    <label className="text-blue-500 my-2 text-sm font-semibold">
                      Region
                    </label>
                    <input
                      className="ring-1 ring-blue-500 text-sky-600 rounded w-full bg-white mb-3 p-4"
                      placeholder="Greater Accra"
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                    />
                  </div>
                  <div className="mt-2 md:col-span-2">
                    <label className="text-blue-500 my-2 text-sm font-semibold">
                      Home Address
                    </label>
                    <input
                      className="ring-1 ring-blue-500 text-sky-600 rounded w-full bg-white mb-3 p-4"
                      placeholder="No. 1 FillyJobs Arena"
                      value={hometown}
                      onChange={(e) => setHometown(e.target.value)}
                    />
                  </div>
                  <div className="my-2 col-span-1 md:col-span-3 grid gap-4 grid-cols-1 md:grid-cols-4">
                    <div className="col-span-1 md:col-span-4">
                      <label className="text-blue-500 text-sm font-semibold">
                        Add your social media links here &nbsp;
                      </label>
                    </div>
                    {/* <div> */}
                    <input
                      className="ring-1 ring-blue-500 text-sky-600 rounded w-full bg-white mb-1 p-2"
                      placeholder="Facebook"
                      value={fb}
                      onChange={(e) => setfb(e.target.value)}
                    />
                    <input
                      className="ring-1 ring-blue-500 text-sky-600 rounded w-full bg-white mb-1 p-2"
                      placeholder="Instagram"
                      value={ig}
                      onChange={(e) => setig(e.target.value)}
                    />
                    <input
                      className="ring-1 ring-blue-500 text-sky-600 rounded w-full bg-white mb-1 p-2"
                      placeholder="Twitter"
                      value={tt}
                      onChange={(e) => settt(e.target.value)}
                    />
                    <input
                      className="ring-1 ring-blue-500 text-sky-600 rounded w-full bg-white mb-1 p-2"
                      placeholder="LinkedIn"
                      value={li}
                      onChange={(e) => setli(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <label className="text-blue-500 my-2 text-sm font-semibold">
                  Write About Yourself
                </label>
                <textarea
                  className="ring-1 ring-blue-500 text-sky-600 rounded w-full bg-white mb-3 p-4"
                  placeholder="Write something about you here..."
                  value={about}
                  rows={`5`}
                  onChange={(e) => setAbout(e.target.value)}
                ></textarea>
              </div>
              <div className="mt-2">
                <label className="text-blue-500 my-2 text-sm font-semibold">
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
                  } rounded w-auto p-4 m-2 bg-blue-500 hover:bg-blue-600 uppercase text-sm font-bold text-gray-100`}
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
        <div className="h-20"></div>
      </form>
    </div>
  );
}

export default CompleteSeeker;
