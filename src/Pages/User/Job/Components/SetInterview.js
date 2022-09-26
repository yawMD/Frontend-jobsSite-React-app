import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { postData } from "../../../../Helpers/request";

function SetInterview(props) {
  const [button, setButton] = useState({
    text: "Schedule Interview",
    sending: false,
  });
  const [interviewDate, setInterviewDate] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log({
    //   time: interviewDate,
    //   application: props.application,
    // });
    // return;
    if (interviewDate.length === 0) {
      toast.error("Add a date to schedule the interview");
    } else {
      setButton({
        text: "Setting Interview Date...",
        sending: true,
      });
      postData("/user/me/interview", {
        time: interviewDate,
        application: props.application,
      })
        .then((d) => {
          if (d.error) {
            toast.error(d.message);
          } else {
            toast.success(d.message);
            setTimeout(props.close(), 1000);
          }
          console.log(d);
        })
        .catch((e) => {
          console.log(e);
          toast.error(e.message);
        })
        .finally(() =>
          setButton({
            text: "Schedule Interview",
            sending: false,
          })
        );
    }
  };
  return (
    <div
      className={`${
        props.show
          ? "fixed top-0 left-0 h-screen w-full bg-black bg-opacity-70 flex flex-col justify-center align-center z-50"
          : "hidden"
      }`}
    >
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="m-auto container p-4 bg-white w-auto rounded"
      >
        <h2 className="text-sky-600 m-2 font-semibold text-2xl">
          Schedule Interview for
        </h2>
        <input
          className="w-full p-4 text-lg rounded ring-1 ring-zinc-200 mx-auto"
          type="datetime-local"
          value={interviewDate}
          onChange={(e) => setInterviewDate(e.target.value)}
        />
        <div className="text-right flex my-4">
          <button
            type="button"
            onClick={props.close}
            disabled={button.sending}
            className="p-3 rounded-lg text-lg font-semibold px-4 bg-red-500 hover:bg-red-600 mr-2 text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={button.sending}
            className="p-3 flex-grow rounded-lg text-lg font-semibold px-4 bg-blue-500 hover:bg-blue-600 text-white"
          >
            {button.text}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SetInterview;
