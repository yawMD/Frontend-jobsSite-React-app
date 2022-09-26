import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  getData,
  postData,
  uploadToFirebaseStorage,
} from "../../../../Helpers/request";

function AddJob(props) {
  const [btnTxt, setBtnTxt] = useState("Post Job");
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [postLocation, setPostLocation] = useState("");
  const [projectType, setProjectType] = useState("");
  const [skills, setSkills] = useState([]);
  const [budgetType, setBudgetType] = useState("");
  const [budget, setBudget] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [skillText, setSkillText] = useState("");
  const [skillsArr, setSkillsArr] = useState([]);
  const [projectLength, setProjectLength] = useState("");
  const [weeklyHours, setWeeklyHours] = useState("");

  useEffect(() => {
    getData("/user/categories")
      .then((d) => {
        console.log(d);
        if (!d.error) {
          setCategories(d.categories);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  const handleCatChange = (e) => {
    setCategory(e);
    setSkillsArr([]);
    setSkills([]);
    if (e.length > 0) {
      getData(`/user/category/${e}`)
        .then((d) => {
          console.log(d);
          if (!d.error) {
            setSkillsArr(d.skills);
          }
        })
        .catch((e) => console.error(e));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnTxt("Uploading...");
    setUploading(true);
    if (
      budgetType.length > 0 &&
      projectType.length > 0 &&
      skills.length > 0 &&
      skillLevel.length > 0
    ) {
      //   validate here
      toast.info("Uploading Job. Please Wait...");
      let _data = {
        title,
        description,
        post_location: postLocation,
        job_location: jobLocation,
        project_type: projectType,
        skills,
        budget_type: budgetType,
        budget,
        category,
        skill_level: skillLevel,
        skill_text: skillText,
        project_length: projectLength,
        weekly_hours: weeklyHours,
      };
      console.log(_data);
      //   return;
      postData("/user/post", _data)
        .then((res) => {
          console.log(res);
          if (!res.error) {
            toast.success("Uploading Job Successful");
            props.close();
          } else {
            toast.error("Uploading Job Failed. Please try again");
          }
        })
        .catch((err) => {
          toast.error("Uploading Job Failed. Please try again");
          console.log("err", err);
        })
        .finally(() => {
          setBtnTxt("Post Job");
          setUploading(false);
        });
    } else {
      toast.error(
        "Job Post Upload Failed. Make sure all fields are filled and try again"
      );
      setBtnTxt("Post Job");
      setUploading(false);
    }
  };

  const selectSkill = (e) => {
    let _s = skills;
    console.log(e);
    if (_s.includes(e)) {
      _s = _s.flatMap((s) => (s === e ? [] : [e]));
    } else {
      _s.push(e);
    }
    setSkills(_s);
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
        className="container md:mx-auto w-full mx-2 md:my-auto md:w-2/3 bg-white rounded shadow p-7  overflow-auto"
      >
        <h1 className="float-left font-light text-3xl text-blue-500">
          Add Job
        </h1>
        <button
          type="button"
          onClick={() => props.close()}
          className="px-3 py-2 rounded bg-red-400 hover:bg-gray-200 float-right font-semibold text-lg text-gray-100"
        >
          x
        </button>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 m-2 clear-both">
          <div className="md:col-span-3 py-2">
            <label className="text-sm uppercase mb-2 text-gray-400 p-2 font-bold">
              Job Title
            </label>
            <input
              className="p-4 rounded-lg w-full hover:shadow-lg border-2 hover:border-4 shadow-none hover:border-gray-200"
              required
              placeholder="Enter Job Title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="py-2 md:col-span-2">
            <label className="text-sm uppercase mb-2 text-gray-400 p-2 font-bold">
              Select Category
            </label>
            <select
              className="p-4 rounded-lg w-full hover:shadow-lg border-2 hover:border-4 shadow-none hover:border-gray-200"
              name="category"
              value={category}
              onChange={(e) => handleCatChange(e.target.value)}
            >
              <option value={``}>Select Category</option>
              {categories.map((c) => (
                <option key={c._id} value={c.slug}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="m-2 py-2">
          <label className="text-sm uppercase mb-2 text-gray-400 p-2 font-bold">
            Description
          </label>
          <textarea
            className="p-4 rounded-lg w-full hover:shadow-lg border-2 hover:border-4 shadow-none hover:border-gray-200"
            required
            placeholder="I am looking for a..."
            name="description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="m-2 grid grid-col-1 md:grid-cols-3 gap-2">
          <div className="py-2">
            <label className="text-sm uppercase mb-2 text-gray-400 p-2 font-bold">
              Project Type
            </label>
            <select
              className="p-4 rounded-lg w-full hover:shadow-lg border-2 hover:border-4 shadow-none hover:border-gray-200"
              name="projectType"
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
            >
              <option value={``}>Select Project Type</option>
              <option value={`one-time project`}>One-Time Project</option>
              <option value="recurring">Recurring Hire</option>
            </select>
          </div>
          <div className="py-2">
            <label className="text-sm uppercase mb-2 text-gray-400 p-2 font-bold">
              Budget Type
            </label>
            <select
              className="p-4 rounded-lg w-full hover:shadow-lg border-2 hover:border-4 shadow-none hover:border-gray-200"
              name="budgetType"
              value={budgetType}
              onChange={(e) => setBudgetType(e.target.value)}
            >
              <option value={``}>Select Budget Type</option>
              <option value={`fixed`}>Fixed Budget</option>
              <option value={`hourly`}>Hourly Budget</option>
            </select>
          </div>
          <div className="py-2">
            <label className="text-sm uppercase mb-2 text-gray-400 p-2 font-bold">
              Budget
            </label>
            <input
              className="p-4 rounded-lg w-full hover:shadow-lg border-2 hover:border-4 shadow-none hover:border-gray-200"
              required
              placeholder="Enter Budgeted Spend"
              name="budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </div>
        </div>
        <div className="m-2 grid grid-col-1 md:grid-cols-5 gap-2">
          <div className="py-2">
            <label className="text-sm uppercase mb-2 text-gray-400 p-2 font-bold">
              Project Length
            </label>
            <input
              className="p-4 rounded-lg w-full hover:shadow-lg border-2 hover:border-4 shadow-none hover:border-gray-200"
              required
              placeholder="Less than a month..."
              name="projectLength"
              value={projectLength}
              onChange={(e) => setProjectLength(e.target.value)}
            />
          </div>
          <div className="py-2">
            <label className="text-sm uppercase mb-2 text-gray-400 p-2 font-bold">
              Skill Level
            </label>
            <select
              className="p-4 rounded-lg w-full hover:shadow-lg border-2 hover:border-4 shadow-none hover:border-gray-200"
              name="skillLevel"
              value={skillLevel}
              onChange={(e) => setSkillLevel(e.target.value)}
            >
              <option value={``}>Select Skill Level</option>
              <option value={`entry`}>Entry Level</option>
              <option value="intermediate">Intermediate</option>
              <option value={`advanced`}>Advanced</option>
              <option value={`master`}>Master's</option>
            </select>
          </div>
          <div className="py-2 col-span-2">
            <label className="text-sm uppercase mb-2 text-gray-400 p-2 font-bold">
              Skill Description
            </label>
            <input
              className="p-4 rounded-lg w-full hover:shadow-lg border-2 hover:border-4 shadow-none hover:border-gray-200"
              required
              placeholder="Just a bit above intermediate is sufficient..."
              name="skillText"
              value={skillText}
              onChange={(e) => setSkillText(e.target.value)}
            />
          </div>
          <div className="py-2">
            <label className="text-sm uppercase mb-2 text-gray-400 p-2 font-bold">
              Work Hrs/Wk
            </label>
            <input
              className="p-4 rounded-lg w-full hover:shadow-lg border-2 hover:border-4 shadow-none hover:border-gray-200"
              required
              placeholder="30 hrs/wk"
              name="weeklyHours"
              value={weeklyHours}
              onChange={(e) => setWeeklyHours(e.target.value)}
            />
          </div>
        </div>
        <div className="p-2">
          <p className="my-2 font-semibold text-lg">Add Skills</p>
          {skillsArr.map((skill) => (
            <label
              key={skill._id}
              className="py-1 px-3 mr-1 bg-white border-2 text-blue-500 border-blue-500 rounded-full"
            >
              <input type="checkbox" onChange={() => selectSkill(skill.slug)} />{" "}
              {skill.title}
            </label>
          ))}
        </div>
        <div className="m-2 grid grid-col-1 md:grid-cols-2 gap-2">
          <div className="py-2">
            <label className="text-sm uppercase mb-2 text-gray-400 p-2 font-bold">
              I'm posting from
            </label>
            <input
              className="p-4 rounded-lg w-full hover:shadow-lg border-2 hover:border-4 shadow-none hover:border-gray-200"
              required
              placeholder="Nigeria"
              name="postLocation"
              value={postLocation}
              onChange={(e) => setPostLocation(e.target.value)}
            />
          </div>
          <div className="py-2">
            <label className="text-sm uppercase mb-2 text-gray-400 p-2 font-bold">
              Seeking talent in
            </label>
            <input
              className="p-4 rounded-lg w-full hover:shadow-lg border-2 hover:border-4 shadow-none hover:border-gray-200"
              required
              placeholder="Ghana"
              name="jobLocation"
              value={jobLocation}
              onChange={(e) => setJobLocation(e.target.value)}
            />
          </div>
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

export default AddJob;
