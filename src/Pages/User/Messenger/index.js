import React, { useEffect, useRef, useState } from "react";
import Cryptr from "cryptr";
import { toast, ToastContainer } from "react-toastify";
import { isAuth } from "../../../Helpers/auth";
import { getData, postData } from "../../../Helpers/request";
import { useParams } from "react-router-dom";

function Messenger(props) {
  const { code } = useParams();
  const cryptr = new Cryptr("e7b75a472b65bc4a42e7b3f78833a4d00040beba79");
  const scrollRef = useRef();
  const [clicked, setClicked] = useState(1);
  const [users, setUsers] = useState([]);
  const [active, setActive] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(null);
  const [user, setUser] = useState("");
  const [loadMessage, setLoadMessage] = useState(true);
  const [search, setSearch] = useState("");
  const [possibleMatches, setPossibleMatches] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const getChatUsers = () => {
    setLoading(true);
    getData("/user/contacts")
      .then((d) => {
        if (!d.error) {
          setUsers(d.profiles);
          if (code) {
            let phone = cryptr.decrypt(code);
            let _u = d.profiles.flatMap((u) => (u.phone === phone ? [u] : []));
            if (_u.length > 0) {
              setActive(_u[0]);
            }
          } else {
            //fetch user from db
          }
        } else {
          toast.error(d.message);
        }
      })
      .catch((e) => {
        toast.error(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    postData("/message/send", {
      from: isAuth()._id,
      message,
      to: active.id,
    })
      .then((d) => {
        if (d.error) {
          toast.error(d.message);
          console.log(d);
        } else {
          // console.log(active.id);
          props.socket.current.emit("send-msg", {
            sender: isAuth()._id,
            message,
            _id: Date.now() + Math.random() * 99999,
            updatedAt: Date.now(),
            to: active.id,
            name: isAuth().name,
          });
          setMessages([
            ...messages,
            {
              sender: isAuth()._id,
              message,
              _id: Date.now() + Math.random() * 99999,
              updatedAt: Date.now(),
              to: active.id,
            },
          ]);
          setMessage("");
        }
      })
      .catch((d) => {
        toast.error(d.message);
        console.log(d);
      });
  };

  const searchPeople = (e) => {
    e.preventDefault();
    getData(`/user/me/addressfind/${search}`)
      .then((d) => {
        if (!d.error) {
          setPossibleMatches(d.contacts);
          setShow(true);
        } else {
          toast.error(d.message);
        }
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  const addToContacts = e => {
    console.log(e)
  }

  useEffect(() => {
    getChatUsers();
  }, []);

  useEffect(() => {
    if (code) {
    }
  }, [code]);

  useEffect(() => {
    newMessage && setMessages([...messages, newMessage]);
  }, [newMessage]);

  useEffect(() => {
    props.newMessage &&
      active &&
      props.newMessage.sender === active.id &&
      setMessages([...messages, props.newMessage]);
  }, [props.newMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  const handleSelect = (n) => {
    setClicked(n);
    //change view here
  };

  const handleActive = (u) => {
    setActive(u);
    setMessages([]);
    postData("/message/get", { user: u.id })
      .then((d) => {
        if (d.error) {
        } else {
          setMessages(d.messages);
        }
        // console.log(d);
      })
      .catch((d) => console.log(d));
  };

  return (
    <div className="h-screen w-full overflow-auto grid grid-cols-12">
      <div
        className={`${
          !active ? "flex" : "hidden md:flex"
        } h-screen ring-3 flex-col ring-gray-200 shadow-lg col-span-12 md:col-span-4`}
      >
        <form
          onSubmit={searchPeople}
          className="w-full border-t-2 bg-white p-4 flex"
        >
          {/* <div className="my-auto"> */}
          <input
            className="flex-grow border-b-2 ml-2 border-blue-100 ring-0 placeholder-blue-300 italic text-xl p-2"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={searchPeople}
            className="my-auto text-blue-400 mx-1 text-2xl"
          >
            <span className=" fa fa-search"></span>
          </button>
          {/* </div> */}
        </form>
        <div className="w-full border-t-2 border-blue-100 h-5/6 bg-cyan-50 flex flex-col border-b-2 border-blue-100">
          <div className="w-full overflow-y-auto divide-y divide-blue-100">
            {!loading &&
              !show &&
              users &&
              users.map(
                (u) =>
                  u.id !== isAuth()._id && (
                    <div
                      key={u.id}
                      onClick={() => handleActive(u)}
                      className="flex p-3 cursor-pointer hover:bg-blue-100 hover:shadow focus:bg-blue-100 focus:shadow "
                    >
                      <div className="">
                        <div
                          className="h-16 w-16 rounded-full bg-black"
                          style={{
                            backgroundImage: `url(${u.pic})`,
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                          }}
                        ></div>
                      </div>
                      <div className="p-2 pl-4">
                        <h3 className="font-bold text-blue-400 text-lg">
                          {u.name}
                        </h3>
                        <p>{u.email}</p>
                      </div>
                    </div>
                  )
              )}
            {loading && (
              <div>
                <div className=" p-3 cursor-pointer hover:bg-blue-100 hover:shadow focus:bg-blue-100 focus:shadow text-blue-600 text-center">
                  <div className="p-1 italic font-semibold animate-pulse">
                    Please wait, Loading...
                  </div>
                </div>
              </div>
            )}
            {show && !loading && (
              <div
                onClick={() => {
                  setShow(false);
                  setPossibleMatches([]);
                }}
              >
                <div className=" p-3 cursor-pointer hover:bg-blue-100 hover:shadow focus:bg-blue-100 focus:shadow text-blue-400 text-center">
                  <div className="p-1 italic">
                    <span className="text-sm text-red-400 fa fa-close"></span>{" "}
                    Cancel Search
                  </div>
                </div>
              </div>
            )}
            {show &&
              possibleMatches &&
              possibleMatches.map(
                (u) =>
                  u.id !== isAuth()._id && (
                    <div
                      key={u.id}
                      onClick={() => handleActive(u)}
                      className="flex p-3 cursor-pointer bg-slate-50 hover:bg-blue-50 hover:shadow focus:shadow"
                    >
                      <div className="">
                        <div
                          className="h-16 w-16 rounded-full bg-black"
                          style={{
                            backgroundImage: `url(${u.pic})`,
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                          }}
                        ></div>
                      </div>
                      <div className="p-2 pl-4 flex-grow">
                        <h3 className="font-bold text-blue-400 text-lg">
                          {u.name}
                        </h3>
                        <p>{u.email}</p>
                      </div>
                      <button onClick={()=>addToContacts(u.id)} className="my-auto">
                        <span className="fa fa-plus"></span>
                      </button>
                    </div>
                  )
              )}
          </div>
        </div>
        <div className="w-full flex-grow bg-white grid text-3xl text-gray-400 grid-cols-3">
          <button
            onClick={() => {
              handleSelect(1);
            }}
            className={`my-auto focus:ring-0 ${
              clicked === 1 ? "text-blue-400" : ""
            }`}
          >
            <span className="fa fa-inbox"></span>
          </button>
          <button
            onClick={() => {
              handleSelect(2);
            }}
            className={`my-auto focus:ring-0 ${
              clicked === 2 ? "text-blue-400" : ""
            }`}
          >
            <span className="fa fa-address-book"></span>
          </button>
          <button
            onClick={() => {
              handleSelect(3);
            }}
            className={`my-auto focus:ring-0 ${
              clicked === 3 ? "text-blue-400" : ""
            }`}
          >
            <span className="fa fa-cog"></span>
          </button>
        </div>
      </div>
      {active && (
        <div className="h-screen ring-3 flex flex-col p-0 m-0 bg-gray-100 ring-gray-200 col-span-12 md:col-span-8">
          <div className="h-full flex flex-col">
            <div className="h-auto md:h-20 w-full bg-slate-50 md:p-4 flex flex-col md:flex-row justify-center align-center">
              <div className="w-full flex p-2 md:p-0">
                <div
                  className="h-16 my-auto rounded-full w-16 bg-black mr-2"
                  style={{ backgroundImage: `url(${active.pic})`, backgroundPosition: `center`, backgroundSize: `cover`}}
                />
                <div className="my-auto flex-grow">
                  <h6>{active.name}</h6>
                  <p>{active.email}</p>
                </div>
                <div className="hidden md:block my-auto text-sky-700">
                  <button
                    className="mx-2"
                    onClick={() => {
                      props.callOther(active.id);
                    }}
                  >
                    <i className="fa-solid fa-video text-2xl"></i>
                  </button>
                </div>
              </div>
              <div className="border-t-2 flex p-2 md:hidden divider-y divider-gray-400">
                <div className="my-auto text-red-500 flex-grow">
                  <button className="mx-2" onClick={() => setActive(null)}>
                    <i className="fa-solid fa-close text-2xl"></i>
                  </button>
                </div>
                <div className="my-auto text-sky-700">
                  <button
                    className="mx-2"
                    onClick={() => {
                      props.callOther(active.id);
                    }}
                  >
                    <i className="fa-solid fa-video text-2xl"></i>
                  </button>
                </div>
              </div>
            </div>
            <div
              className="w-full border-t-2 border-blue-100 border-l-2 bg-slate-900 border-blue-100 h-5/6 flex flex-col"
              style={
                {
                  // backgroundPosition: "center",
                  // backgroundSize: "contain",
                  // backgroundImage: `url()`,
                }
              }
            >
              <div className="w-full overflow-y-auto h-full overflow-auto flex flex-col p-3">
                {messages.map((_message) => (
                  <div className="w-full" key={_message._id}>
                    {_message.sender === active.id && (
                      <div className="p-2 w-full text-left">
                        <span className="bg-zinc-700 p-1 text-white px-3 rounded-r-full rounded-b-full ring-2 ring-cyan-700 shadow-lg shadow-gray-800">
                          {_message.message}
                        </span>
                        <br className="mb-2" />
                        <span className="text-gray-400 italic text-xs pt-2">
                          {new Date(_message.updatedAt).toUTCString()}
                        </span>
                      </div>
                    )}
                    {_message.sender !== active.id && (
                      <div className="p-2 w-full text-right">
                        <span className="bg-zinc-700 p-1 text-white px-3 rounded-l-full rounded-b-full ring-2 ring-cyan-700 shadow-lg shadow-gray-800">
                          {_message.message}
                        </span>
                        <br className="mb-2" />
                        <span className="text-gray-400 italic text-xs pt-2">
                          {new Date(_message.updatedAt).toUTCString()}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
                <div ref={scrollRef} />
              </div>
            </div>
            <form
              onSubmit={sendMessage}
              className="w-full px-5 h-fill border-l-2 border-blue-100 bg-white text-3xl text-gray-400 flex flex-row p-2"
            >
              {/* <button className={`my-auto focus:ring-0 `}>
                <span className="fa fa-paperclip"></span>
              </button> */}
              <input
                className="flex-grow mx-2 border-b-2 border-gray-100 placeholder-gray-300 text-lg p-2 ring-1 ring-gray-100 rounded "
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your Message here..."
              />
              <button
                type="submit"
                disabled={message.length === 0}
                className={` ${
                  message.length === 0
                    ? "cursor-not-allowed text-gray-300"
                    : "text-sky-500"
                } transition duration-500 rounded-full my-auto focus:ring-0 `}
              >
                <span className="fa fa-paper-plane"></span>
              </button>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default Messenger;
