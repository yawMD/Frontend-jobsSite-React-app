import React from "react";
// import { Link } from "react-router-dom";
import logo from "../assets/image/logo_white.png";

function Footer(props) {
  return (
    <div className="bg-black p-4">
      <div className="container mx-auto pt-6 pb-4 grid grid-cols-1 md:grid-cols-4 gap-3 text-white">
        <div className="my-6">
          <h4 className="capitalize text-2xl my-5">Contact</h4>
          <ul>
            <li className="my-2">
              <p>
                {" "}
                <span className="fa fa-map-marker"></span> 388 Market Street,
                Suite 1300, San Francisco CA 94111
              </p>
            </li>
            <li className="my-2">
              <p>
                {" "}
                <span className="fa fa-phone"></span> +1-650-449-9546
              </p>
            </li>
            <li className="my-2">
              <p>
                {" "}
                <span className="fa fa-envelope"></span> contact@fillyjobs.com
              </p>
            </li>
            <li className="my-2">
              <p>
                {" "}
                <span className="fa fa-globe"></span> fillyjobs.com
              </p>
            </li>
          </ul>
        </div>
        <div className="my-6">
          <h4 className="capitalize text-2xl my-5">Services</h4>
          <ul>
            <li className="my-2">
              <p>Contact Us</p>
            </li>
            <li className="my-2">
              <p>Ordering & Payment</p>
            </li>
            <li className="my-2">
              <p>Shipping</p>
            </li>
            <li className="my-2">
              <p>Returns</p>
            </li>
            <li className="my-2">
              <p>FAQ</p>
            </li>
            <li className="my-2">
              <p>Sizing Guide</p>
            </li>
          </ul>
        </div>
        <div className="my-6">
          <h4 className="capitalize text-2xl my-5">Information</h4>
          <ul>
            <li className="my-2">
              <p>Work With US</p>
            </li>
            <li className="my-2">
              <p>Privacy Policy</p>
            </li>
            <li className="my-2">
              <p>Terms & Conditions</p>
            </li>
            <li className="my-2">
              <p>Press Enquiries</p>
            </li>
          </ul>
        </div>
        <div className="w-auto m-auto my-6">
          <h4 className="capitalize text-2xl my-5">Socials</h4>
          <div className="grid grid-cols-4 text-3xl">
            <div className="my-2">
              <a
                target="_blank"
                rel="noreferrer"
                href="https://twitter.com/fillycoder"
              >
                <span className="fa fa-twitter"></span>
              </a>
            </div>
            <div className="my-2">
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.facebook.com/Filly-Jobs-109166494793281/"
              >
                <span className="fa fa-facebook"></span>
              </a>
            </div>
            <div className="my-2">
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.instagram.com/fillycoder/"
              >
                <span className="fa fa-instagram"></span>
              </a>
            </div>
            <div className="my-2">
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.linkedin.com/company/fillycoder/"
              >
                <span className="fa fa-linkedin"></span>
              </a>
            </div>
          </div>
          <div className="md:flex flex-col m-auto">
            <div className="flex-grow m-auto text-gray-400 transition duration-300 ease-in-out">
              <div className="text-center py-6">
                <span className="mx-1 md:mx-3 text-center font-light hover:text-blue-300">
                  Send your enquiries to{" "}
                  <span className="text-blue-300">info@fillyjobs.com</span>
                </span>
              </div>
            </div>
            <div>
            <img src={logo} alt="logo" className="h-40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
