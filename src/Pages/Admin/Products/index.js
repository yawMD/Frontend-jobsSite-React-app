import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { signout } from "../../../Helpers/auth";
import { ToastContainer, toast } from "react-toastify";
import { getData, postData } from "../../../Helpers/request";

function Products(props) {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState();

  useEffect(() => {
    getProducts();
  }, [count]);

  const getProducts = () => {
    getData("/manager/product")
      .then((data) => {
        // console.log(data);
        if (data.error) {
          if (data.message === "Access Denied") {
            if (
              window.confirm(
                "Fetching data failed. Login again to verify your credentials"
              )
            ) {
              signout();
            }
          } else {
            alert(data.message);
          }
        } else {
          setProducts(data.products);
          console.log(data.products);
          setCount(data.products.length);
        }
      })
      .catch((err) => console.log("err", err));
  };

  const productAction = (msg, id, data) => {
    if (window.confirm(msg)) {
      toast.info("Updating Product...");
      postData(`/admin/product/${id}`, data)
        .then((e) => {
          console.log(e);
          getProducts();
        })
        .catch((e) => console.error(e));
    }
  };

  return (
    <div className="h-screen overflow-auto bg-gray-50 w-full">
      <ToastContainer />
      <div className="container mx-au to w-11/12 pt-10 px-5 h-full">
        <div className="container mx-auto pt-10 mt-8 px-8">
          <h1 className="float-left font-semibold text-2xl">Products</h1>
          {/* <Link
            to="/product/add"
            className="float-right shadow rounded-2xl text-xs uppercase px-3 py-2 text-blue-500 border-2 border-blue-500 font-semibold transition ease-in-out duration-200 hover:bg-blue-500 hover:text-white"
          >
            <i className="fa fa-plus"></i> Add Product
          </Link> */}
          <div className="clear-both"></div>
        </div>
        <div className="container mx-auto pt-10 mt-8 px-8">
          <input
            className="w-full rounded shadow-md hover:shadow-lg p-4 ring-1 ring-gray-100 hover:ring-gray-200"
            placeholder="Search Product..."
          />
        </div>
        <div className="container mx-auto mt-4 px-8">
          <table className="table min-w-96 rounded-lg shadow">
            <thead className="text-sm uppercase p-4 font-thin bg-blue-50 text-gray-400">
              <tr className="">
                <th className="p-3 font-medium text-left w-2/5">Product</th>
                {/* <th className="p-3 font-medium w-1/5">Description</th> */}
                <th className="p-3 font-medium w-1/5 text-right">Price</th>
                <th className="p-3 font-medium w-1/5 text-right">Options</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, i) => {
                var _x = 0;
                var _y = 0;
                product.priceRanges.flatMap((v, i) => {
                  if (i == 0) {
                    _x = v.price;
                    _y = v.price;
                  } else {
                    if (v.price < _x) {
                      _x = v.price;
                    }
                    if (v.price > _y) {
                      _y = v.price;
                    }
                  }
                });
                return (
                  <tr
                    key={product._id}
                    className="text-center bg-white border-b-2 border-gray-100 rounded-lg hover:bg-gray-50"
                  >
                    <td className="px-3 py-3 text-left relative">
                      <div className="flex flex-cols">
                        <h1 className="my-auto mr-2">{1 + i}.</h1>
                        <div className="flex flex-row flex-wrap content-center">
                          <div
                            className="h-20 w-20 rounded-full bg-blue-200"
                            style={{
                              backgroundImage: `url(${product.image})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              backgroundRepeat: "no-repeat",
                            }}
                          ></div>
                          <div className="my-auto text-gray-700 font-semibold px-2">
                            <span className="text-lg text-gray-800">
                              {product.title}
                            </span>
                            <br />
                            <span className="text-sm font-bold text-gray-500">
                              {product.category}
                            </span>
                            <br />
                            {product.enabled ? (
                              <span className="text-sm font-semibold bg-green-300 p-1 rounded text-gray-100">
                                Enabled
                              </span>
                            ) : (
                              <span className="text-sm font-semibold bg-red-300 p-1 rounded text-gray-100">
                                Disabled
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    {/* <td className="">{product.description}</td> */}
                    <td className=" px-3 py-6 text-green-600 text-right">
                      GHS {parseInt(_x).toFixed(2)} - {parseInt(_y).toFixed(2)}
                    </td>
                    <td className="px-3 py-6 text-right">
                      {!product.enabled ? (
                        <button
                          onClick={() =>
                            productAction(
                              "Confirm product's Enablement",
                              product._id,
                              { enabled: true }
                            )
                          }
                          className="bg-green-400 text-white mr-2 p-2 rounded font-semibold hover:bg-green-500 border-2 border-green-500"
                        >
                          {" "}
                          Enable
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            productAction(
                              "You are about to block this product",
                              product._id,
                              { enabled: false }
                            )
                          }
                          className="bg-red-400 text-white mr-2 p-2 rounded font-semibold hover:bg-red-500 border-2 border-red-500"
                        >
                          {" "}
                          Block
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="h-20"></div>
      </div>
    </div>
  );
}

export default Products;
