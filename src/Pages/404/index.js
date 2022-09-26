import React from "react";
import { Link, useHistory } from "react-router-dom";

function _404(props) {
  const h = useHistory();
  return (
    <div className="h-screen w-full bg-gray-900 text-white flex justify-center content-center">
      <div className="m-auto">
        <h1 className="text-6xl font-bold">404: Page not Found</h1>
        <hr className="my-4" />
        <h1 className="my-4 text-3xl text-center">
          <button
            onClick={() => {
              h.goBack();
            }}
          >
            &larr; &nbsp; Click here to go back
          </button>
        </h1>
      </div>
    </div>
  );
}

export default _404;
