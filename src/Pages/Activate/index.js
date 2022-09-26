import React, { useEffect } from "react";
import { useState } from "react";
import Header from "../../Components/Header";
import { postData } from "../../Helpers/request";
import { toast, ToastContainer } from "react-toastify";
import { useHistory, useParams } from "react-router-dom";
import { isAuth } from "../../Helpers/auth";

export default function Activate(props) {
  const [email, setEmail] = useState("");
  const [btn, setBtn] = useState({ text: "Verify", sending: false });
  const h = useHistory();
  const { code } = useParams();
  useEffect(() => {
    if (isAuth()) {
      setEmail(isAuth().email);
    } else {
      h.push(`/login?r=err&v=2/&rdr=/activate/${code}`);
    }

    return () => {};
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      const tld = toast.loading("Verifying Mail... Please wait");
      setBtn({ text: "Verifying you...", sending: false });
      console.log({ email, code });
      postData("/user/activate", { email, code })
        .then((data) => {
          console.log(data);
          if (data.error) {
            toast.update(tld, {
              render: `Error: ${data.message}`,
              type: "error",
              isLoading: false,
            });
          } else {
            toast.update(tld, {
              render: `Verification Successful`,
              type: "success",
              isLoading: false,
            });
            setBtn({ text: "Verification Successful", sending: true });
            setTimeout(() => {
              h.push("/me/home");
            }, 1500);
          }
        })
        .catch((e) => {
          console.log("err", e);
          toast.update(tld, {
            render: `Error: Verify failed`,
            type: "error",
            isLoading: false,
          });
        })
        .finally((e) => {
          setBtn({ text: "Verify", sending: false });
          setTimeout(() => {
            toast.dismiss(tld);
          }, 5000);
        });
    }
  };

  return (
    <div className={`bg-zinc-100`}>
      <Header />
      <ToastContainer />
      <div className="h-full py-8 flex flex-col content-center align-center justify-center">
        <div className="container ring-1 ring-gray-100 shadow-5xl mt-20 md:m-auto bg-white shadow-lg rounded-lg w-full md:w-1/2">
          <form
            onSubmit={handleSubmit}
            className="p-2 md:px-8 md:py-10 text-center text-gray-800"
          >
            <h1 className="text-4xl font-bold my-4">Verify your Email</h1>
            <div className="tracking-wide my-6 text-lg">
              <div>
                <div className="p-0 md:p-2">
                  <div className="py-2 text-center">
                    <p className="w-full p-3 text-xl">
                      Verify email for "
                      <span className="font-semibold text-2xl">{email}</span>"
                      account
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              {isAuth() && isAuth().verified ? (
                <p className="w-full text-sm font-semibold italic text-green-500">
                  Account already verified
                </p>
              ) : (
                <button
                  type="submit"
                  className="px-3 md:px-5 py-3 rounded rounded-r-2xl tracking-wide text-white bg-blue-500 text-2xl font-semibold"
                >
                  {btn.text} &rarr;
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
