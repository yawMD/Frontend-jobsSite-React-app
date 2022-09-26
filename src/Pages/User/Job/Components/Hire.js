import { useState, useEffect } from "react";
import { isAuth } from "../../../../Helpers/auth";
import { postData } from "../../../../Helpers/request";

const Hire = (props) => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [employer, setEmployer] = useState("");
  const [employee, setEmployee] = useState("");
  const [job, setJob] = useState("");

  const [type, setType] = useState("");
  const [termination, setTermination] = useState("");
  const [terminationSet, setTerminationSet] = useState(true);
  const [commencementDate, setCommencementDate] = useState("");
  const [paymentFrequency, setPaymentFrequency] = useState("");
  const [email, setEmail] = useState('')
  const [extra, setExtra] = useState("");
  const [salary, setSalary] = useState('')
  const [btn, setBtn] = useState({
    text: "Employ Applicant",
    sending: false,
  });

  useEffect(() => {
    if (props.application) {
      let { application } = props;
      setTitle(application.title);
      setEmployer(application.employer);
      setName(application.name);
      setEmployee(application.employer);
      setJob(application.job);
      setEmail(application.email)
    } else {
    }

    return () => {
      setName("");
      setTitle("");
      setEmployer("");
      setEmployee("");
      setJob("");
    };
  }, [props]);

  const hireApplicant = (e) => {
    e.preventDefault();
    let data = {
      type,
      email,
      commencementDate,
      terminationDate: termination,
      terminationSet:!terminationSet,
      paymentFrequency,
      extra,
      employer,
      employee,
      salary,
      job,
    };
    console.log(data);
    postData("/user/hire", data);
    return;
  };
  return (
    <div className="bg-black bg-opacity-40 h-screen w-screen fixed top-0 left-0 flex flex-col justify-center z-50">
      <div className="h-auto max-h-5/6 overflow-auto self-center container rounded-lg w-full md:w-auto m-auto bg-white text-gray-600">
        <h2 className="font-semibold text-2xl my-4 px-4">
          Confirm the Employement of {name} for the <br />"{title}" job's Post
        </h2>
        <hr className="my-3" />
        <form onSubmit={hireApplicant} className="px-4">
          <div className="mt-2">
            <label className="my-2 text-sm font-semibold">
              Employement Type
            </label>
            <select
              className="w-full bg-white mb-3 p-4 rounded ring-1"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value={''}>--- Select Here ---</option>
              <option value="contract">Contractual Hire</option>
              <option value="salary">Salaried Hire</option>
            </select>
          </div>
          <div className="mt-2">
            <label className="my-2 text-sm font-semibold">
              Salary/Pay
            </label>
            <input
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              type="number"
              className="w-full bg-white mb-3 p-4 rounded ring-1"
            />
          </div>
          <div className="mt-2">
            <label className="my-2 text-sm font-semibold">
              Commencement Date
            </label>
            <input
              value={commencementDate}
              onChange={(e) => setCommencementDate(e.target.value)}
              className="w-full bg-white mb-3 p-4 rounded ring-1"
              type="date"
            />
          </div>
          <div className="mt-2">
            <label className="my-2 text-sm font-semibold">
              Employment Termination Date
            </label>
            {terminationSet === false && (
              <input
                className="w-full bg-white mb-3 p-4 rounded ring-1"
                value={termination}
                onChange={(e) => setTermination(e.target.value)}
                type="date"
              />
            )}
            <div>
              <label className="mb-2 text-sm font-semibold">
                <input
                  type={"checkbox"}
                  checked={terminationSet}
                  min={commencementDate}
                  onChange={() => setTerminationSet(!terminationSet)}
                />{" "}
                &nbsp; Not yet decided
              </label>
            </div>
          </div>
          <div className="mt-2">
            <label className="my-2 text-sm font-semibold">
              Payment Frequency
            </label>
            <select
              value={paymentFrequency}
              onChange={(e) => setPaymentFrequency(e.target.value)}
              className="w-full bg-white mb-3 p-4 rounded ring-1"
            >
              <option value={''}>--- Select Here ---</option>
              <option value="weekly">Weekly</option>
              <option value="biweekly">Bi-Weekly</option>
              <option value={"monthly"}>Monthly</option>
              <option value={"other"}>Other</option>
            </select>
          </div>
          <div className="mt-2">
            <label className="my-2 text-sm font-semibold">
              Extra Information in regards to employment
            </label>
            <textarea
              value={extra}
              onChange={(e) => setExtra(e.target.value)}
              className="w-full bg-white mb-3 p-4 rounded ring-1"
              rows="5"
            ></textarea>
          </div>
          <div className="my-4 text-right">
            <button
              type="button"
              onClick={props.close}
              className={`w-auto p-4 mr-2 bg-red-400 rounded-lg uppercase text-sm font-bold text-gray-100`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={btn.sending}
              className={`${
                btn.sending ? "disabled cursor-loading" : ""
              } w-auto p-4 bg-blue-400 rounded-lg uppercase text-sm font-bold text-gray-100`}
            >
              {btn.text}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Hire;
