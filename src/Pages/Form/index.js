import React, { useEffect, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import AddCategory from "../../Components/AddCategory";
import { PaystackButton } from "react-paystack";
import "./index.css";
import { postData } from "../../Helpers/request";
import { isAuth } from "../../Helpers/auth";

function Form(props) {
  const [array, setArray] = useState([
    "hidden",
    "hidden",
    "hidden",
    "hidden",
    "hidden",
    "hidden",
    "hidden",
    "hidden",
    "hidden",
    "hidden",
    "hidden",
    "hidden",
    "hidden",
    "hidden",
    "hidden",
    "hidden",
  ]);
  const [active, setActive] = useState(0);
  const [show, setShow] = useState(false);
  const [h, setH] = useState(0);

  // Questions
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDOB] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [hometown, setHometown] = useState("");
  const [religion, setReligion] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [address, setAddress] = useState("");
  const [allergies, setAllergies] = useState("");
  const [employmentStatus, setEmploymentStatus] = useState("");
  const [occupation, setOccupation] = useState("");
  const [jobStatus, setJobStatus] = useState("");
  const [workplace, setWorkplace] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [likes, setLikes] = useState("");
  const [dislikes, setDislikes] = useState("");
  const [sports, setSports] = useState("");
  const [drink, setDrink] = useState("");
  const [smoke, setSmoke] = useState("");
  const [blood, setBlood] = useState("");
  const [sickling, setSickling] = useState("");
  const [disorders, setDisorders] = useState("");
  const [ailments, setAilments] = useState("");
  const [description, setDescription] = useState("");
  const [flaws, setFlaws] = useState("");
  const [children, setChildren] = useState("");
  const [childrenDesc, setChildrenDesc] = useState("");
  const [wantChildren, setWantChildren] = useState("");
  const [mateKind, setMateKind] = useState("");
  const [inRelationShip, setInRelationShip] = useState("");
  const [relationshipLast, setRelationshipLast] = useState("");
  const [mateBodyType, setMateBodyType] = useState("");
  const [mateComplexion, setMateComplexion] = useState("");
  const [mateAgeRange, setMateAgeRange] = useState("");
  const [mateIncome, setMateIncome] = useState(1);
  const [mateDailyMeal, setMateDailyMeal] = useState(1);
  const [mateSex, setMateSex] = useState(1);
  const [mateCheatingIntolerance, setMateCheatingIntolerance] = useState(1);
  const [mateSocialLife, setMateSocialLife] = useState(1);
  const [sexuality, setSexuality] = useState(1);
  const [marrySingleParent, setMarrySingleParent] = useState("");
  const [marryDivorced, setMarryDivorced] = useState("");
  const [loveLanguage, setLoveLanguage] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [incomeRange, setIncomeRange] = useState("");
  const [wantChildrenDesc, setWantChildrenDesc] = useState("");
  const [oldRelationshipEndReason, setOldRelationshipEndReason] = useState("");
  const [fb, setfb] = useState("");
  const [ig, setig] = useState("");
  const [tt, settt] = useState("");
  const [li, setli] = useState("");
  const [dealBreakers, setDealBreakers] = useState([]);
  const [passport, setPassport] = useState("");
  const [fullPic, setFullPic] = useState("");
  const _h = useHistory();
  const setActiveDiv = (n) => {
    let _arr = array;
    if (n === 0 && n === active) {
      _arr[n] = "slide-in-right";
      setArray(_arr);
      setActive(n);
      setH(1);
    } else {
      if (n > active) {
        if (validate(n)) {
          _arr[active] = "slide-out-left";
          _arr[n] = "slide-in-right";
          setArray(_arr);
          setActive(n);
          setH(1);
        } else {
          toast.error("Kindly fill all fields in this section to proceed");
        }
      } else {
        _arr[active] = "slide-out-right";
        _arr[n] = "slide-in-left";
        setArray(_arr);
        setActive(n);
        setH(1);
      }
    }
  };

  useEffect(() => {
    if (!isAuth()) {
      toast.warn(
        "Your are not logged in. Create an account or login to proceed"
      );
      setTimeout(() => {
        _h.push("/login");
      }, 10000);
    } else {
      setActiveDiv(0);
    }
  }, [h]);

  const sponsorProps = {
    email: email ? email : "pay@anonymous.com",
    amount: 15000,
    currency: "GHS",

    metadata: {
      name: name,
      phone: phone,
      // fundsFor: `sponsor ${sponsorStudents} students for ${support} months`,
    },
    publicKey: "pk_test_7f5f564ffe1411cdb50e9d4a639d67b518a0b8f4",
    // publicKey: "pk_live_82f30444d1d687a9d2eb9fd27571263396ce9fdb",
    text: "Make Payment",
    onSuccess: (e) => {
      submitForm(e);
      toast.success(
        "Payment Successful. You would receive an email from Simeti Matches with information on how to proceed"
      );
    },
    onClose: (e) => {
      console.log("err", e);
      toast.error(
        "Payment cancelled. If there were any issues with payment, kindly contact us at support@simetimatches.com for assistance"
      );
    },
  };

  const submitForm = (e) => {
    let data = {
      name,
      email,
      phone,
      gender,
      dob,
      height,
      weight,
      // tribe,
      hometown,
      religion,
      maritalStatus,
      address,
      allergies,
      employmentStatus,
      occupation,
      jobStatus,
      workplace,
      hobbies,
      likes,
      dislikes,
      sports,
      drink,
      smoke,
      blood,
      sickling,
      disorders,
      ailments,
      description,
      flaws,
      children,
      childrenDesc,
      wantChildren,
      mateKind,
      inRelationShip,
      relationshipLast,
      mateBodyType,
      mateComplexion,
      mateAgeRange,
      mateIncome,
      mateDailyMeal,
      mateSex,
      mateCheatingIntolerance,
      mateSocialLife,
      sexuality,
      // married,
      // marriageLength,
      // marriageEnd,
      marrySingleParent,
      marryDivorced,
      loveLanguage,
      dealBreakers,
      country,
      region,
      incomeRange,
      wantChildrenDesc,
      oldRelationshipEndReason,
      fb,
      ig,
      tt,
      li,
      passport,
      fullPic,
      dealBreakers,
      payment: e,
    };
    // submit form to db
    console.log(data);
    postData("/user/details", data)
      .then((d) => {
        console.log(d);
        if (d.error) {
          toast.error(d.message);
        } else {
          toast(d.message);
          toast("You will be rediected shortly");
          setTimeout(() => {
            _h.push("/me/home");
          });
        }
      })
      .catch((e) => console.log(e));
  };

  const validate = (n) => {
    return true;
    console.log(n);
    switch (n) {
      case 0:
        return true;
      case 1:
        return true;
      case 2:
        if (
          name.length > 0 ||
          email.length > 0 ||
          phone.length > 0 ||
          gender.length > 0
        ) {
          return true;
        }
        break;

      case 3:
        if (
          dob.length > 0 ||
          weight.length > 0 ||
          height.length > 0 ||
          // tribe.length > 0 ||
          hometown.length > 0
        ) {
          if (new Date().getFullYear() - new Date(dob).getFullYear() < 18) {
            toast.error("Sorry, You must be at least 18 years old to continue");
            return false;
          }
          return true;
        }
        break;

      case 4:
        if (
          religion.length > 0 ||
          maritalStatus.length > 0 ||
          address.length > 0 ||
          allergies.length > 0
        ) {
          return true;
        }
        break;

      case 5:
        if (
          employmentStatus.length > 0 ||
          occupation.length > 0 ||
          jobStatus.length > 0 ||
          occupation.length > 0
        ) {
          return true;
        }
        break;

      case 6:
        return true;

      case 7:
        if (
          hobbies.length > 0 ||
          likes.length > 0 ||
          dislikes.length > 0 ||
          sports.length > 0
        ) {
          return true;
        }
        break;

      default:
        console.log(n);
        return false;
    }
  };

  const _setDealBreaker = (e) => {
    let _db = dealBreakers;
    console.log(dealBreakers);
    if (_db.includes(e)) {
      _db = _db.flatMap((i) => (i == e ? [] : [i]));
    } else {
      _db.push(e);
    }
    setDealBreakers(_db);
  };

  return (
    <div className="w-full h-screen bg-gray-200 flex justify-center align-center">
      <ToastContainer
        position="top-right"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className=" relative text-gray-900 bg-gray-100 container w-full md:w-96 overflow-hidden h-full md:h-5/6 my-auto">
        <div
          className={`p-4 py-8 h-full flex flex-col overflow-auto absolute md:w-96 w-full ${array[0]}`}
        >
          <div className="text-left">
            <Link to="/home" className="text-left">
              <span className="fa fa-home"></span>&nbsp;
              <span className="uppercase text-sm">Go Back Home</span>
            </Link>
            <h2 className="text-3xl font-bold my-2">Welcome!</h2>
          </div>

          <div className="flex-grow flex w-full content-center p-2">
            <div className="my-auto w-full">
              <ul className="text-sm text-ce nter pl-4 py-2 bg-gray-50 font-medium">
                <li className="my-1 text-lg font-bold">
                  Rules of Engagement go here
                </li>
                <li className="my-1">We Collect your info</li>
                <li className="my-1">You give us your spec</li>
                <li className="my-1">You make your payment</li>
                <li className="my-1">You submit your personality type</li>
                <li className="my-1 font-semibold text-3xl logo">
                  We do our magic
                </li>
                <li className="my-1">
                  We send you details for your potential mate
                </li>
                <li className="my-1">
                  You live happily ever after <br />
                  (If there's such a thing)
                </li>
                <li className="my-1 text-3xl logo font-bold">Easy!!!</li>
              </ul>
            </div>
          </div>

          <div>
            <button
              onClick={() => setActiveDiv(1)}
              className="w-full p-4 bg-blue-500 uppercase text-sm font-bold text-gray-100"
            >
              let's get started
            </button>
          </div>
        </div>

        <div
          className={`px-4 py-8 h-full flex flex-col overflow-auto absolute md:w-96 w-full ${array[1]}`}
        >
          <div>
            <div className="flex">
              <button onClick={() => setActiveDiv(0)} className="text-left">
                <span className="fa fa-chevron-left"></span>&nbsp;
                <span className="uppercase text-sm">Back</span>
              </button>
              <div className="flex-grow"></div>
              {/* <button onClick={() => setActiveDiv(0)} className="text-left">
                <span className="fa fa-save"></span>&nbsp;
                <span className="uppercase text-sm">Save</span>
              </button> */}
            </div>
            <h2 className="text-3xl font-bold mt-4">Hello! I am...</h2>
          </div>

          <div className="flex-grow flex w-full content-center p-2">
            <div className="my-auto w-full">
              <div className="mt-2">
                <label className="my-2 text-sm font-semibold">Name</label>
                <input
                  className="w-full bg-white mb-3 p-4"
                  placeholder="Mr Kwaku Frimpong"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="my-2 font-semibold">
                <p className="my-2 text-sm">Gender</p>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    onSelect={(e) => setGender("male")}
                    onClick={(e) => setGender("male")}
                  />{" "}
                  Male
                </label>
                &nbsp; &nbsp;
                <label>
                  <input
                    type="radio"
                    name="gender"
                    onSelect={(e) => setGender("female")}
                    onClick={(e) => setGender("female")}
                  />{" "}
                  Female
                </label>
              </div>
              <div className="mt-2">
                <label className="my-2 text-sm font-semibold">Email</label>
                <input
                  className="w-full bg-white mb-3 p-4"
                  placeholder="username@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-2">
                <label className="my-2 text-sm font-semibold">
                  Mobile Number
                </label>
                <input
                  className="w-full bg-white mb-3 p-4"
                  placeholder="(+233)0550 000 111"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={() => setActiveDiv(2)}
              className="w-full p-4 bg-blue-400 uppercase text-sm font-bold text-gray-100"
            >
              continue
            </button>
          </div>
        </div>

        <div
          className={`px-4 py-8 h-full flex flex-col overflow-auto absolute md:w-96 w-full ${array[2]}`}
        >
          <div className="text-left">
            <div className="flex">
              <button onClick={() => setActiveDiv(1)} className="text-left">
                <span className="fa fa-chevron-left"></span>&nbsp;
                <span className="uppercase text-sm">Back</span>
              </button>
              <div className="flex-grow"></div>
              {/* <button onClick={() => setActiveDiv(0)} className="text-left">
                <span className="fa fa-save"></span>&nbsp;
                <span className="uppercase text-sm">Save</span>
              </button> */}
            </div>
            <h2 className="text-3xl font-bold mt-4">More about you</h2>
          </div>

          <div className="flex-grow flex w-full content-center p-2">
            <div className="my-auto w-full">
              <div className="mt-2">
                <label className="my-2 text-sm font-semibold">
                  Date of Birth
                </label>
                <input
                  className="w-full bg-white mb-3 p-4"
                  type="date"
                  name={dob}
                  onChange={(e) => setDOB(e.target.value)}
                />
              </div>
              <div className="my-2 font-semibold">
                <div className="grid grid-cols-2">
                  <div className="m-1">
                    <label className="my-2 text-sm">Height(ft)</label>
                    <input
                      name="height"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full bg-white mb-3 p-4"
                    />
                  </div>
                  <div className="m-1">
                    <label className="my-2 text-sm">&amp; Weight(kg)</label>
                    <input
                      name="weight"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full bg-white mb-3 p-4"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <label className="my-2 text-sm font-semibold">Country</label>
                <input
                  className="w-full bg-white mb-3 p-4"
                  placeholder="Ghana"
                  name={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <div className="mt-2">
                <label className="my-2 text-sm font-semibold">Region</label>
                <input
                  className="w-full bg-white mb-3 p-4"
                  placeholder="Greater Accra"
                  name={region}
                  onChange={(e) => setRegion(e.target.value)}
                />
              </div>
              <div className="mt-2">
                <label className="my-2 text-sm font-semibold">Hometown</label>
                <input
                  className="w-full bg-white mb-3 p-4"
                  placeholder="Nogokpo"
                  name={hometown}
                  onChange={(e) => setHometown(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={() => setActiveDiv(3)}
              className="w-full p-4 bg-blue-400 uppercase text-sm font-bold text-gray-100"
            >
              continue
            </button>
          </div>
        </div>

        <div
          className={`px-4 py-8 h-full flex flex-col overflow-auto absolute md:w-96 w-full ${array[3]}`}
        >
          <div className="text-left">
            <div className="flex">
              <button onClick={() => setActiveDiv(2)} className="text-left">
                <span className="fa fa-chevron-left"></span>&nbsp;
                <span className="uppercase text-sm">Back</span>
              </button>
              <div className="flex-grow"></div>
              {/* <button onClick={() => setActiveDiv(0)} className="text-left">
                <span className="fa fa-save"></span>&nbsp;
                <span className="uppercase text-sm">Save</span>
              </button> */}
            </div>
            <h2 className="text-3xl font-bold mt-4">A bit more</h2>
          </div>

          <div className="flex-grow flex w-full content-center p-2">
            <div className="my-auto w-full">
              <div className="mt-2">
                <label className="my-2 text-sm font-semibold">Religion</label>
                <input
                  className="w-full bg-white mb-3 p-4"
                  placeholder="Buddhist"
                  name={religion}
                  onChange={(e) => setReligion(e.target.value)}
                />
              </div>
              <div className="my-2 font-semibold">
                <label className="my-2 text-sm">Marital Status</label>
                <select
                  className="w-full bg-white mb-3 p-4"
                  name={maritalStatus}
                  onChange={(e) => setMaritalStatus(e.target.value)}
                >
                  <option value="single">Single</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </select>
              </div>
              <div className="mt-2">
                <label className="my-2 text-sm font-semibold">
                  Home Address
                </label>
                <input
                  className="w-full bg-white mb-3 p-4"
                  placeholder="Somewhere Cool"
                  name={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="mt-2">
                <label className="my-2 text-sm font-semibold">
                  You have any allergies?
                </label>
                <textarea
                  className="w-full bg-white mb-2 p-3"
                  rows="3"
                  placeholder="List them here"
                  name={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={() => setActiveDiv(4)}
              className="w-full p-4 bg-blue-400 uppercase text-sm font-bold text-gray-100"
            >
              continue
            </button>
          </div>
        </div>

        <div
          className={`px-4 py-8 h-full flex flex-col overflow-auto absolute md:w-96 w-full ${array[4]}`}
        >
          <div className="text-left">
            <div className="flex">
              <button onClick={() => setActiveDiv(3)} className="text-left">
                <span className="fa fa-chevron-left"></span>&nbsp;
                <span className="uppercase text-sm">Back</span>
              </button>
              <div className="flex-grow"></div>
              {/* <button onClick={() => setActiveDiv(0)} className="text-left">
                <span className="fa fa-save"></span>&nbsp;
                <span className="uppercase text-sm">Save</span>
              </button> */}
            </div>
            <h2 className="text-3xl font-bold mt-4">Your Worklife</h2>
          </div>

          <div className="flex-grow flex w-full content-center p-2">
            <div className="my-auto w-full">
              <div className="mt-2">
                <label className="my-2 text-sm font-semibold">
                  Employment Status
                </label>
                <select
                  className="w-full bg-white mb-3 p-4"
                  name={employmentStatus}
                  onChange={(e) => setEmploymentStatus(e.target.value)}
                >
                  <option value="business owner">Business Owner</option>
                  <option value="employee">Employed</option>
                  <option value="unemployed">Unemployed</option>
                </select>
              </div>
              <div className="my-2 font-semibold">
                <label className="my-2 text-sm">Occupation</label>
                <input
                  className="w-full bg-white mb-3 p-4"
                  placeholder="Hawker"
                  name={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                />
              </div>
              <div className="mt-2">
                <label className="my-2 text-sm font-semibold">Job Title</label>
                <input
                  className="w-full bg-white mb-3 p-4"
                  placeholder="Manager"
                  name={jobStatus}
                  onChange={(e) => setJobStatus(e.target.value)}
                />
              </div>
              <div className="mt-2">
                <label className="my-2 text-sm font-semibold">Workplace</label>
                <input
                  className="w-full bg-white mb-3 p-4"
                  placeholder="Barclays Heights"
                  name={workplace}
                  onChange={(e) => setWorkplace(e.target.value)}
                />
              </div>
              <div className="mt-2">
                <label className="my-2 text-sm font-semibold">
                  Income Range (Annual)
                </label>
                <select
                  className="w-full bg-white mb-3 p-4"
                  name={incomeRange}
                  onChange={(e) => setIncomeRange(e.target.value)}
                >
                  <option value="below 10,000">Below 10,000</option>
                  <option value="10,000 to 20,000 ">10,000 to 20,000</option>
                  <option value="20,000 to 40,000">20,000 to 40,000</option>
                  <option value="40,000 to 60,000">40,000 to 60,000</option>
                  <option value="60,000 to 100,000">60,000 to 100,000</option>
                  <option value="100,000 to 150,000">100,000 to 150,000</option>
                  <option value="150,000 to 200,000">150,000 to 200,000</option>
                  <option value="200,000 to 300,000">200,000 to 300,000</option>
                  <option value="Above 300,000">Above 300,000</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={() => setActiveDiv(5)}
              className="w-full p-4 bg-blue-400 uppercase text-sm font-bold text-gray-100"
            >
              continue
            </button>
          </div>
        </div>

        <div
          className={`px-4 py-8 h-full flex flex-col overflow-auto absolute md:w-96 w-full ${array[5]}`}
        >
          <div className="text-left">
            <div className="flex">
              <button onClick={() => setActiveDiv(4)} className="text-left">
                <span className="fa fa-chevron-left"></span>&nbsp;
                <span className="uppercase text-sm">Back</span>
              </button>
              <div className="flex-grow"></div>
              {/* <button onClick={() => setActiveDiv(0)} className="text-left">
                <span className="fa fa-save"></span>&nbsp;
                <span className="uppercase text-sm">Save</span>
              </button> */}
            </div>
            <h2 className="text-2xl font-bold mt-4">Some Encouragement</h2>
          </div>

          <div className="flex-grow flex w-full content-center p-2">
            <div className="my-auto w-full bg-gray-50">
              <p className="font-bold text-2xl">You're doing a Great job.</p>
              <p>
                <span className="text-md mt-3">
                  We know it's quite extensive but it's for your good. All these
                  questions would go a long way to finding you a better match
                </span>
              </p>
            </div>
          </div>

          <div>
            <button
              onClick={() => setActiveDiv(6)}
              className="w-full p-4 bg-green-400 uppercase text-sm font-bold text-gray-100"
            >
              continue
            </button>
          </div>
        </div>

        <div
          className={`px-4 py-8 h-full flex flex-col overflow-auto absolute md:w-96 w-full ${array[6]}`}
        >
          <div className="text-left">
            <div className="flex">
              <button onClick={() => setActiveDiv(5)} className="text-left">
                <span className="fa fa-chevron-left"></span>&nbsp;
                <span className="uppercase text-sm">Back</span>
              </button>
              <div className="flex-grow"></div>
              {/* <button onClick={() => setActiveDiv(0)} className="text-left">
                <span className="fa fa-save"></span>&nbsp;
                <span className="uppercase text-sm">Save</span>
              </button> */}
            </div>
            <h2 className="text-3xl font-bold mt-4">Build Your Profile</h2>
          </div>

          <div className="flex-grow flex w-full content-center p-2">
            <div className="my-auto w-full">
              <div className="mt-2">
                <label className="my-2 text-sm font-semibold">Hobbies</label>
                <textarea
                  className="w-full bg-white mb-2 p-3"
                  rows="3"
                  placeholder="List all your hobbies; your interests here"
                  name={hobbies}
                  onChange={(e) => setHobbies(e.target.value)}
                ></textarea>
              </div>
              <div className="mt-2">
                <label className="my-2 text-sm font-semibold">Likes</label>
                <textarea
                  className="w-full bg-white mb-2 p-3"
                  rows="3"
                  placeholder="What are your likes in a partner"
                  name={likes}
                  onChange={(e) => setLikes(e.target.value)}
                ></textarea>
              </div>
              <div className="mt-2">
                <label className="my-2 text-sm font-semibold">Dislikes</label>
                <textarea
                  className="w-full bg-white mb-2 p-3"
                  rows="3"
                  placeholder="And your dislikes in a partner"
                  name={dislikes}
                  onChange={(e) => setDislikes(e.target.value)}
                ></textarea>
              </div>
              <div className="mt-2">
                <label className="my-2 text-sm font-semibold">
                  Like Sports
                </label>
                <textarea
                  className="w-full bg-white mb-2 p-3"
                  rows="3"
                  placeholder="if yes, Let them pour"
                  name={sports}
                  onChange={(e) => setSports(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={() => setActiveDiv(7)}
              className="w-full p-4 bg-blue-400 uppercase text-sm font-bold text-gray-100"
            >
              continue
            </button>
          </div>
        </div>

        <div
          className={`px-4 py-8 h-full flex flex-col overflow-auto absolute md:w-96 w-full ${array[7]}`}
        >
          <div className="text-left">
            <div className="flex">
              <button onClick={() => setActiveDiv(6)} className="text-left">
                <span className="fa fa-chevron-left"></span>&nbsp;
                <span className="uppercase text-sm">Back</span>
              </button>
              <div className="flex-grow"></div>
              {/* <button onClick={() => setActiveDiv(0)} className="text-left">
                <span className="fa fa-save"></span>&nbsp;
                <span className="uppercase text-sm">Save</span>
              </button> */}
            </div>
            <h2 className="text-3xl font-bold mt-4">More on Profile</h2>
          </div>

          <div className="flex-grow flex w-full content-center p-2">
            <div className="my-auto w-full">
              <div className="my-2">
                <label className="my-2 text-sm font-semibold">
                  Do you drink? &nbsp;
                </label>
                <label>
                  <input
                    type="radio"
                    name="drink"
                    value={drink}
                    onChange={(e) => setDrink("yes")}
                  />{" "}
                  Yes
                </label>{" "}
                &nbsp;
                <label>
                  <input
                    type="radio"
                    name="drink"
                    value={drink}
                    onChange={(e) => setDrink("no")}
                  />{" "}
                  No
                </label>
              </div>
              <br />
              <div className="my-2">
                <label className="my-2 text-sm font-semibold">
                  Do you smoke? &nbsp;
                </label>
                <label>
                  <input
                    type="radio"
                    name="smoke"
                    value={smoke}
                    onChange={(e) => setSmoke("yes")}
                  />{" "}
                  Yes
                </label>{" "}
                &nbsp;
                <label>
                  <input
                    type="radio"
                    name="smoke"
                    value={smoke}
                    onChange={(e) => setSmoke("no")}
                  />{" "}
                  No
                </label>
              </div>
              <br />
              <div className="my-2 font-semibold">
                <label className="my-2 text-sm">
                  Blood Type &amp; Sickling Status
                </label>
                <div className="grid grid-cols-2">
                  <div className="m-1">
                    <select
                      name={blood}
                      onChange={(e) => setBlood(e.target.value)}
                      className="w-full bg-white mb-3 p-4"
                    >
                      <option>Blood Type</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                  <div className="m-1">
                    <select
                      name={sickling}
                      onChange={(e) => setSickling(e.target.value)}
                      className="w-full bg-white mb-3 p-4"
                    >
                      <option>Sickling Status</option>
                      <option value="AA">AA</option>
                      <option value="AS">AS</option>
                      <option value="SS">SS</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-2">
                <label className="my-2 text-sm font-semibold">
                  Any Psycological Disorders ?
                </label>
                <textarea
                  className="w-full bg-white mb-2 p-3"
                  rows="3"
                  placeholder="Are you loco? Let us know what kinda cray-cray you are..."
                  name={disorders}
                  onChange={(e) => setDisorders(e.target.value)}
                ></textarea>
              </div>
              <div className="mt-2">
                <label className="my-2 text-sm font-semibold">
                  Any Chronic Ailment?
                </label>
                <textarea
                  className="w-full bg-white mb-2 p-3"
                  rows="3"
                  placeholder="If yes, list them here..."
                  name={ailments}
                  onChange={(e) => setAilments(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={() => setActiveDiv(8)}
              className="w-full p-4 bg-blue-400 uppercase text-sm font-bold text-gray-100"
            >
              continue
            </button>
          </div>
        </div>

        <div
          className={`px-4 py-8 h-full flex flex-col overflow-auto absolute md:w-96 w-full ${array[8]}`}
        >
          <div className="text-left">
            <div className="flex">
              <button onClick={() => setActiveDiv(7)} className="text-left">
                <span className="fa fa-chevron-left"></span>&nbsp;
                <span className="uppercase text-sm">Back</span>
              </button>
              <div className="flex-grow"></div>
              {/* <button onClick={() => setActiveDiv(0)} className="text-left">
                <span className="fa fa-save"></span>&nbsp;
                <span className="uppercase text-sm">Save</span>
              </button> */}
            </div>
            <h2 className="text-3xl font-bold mt-4">More About You</h2>
          </div>

          <div className="flex-grow flex w-full content-center p-2">
            <div className="my-auto w-full">
              <div className="mt-2">
                <label className="my-2 text-sm font-semibold">
                  Describe yourself
                </label>
                <textarea
                  className="w-full bg-white mb-2 p-3"
                  rows="3"
                  placeholder="Emphasizing attrbutes and qualities you may have"
                  name={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="mt-2">
                <label className="my-2 text-sm font-semibold">
                  What are your character flaws
                </label>
                <textarea
                  className="w-full bg-white mb-2 p-3"
                  rows="3"
                  placeholder="Do you have any? List 'em here"
                  name={flaws}
                  onChange={(e) => setFlaws(e.target.value)}
                ></textarea>
              </div>
              <div className="my-2">
                <label className="my-2 text-sm font-semibold">
                  Do you have children? &nbsp;
                </label>
                <label>
                  <input
                    type="radio"
                    name="children"
                    value={children}
                    onChange={(e) => setChildren("yes")}
                  />{" "}
                  Yes
                </label>{" "}
                &nbsp;
                <label>
                  <input
                    type="radio"
                    name="children"
                    value={children}
                    onChange={(e) => setChildren("no")}
                  />{" "}
                  No
                </label>
              </div>
              <div className="mt-2">
                <label className="my-2 text-md font-semibold">
                  If yes, list how many kids including their ages?
                </label>
                <textarea
                  className="w-full bg-white mb-2 p-3"
                  rows="3"
                  placeholder="Answer here including how many and their ages"
                  name={childrenDesc}
                  onChange={(e) => setChildrenDesc(e.target.value)}
                ></textarea>
              </div>
              <div className="my-2">
                <label className="my-2 text-sm font-semibold">
                  Do you want children? &nbsp;
                </label>
                <label>
                  <input
                    type="radio"
                    name="wantChildren"
                    value={wantChildren}
                    onChange={(e) => setWantChildren("yes")}
                  />{" "}
                  Yes
                </label>{" "}
                &nbsp;
                <label>
                  <input
                    type="radio"
                    name="wantChildren"
                    value={wantChildren}
                    onChange={(e) => setWantChildren("no")}
                  />{" "}
                  No
                </label>
              </div>
              <div className="mt-2">
                <label className="my-2 text-md font-semibold">
                  If yes, list how many kids you want?
                </label>
                <input
                  className="w-full bg-white mb-2 p-3"
                  type="number"
                  placeholder="Answer here including how many and their ages"
                  name={wantChildrenDesc}
                  min="1"
                  onChange={(e) => setWantChildrenDesc(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={() => setActiveDiv(9)}
              className="w-full p-4 bg-blue-400 uppercase text-sm font-bold text-gray-100"
            >
              continue
            </button>
          </div>
        </div>

        <div
          className={`px-4 py-8 h-full flex flex-col overflow-auto absolute md:w-96 w-full ${array[9]}`}
        >
          <div className="text-left">
            <div className="flex">
              <button onClick={() => setActiveDiv(8)} className="text-left">
                <span className="fa fa-chevron-left"></span>&nbsp;
                <span className="uppercase text-sm">Back</span>
              </button>
              <div className="flex-grow"></div>
              {/* <button onClick={() => setActiveDiv(0)} className="text-left">
                <span className="fa fa-save"></span>&nbsp;
                <span className="uppercase text-sm">Save</span>
              </button> */}
            </div>
            <h2 className="text-3xl font-bold mt-4">A li'l deeper</h2>
          </div>

          <div className="flex-grow flex w-full content-center p-2">
            <div className="my-auto w-full">
              <div className="mt-2">
                <label className="my-2 text-sm font-semibold">
                  What kind of partner are you looking for?
                </label>
                <select
                  name="mateKind"
                  value={mateKind}
                  onChange={(e) => setMateKind(e.target.value)}
                  className="text-center w-full bg-white p-4"
                >
                  <option value="Homemaker">Homemaker</option>
                  <option value="Professional">Professional</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="I'm indifferent">I'm indifferent</option>
                </select>
              </div>
              <div className="my-2">
                <label className="my-2 text-sm font-semibold">
                  Have you ever been in a relationship/marriage? &nbsp;
                </label>
                <label>
                  <input
                    type="radio"
                    name="inRelationShip"
                    value={inRelationShip}
                    onChange={(e) => setInRelationShip("yes")}
                  />{" "}
                  Yes
                </label>{" "}
                &nbsp;
                <label>
                  <input
                    type="radio"
                    name="inRelationShip"
                    value={inRelationShip}
                    onChange={(e) => setInRelationShip("no")}
                  />{" "}
                  No
                </label>
              </div>
              <div className="my-2">
                <label className="my-2 text-sm font-semibold">
                  How long did it last
                </label>
                <select
                  name="relationshipLast"
                  value={relationshipLast}
                  onChange={(e) => setRelationshipLast(e.target.value)}
                  className="text-center w-full bg-white p-4"
                >
                  <option value="Under 1 year">Under 1 year</option>
                  <option value="Between 1 and 2 year">
                    Between 1 and 2 year
                  </option>
                  <option value="Between 2 and 3 year">
                    Between 2 and 3 year
                  </option>
                  <option value="Over 3 year">Over 3 year</option>
                </select>
              </div>
              <div className="mt-2">
                <label className="my-2 text-md font-semibold">
                  Why did the relationship end?
                </label>
                <select
                  name="oldRelationshipEndReason"
                  value={oldRelationshipEndReason}
                  onChange={(e) => setOldRelationshipEndReason(e.target.value)}
                  className="text-center w-full bg-white p-4"
                >
                  <option value="Financial">Financial</option>
                  <option value="personality incompatibility">
                    personality incompatibility
                  </option>
                  <option value="infidelity">infidelity</option>
                  <option value="sexual incompatibility">
                    sexual incompatibility
                  </option>
                  <option value="cultural and family incompatibility">
                    cultural and family incompatibility
                  </option>
                  <option value=" health issues">health issues</option>
                </select>
              </div>
              <div className="my-2">
                <label className="my-2 text-sm font-semibold">
                  What is your body type preference for a partner
                </label>
                <select
                  name="mateBodyType"
                  value={mateBodyType}
                  onChange={(e) => setMateBodyType(e.target.value)}
                  className="text-center w-full bg-white p-4"
                >
                  <option value="Extra Slim">Extra Slim</option>
                  <option value="Slim">Slim</option>
                  <option value="Medium Build">Medium Build</option>
                  <option value="Chubby">Chubby</option>
                  <option value="Plus Size">Plus Size</option>
                  <option value="I'm kinda indifferent">
                    I'm kinda indifferent
                  </option>
                </select>
              </div>
              <div className="my-2">
                <label className="my-2 text-sm font-semibold">
                  What is your skin tone preference for a partner
                </label>
                <select
                  name="mateComplexion"
                  value={mateComplexion}
                  onChange={(e) => setMateComplexion(e.target.value)}
                  className="text-center w-full bg-white p-4"
                >
                  <option value="Dark">Dark</option>
                  <option value="Chocolate">Chocolate</option>
                  <option value="Fair">Fair</option>
                  <option value="I'm kinda indifferent">
                    I'm kinda indifferent
                  </option>
                </select>
              </div>
              <div className="my-2">
                <label className="my-2 text-sm font-semibold">
                  What is your age range preference for a partner
                </label>
                <select
                  name="mateAgeRange"
                  value={mateAgeRange}
                  onChange={(e) => setMateAgeRange(e.target.value)}
                  className="text-center w-full bg-white p-4"
                >
                  <option value="25-30">25-30</option>
                  <option value="31-35">31-35</option>
                  <option value="36-40">36-40</option>
                  <option value="41-45">41-45</option>
                  <option value="46-50">46-50</option>
                  <option value="51-55">51-55</option>
                  <option value="56-60">56-60</option>
                  <option value="61-65">61-65</option>
                  <option value="66-70">66-70</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={() => setActiveDiv(10)}
              className="w-full p-4 bg-blue-400 uppercase text-sm font-bold text-gray-100"
            >
              continue
            </button>
          </div>
        </div>

        <div
          className={`px-4 py-8 h-full flex flex-col overflow-auto absolute md:w-96 w-full ${array[10]}`}
        >
          <div className="text-left">
            <div className="flex">
              <button onClick={() => setActiveDiv(9)} className="text-left">
                <span className="fa fa-chevron-left"></span>&nbsp;
                <span className="uppercase text-sm">Back</span>
              </button>
              <div className="flex-grow"></div>
              {/* <button onClick={() => setActiveDiv(0)} className="text-left">
                <span className="fa fa-save"></span>&nbsp;
                <span className="uppercase text-sm">Save</span>
              </button> */}
            </div>
            <h2 className="text-3xl font-bold mt-4">
              On a scale from 1 to 10...
            </h2>
          </div>

          <div className="flex-grow flex w-full content-center p-2">
            <div className="my-auto w-full">
              <div className="mt-2">
                <label className="my-2 text-sm font-semibold">
                  How important is a steady income from your partner?
                </label>
                <input
                  className="w-full bg-white mb-3 p-4"
                  type="range"
                  value={mateIncome}
                  onChange={(e) => setMateIncome(e.target.value)}
                  min="1"
                  max="10"
                  step="1"
                />
              </div>
              <div className="my-2">
                <label className="my-2 text-sm font-semibold">
                  How important is a daily home-cooked meal?
                </label>
                <input
                  className="w-full bg-white mb-3 p-4"
                  type="range"
                  value={mateDailyMeal}
                  onChange={(e) => setMateDailyMeal(e.target.value)}
                  min="1"
                  max="10"
                  step="1"
                />
              </div>
              <div className="my-2">
                <label className="my-2 text-sm font-semibold">
                  How sexual are you?
                </label>
                <input
                  className="w-full bg-white mb-3 p-4"
                  type="range"
                  value={sexuality}
                  onChange={(e) => setSexuality(e.target.value)}
                  min="1"
                  max="10"
                  step="1"
                />
              </div>
              <div className="my-2">
                <label className="my-2 text-sm font-semibold">
                  How important is sex to you in the context of relationship/
                  marriage?
                </label>
                <input
                  className="w-full bg-white mb-3 p-4"
                  type="range"
                  value={mateSex}
                  onChange={(e) => setMateSex(e.target.value)}
                  min="1"
                  max="10"
                  step="1"
                />
              </div>
              <div className="my-2">
                <label className="my-2 text-sm font-semibold">
                  What is your level of intolerance to cheating?
                </label>
                <input
                  className="w-full bg-white mb-3 p-4"
                  type="range"
                  value={mateCheatingIntolerance}
                  onChange={(e) => setMateCheatingIntolerance(e.target.value)}
                  min="1"
                  max="10"
                  step="1"
                />
              </div>
              <div className="my-2">
                <label className="my-2 text-sm font-semibold">
                  How active do you want your social life to be with your
                  partner?
                </label>
                <input
                  className="w-full bg-white mb-3 p-4"
                  type="range"
                  value={mateSocialLife}
                  onChange={(e) => setMateSocialLife(e.target.value)}
                  min="1"
                  max="10"
                  step="1"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={() => setActiveDiv(11)}
              className="w-full p-4 bg-blue-400 uppercase text-sm font-bold text-gray-100"
            >
              continue
            </button>
          </div>
        </div>

        <div
          className={`px-4 py-8 h-full flex flex-col overflow-auto absolute md:w-96 w-full ${array[11]}`}
        >
          <div className="text-left">
            <div className="flex">
              <button onClick={() => setActiveDiv(10)} className="text-left">
                <span className="fa fa-chevron-left"></span>&nbsp;
                <span className="uppercase text-sm">Back</span>
              </button>
              <div className="flex-grow"></div>
              {/* <button onClick={() => setActiveDiv(0)} className="text-left">
                <span className="fa fa-save"></span>&nbsp;
                <span className="uppercase text-sm">Save</span>
              </button> */}
            </div>
            <h2 className="text-3xl font-bold mt-4">You're almost there...</h2>
          </div>

          <div className="flex-grow flex w-full content-center p-2">
            <div className="my-auto w-full">
              <div className="my-2">
                <label className="my-2 text-sm font-semibold">
                  Would you like to be matched with a single parent? &nbsp;
                </label>
                <label>
                  <input
                    type="radio"
                    name="marrySingleParent"
                    value={marrySingleParent}
                    onChange={(e) => setMarrySingleParent("yes")}
                  />{" "}
                  Yes
                </label>{" "}
                &nbsp;
                <label>
                  <input
                    type="radio"
                    name="marrySingleParent"
                    value={marrySingleParent}
                    onChange={(e) => setMarrySingleParent("no")}
                  />{" "}
                  No
                </label>
              </div>
              <div className="my-2">
                <label className="my-2 text-sm font-semibold">
                  How about being matched with a widowed/divorced person? &nbsp;
                </label>
                <label>
                  <input
                    type="radio"
                    name="marryDivorced"
                    value={marryDivorced}
                    onChange={(e) => setMarryDivorced("yes")}
                  />{" "}
                  Yes
                </label>{" "}
                &nbsp;
                <label>
                  <input
                    type="radio"
                    name="marryDivorced"
                    value={marryDivorced}
                    onChange={(e) => setMarryDivorced("no")}
                  />{" "}
                  No
                </label>
              </div>
              <div className="my-2">
                <label className="my-2 text-sm font-semibold">
                  What are your love languages?
                </label>
                <br />
                <select
                  className="w-full bg-white mb-3 p-4"
                  value={loveLanguage}
                  onChange={(e) => setLoveLanguage(e.target.value)}
                >
                  <option value="Physical Touch">Physical Touch</option>
                  <option value="Quality Time">Quality Time</option>
                  <option value="Gifts">Gifts</option>
                  <option value="Acts of Service">Acts of Service</option>
                  <option value="Words of Affirmation">
                    Words of Affirmation
                  </option>
                </select>
              </div>
              <div className="my-2">
                <label className="my-2 text-sm font-semibold">
                  Is there anything you would absolutely not tolerate in your
                  partner? (select as a many as apply)
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    name="dealBreakers"
                    value="Infidelity"
                    onChange={(e) => _setDealBreaker(e.target.value)}
                  />{" "}
                  Infidelity
                </label>{" "}
                <br />
                <label>
                  <input
                    type="checkbox"
                    name="dealBreakers"
                    value="Financial incompatibility"
                    onChange={(e) => _setDealBreaker(e.target.value)}
                  />{" "}
                  Financial incompatibility
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    name="dealBreakers"
                    value="Religious incompatibility "
                    onChange={(e) => _setDealBreaker(e.target.value)}
                  />{" "}
                  Religious incompatibility
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    name="dealBreakers"
                    value="Cultural incompatibility"
                    onChange={(e) => _setDealBreaker(e.target.value)}
                  />{" "}
                  Cultural incompatibility
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    name="dealBreakers"
                    value="Sexual incompatibility"
                    onChange={(e) => _setDealBreaker(e.target.value)}
                  />{" "}
                  Sexual incompatibility
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    name="dealBreakers"
                    value="Academic incompatibility"
                    onChange={(e) => _setDealBreaker(e.target.value)}
                  />{" "}
                  Academic incompatibility
                </label>
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={() => setActiveDiv(12)}
              className="w-full p-4 bg-blue-400 uppercase text-sm font-bold text-gray-100"
            >
              continue
            </button>
          </div>
        </div>

        <div
          className={`px-4 py-8 h-full flex flex-col overflow-auto absolute md:w-96 w-full ${array[12]}`}
        >
          <div className="text-left">
            <div className="flex">
              <button onClick={() => setActiveDiv(11)} className="text-left">
                <span className="fa fa-chevron-left"></span>&nbsp;
                <span className="uppercase text-sm">Back</span>
              </button>
              <div className="flex-grow"></div>
              {/* <button onClick={() => setActiveDiv(0)} className="text-left">
                <span className="fa fa-save"></span>&nbsp;
                <span className="uppercase text-sm">Save</span>
              </button> */}
            </div>
            <h2 className="text-3xl font-bold mt-4">Finally...</h2>
          </div>

          <div className="flex-grow flex w-full content-center p-2">
            <div className="my-auto w-full">
              <div className="my-2">
                <label className="my-2 text-sm font-semibold">
                  What are your dealbreakers in a mate?
                </label>
                <textarea
                  className="w-full bg-white mb-2 p-3"
                  rows="3"
                  placeholder="What attributes or qualities in a mate would you 100% not tolerate"
                  name={dealBreakers}
                  onChange={(e) => setDealBreakers(e.target.value)}
                ></textarea>
              </div>
              <div className="my-2">
                <label className="my-2 text-sm font-semibold">
                  Insert your social handle links below? &nbsp;
                </label>
                <input
                  className="w-full bg-white mb-1 p-2"
                  placeholder="Facebook"
                  name={fb}
                  onChange={(e) => setfb(e.target.value)}
                />
                <input
                  className="w-full bg-white mb-1 p-2"
                  placeholder="Instagram"
                  name={ig}
                  onChange={(e) => setig(e.target.value)}
                />
                <input
                  className="w-full bg-white mb-1 p-2"
                  placeholder="Twitter"
                  name={tt}
                  onChange={(e) => settt(e.target.value)}
                />
                <input
                  className="w-full bg-white mb-1 p-2"
                  placeholder="LinkedIn"
                  name={li}
                  onChange={(e) => setli(e.target.value)}
                />
              </div>
              <div className="my-2">
                <label className="my-2 text-sm font-semibold">
                  Hit the following buttons to upload your passport and full
                  sized pictures? &nbsp;
                </label>
                <br />
                <br />
                <label
                  htmlFor="passport"
                  className="cursor-pointer m-2 p-2 rounded bg-green-100 ring-2 ring-green-400 text-green-400 text-sm"
                >
                  <span className="fa fa-upload"></span> Passport Picture
                </label>
                <label
                  htmlFor="full-pic"
                  className="cursor-pointer m-2 p-2 rounded bg-blue-100 ring-2 ring-blue-400 text-blue-400 text-sm"
                >
                  <span className="fa fa-upload"></span> Full-size Picture
                </label>
                {/* <input
                  hidden
                  type="file"
                  id="passport"
                  name="passport"
                  onChange={(e) => setPassport(e.target.files[0])}
                  accept="images/*"
                />
                <input
                  hidden
                  id="full-pic"
                  name="full-pic"
                  type="file"
                  onChange={(e) => setFullPic(e.target.files[0])}
                  accept="images/*"
                /> */}
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={() => setActiveDiv(13)}
              className="w-full p-4 bg-blue-400 uppercase text-sm font-bold text-gray-100"
            >
              continue
            </button>
          </div>
        </div>

        {/* Final */}
        <div
          className={`p-4 py-8 h-full flex flex-col overflow-auto absolute md:w-96 w-full ${array[13]}`}
        >
          <div className="text-left">
            <button onClick={() => setActiveDiv(12)} className="text-left">
              <span className="fa fa-chevron-left"></span>&nbsp;
              <span className="uppercase text-sm">Back</span>
            </button>
            <h2 className="text-3xl font-bold my-2 text-ce nter">
              For your match...
            </h2>
          </div>

          <div className="flex-grow flex w-full content-center p-2">
            <div className="my-auto w-full">
              <div className="my-2">
                <h2 className="text-lg">
                  <span className="font-semibold text-xl">Finally right?</span>{" "}
                  Well not really
                  <br />
                  Rules of engagement
                  <br />
                  Code of conduct
                  <br />
                  Oath of truth and declaration
                  <br />
                  <span>...</span>
                </h2>
              </div>
            </div>
          </div>
          <div className="text-center text-xs font-bold text-gray-500">
            <p>By making payment, you agree with our terms and conditions</p>
          </div>
          <div>
            <PaystackButton
              {...sponsorProps}
              className="w-full p-4 bg-green-400 uppercase text-sm font-bold text-gray-100"
            />
          </div>
          {/* <div>
            <button
              onClick={() => setActiveDiv(7)}
              className="w-full p-4 bg-blue-400 uppercase text-sm font-bold text-gray-100"
            >
              Make Payment
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Form;
