import jwt from "jsonwebtoken";
import firebase from "../firebase";
import { getCookie, isAuth } from "./auth";

const _host = "https://fillyapi.herokuapp.com";
const host = "http://localhost:1112";

export const postData = async (url = "", data = {}, options = {}) => {
  // Default options are marked with *
  url =
    window.location.host.indexOf("localhost") >= 0 ? host + url : _host + url;
  var headers = {};
  let secret = "KWanso for F1llyJ0b2 the app good.";
  data = jwt.sign(data, secret, { expiresIn: 1000 * 10 });
  if (isAuth()) {
    // let code = parseInt(new Date().valueOf() / 10000);
    // console.log(code);
    headers = {
      // "Content-Type": "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + getCookie("token"),
    };
  } else {
    headers = {
      // "Content-Type": "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*",
    };
  }
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: headers,
    // redirect: "follow", // manual, *follow, error
    // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: "token=" + JSON.stringify(data), // body data type must match "Content-Type" header
  });
  // console.log(JSON.stringify(data));
  // console.log(response.json());
  return response.json(); // parses JSON response into native JavaScript objects
};

export const getData = async (url = "", data = {}, options = {}) => {
  // Default options are marked with *
  // remote https://Kwansoapi.herokuapp.com/
  url =
    window.location.host.indexOf("localhost") >= 0 ? host + url : _host + url;
  // url = host + url;
  // let _d._data
  // let secret = "KWanso for F1llyJ0b2 the app good." + parseInt(new Date().valueOf() / 10000);
  // data = jwt.sign(data, secret, { expiresIn: 1000 * 60 * 60 });
  // console.log(url)
  // console.log(data);
  // setInterval(() => console.log( new Date().valueOf()/1000000, new Date()), 1000)
  var headers = {};
  if (isAuth()) {
    headers = {
      // "Content-Type": "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + getCookie("token"),
    };
  } else {
    headers = {
      // "Content-Type": "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*",
    };
  }
  const response = await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: headers,
    // redirect: "follow", // manual, *follow, error
    // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    // body: "token=" + JSON.stringify(data), // body data type must match "Content-Type" header
  });
  // console.log(response.json());
  return response.json(); // parses JSON response into native JavaScript objects
};

firebase.storage().ref().constructor.prototype.putFiles = function (files) {
  var ref = this;
  return Promise.all(
    files.map(function (file) {
      return ref.child(file.name).put(file);
    })
  );
};

export const uploadToFirebaseStorage = (path, file) => {
  return new Promise(function (resolve, reject) {
    if (file.type === "application/octet-stream")
      reject("unsupported file type");
    var storageRef = firebase.storage().ref(path + file.name);
    var task = storageRef.put(file);

    //Update progress bar
    task.on(
      "state_changed",
      function progress(snapshot) {
        // var percentage =
        //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      function error(err) {
        console.log(err);
        reject(err);
      },
      function complete() {
        task.snapshot.ref
          .getDownloadURL()
          .then((downloadURL) => resolve(downloadURL));
      }
    );
  });
};
