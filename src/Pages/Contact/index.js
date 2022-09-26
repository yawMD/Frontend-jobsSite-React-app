import React from "react";
import { useState } from "react";
import Header from "../../Components/Header";
import { postData } from "../../Helpers/request";
import { toast, ToastContainer } from "react-toastify";
function Contact(props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [btn, setBtn] = useState({ text: "send message", sending: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    setBtn({ text: "sending your message", sending: true });
    postData("/user/send-message", {
      name,
      email,
      phone,
      message: encodeURI(message),
    })
      .then((d) => {
        console.log(d);
        toast.success("Message sent successfully");
      })
      .catch((d) => {
        console.error(d);
        toast.error("Message sending failed");
      })
      .finally(() => {
        setBtn({ text: "send message", sending: false });
      });
  };
  return (
    <div>
      <ToastContainer />
      <Header />
      <div className="min-h-screen flex flex-row content-center align-center justify-center bg-gradient-to-b from-blue-400 w-full to-blue-700">
        <div className="container shadow-5xl mt-20 md:m-auto bg-blue-50 grid grid-cols-1 md:grid-cols-2 ">
          <div
            style={{
              backgroundImage: `url(https://i.pinimg.com/originals/26/af/91/26af9155c0175ab72fcda5c05096d8ef.jpg)`,
              backgroundPosition: "top",
              backgroundSize: "cover",
            }}
            className="h-60 md:h-full"
          >
            <div className="bg-black bg-opacity-50 h-full w-full"></div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="p-2 md:px-8 md:py-10 text-center md:text-left"
          >
            <h3 className="text-xl mb-2 tracking-widest uppercase font-semibold text-blue-500">
              Need any questions answered?
            </h3>
            <h1 className="text-4xl md:text-8xl font-extrabold text-blue-600 mb-4">
              Contact Us
            </h1>
            <h3 className="text-xl tracking-wide capitalize font-semibold text-blue-500">
              Start a conversation using the bottom right chat button or
            </h3>
            <h3 className="text-center text-2xl mt-2 md:mt-4 tracking-wide capitalize font-bold text-blue-500">
              SEND US A MESSAGE
            </h3>
            <div className="tracking-wide my-6 text-gray-800 text-lg">
              <div>
                <div className="p-0 md:p-2 grid grid-cols-2 gap-1 md:gap-3">
                  <div className="col-span-2 md:col-span-1 p-2">
                    <input
                      className="w-full p-3 ring-2 duration-600 ease-in-out transition ring-gray-100 rounded hover:shadow-lg rounded"
                      value={name}
                      name="name"
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1 p-2">
                    <input
                      className="w-full p-3 ring-2 duration-600 ease-in-out transition ring-gray-100 rounded hover:shadow-lg rounded"
                      value={phone}
                      name="phone"
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      placeholder="Your Phone Number"
                    />
                  </div>
                  <div className="col-span-2 p-2">
                    <input
                      className="w-full p-3 ring-2 duration-600 ease-in-out transition ring-gray-100 rounded hover:shadow-lg  rounded"
                      value={email}
                      name="email"
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Your Email"
                    />
                  </div>
                  <div className="col-span-2 p-2">
                    <textarea
                      className="w-full p-3 ring-2 duration-600 ease-in-out transition ring-gray-100 rounded hover:shadow-lg  rounded"
                      value={message}
                      name="message"
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      placeholder="Your Message"
                      rows="4"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <button
                type="submit"
                className="px-3 md:px-8 py-4 uppercase tracking-widest text-blue-50 bg-blue-500 text-xl font-semi bold"
              >
                <span className="animate-pulse fa fa-paper-plane"></span> &nbsp;
                {btn.text}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="text-ce nter p-6 md:p-12 m-auto container">
        <div className="h-6 md:h-12"></div>
        <h1 className="font-extrabold tracking-wider text-3xl md:text-4xl my-6 text-gray-800">
          We are eager to hear from you through any of these media...
        </h1>
        <p className="my-1 text-2xl font-semibold">
          As long as you're able to take a step, you're closer to your partner
        </p>
        <p className="my-1 text-xl">Phone: (+233) 0240 123 345</p>
        <p className="my-1 text-xl">Instagram: simetimatches</p>
        <p className="my-1 text-xl">Twitter: simetimatches</p>
        <p className="my-1 text-xl">Facebook: simetimatches</p>
        <p className="my-1 text-xl">Youtube: simetimatches</p>

        <div className="h-12"></div>
      </div>
    </div>
  );
}

export default Contact;
