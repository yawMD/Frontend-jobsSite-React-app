import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { signout } from "../../../Helpers/auth";
import { getData, postData } from "../../../Helpers/request";
import { ToastContainer, toast } from 'react-toastify';

function AdminOrders(props) {
  const [orders, setOrders] = useState([]);
  const [count, setCount] = useState(0);
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState("");

  useEffect(() => {
    console.log(selectedAgent);
  }, [selectedAgent]);

  useEffect(() => {
    getAgents();
    getOrders();
  }, [count]);

  const getOrders = () => {
    toast.info('Fetching Orders. Please Wait...')
    getData("/admin/orders")
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
            toast.error(data.message);
          }
        } else {
          setOrders(data.orders);
          setCount(data.orders.length);
        }
      })
      .catch((err) => console.log("err", err));
  };

  const updateOrder = (id, data) => {
    toast.info('Updating Order...')
      postData(`/admin/order/${id}`, data)
      .then(e => {console.log(e)
        toast.success('Order Updated Successfully')
      })
      .catch(e => console.error('err', e))
  }

  const getAgents = () => {
    getData("/admin/agents")
      .then((data) => {
        console.log(data);
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
          setAgents(data.agents);
          //   setCount(data.orders.length)
        }
      })
      .catch((err) => console.log("err", err));
  };
  return (
    <div className="h-screen bg-gray-50 w-full overflow-auto">
      <ToastContainer />
      <div className="container mx-au to w-full pt-10 px-5 h-full">
        <div className="container mx-auto pt-10 mt-8 px-8">
          <h1 className="font-semibold text-2xl">Orders</h1>
          <button onClick={() => setCount(count + 1)}>Refresh</button>
          {/* <div className="clear-both"></div> */}
        </div>
        <div className="container mx-auto pt-10 mt-8 px-8">
          <input
            className="w-full rounded shadow-md hover:shadow-lg p-4 ring-1 ring-gray-100 hover:ring-gray-200"
            placeholder="Search Order..."
          />
        </div>
        <div className="container mx-auto my-4 px-8">
          <table className="table-fixed  min-w-96 rounded-lg shadow">
            <thead className="text-sm uppercase p-4 font-thin bg-blue-50 text-gray-400">
              <tr className="">
                <th className="p-3 font-medium text-left w-1/6">Order ID</th>
                <th className="p-3 font-medium w-1/6">Customer</th>
                <th className="p-3 font-medium text-right w-1/6">Qty & Cst</th>
                <th className="p-3 font-medium text-right w-1/6">Status</th>
                <th className="p-3 font-medium text-right w-2/6">
                  Update Status
                </th>
              </tr>
            </thead>
            <tbody clas>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="text-center bg-white border-b-2 border-gray-100 rounded-lg hover:bg-gray-50"
                >
                  <td className="px-3 py-3 text-left capitalize relative">
                    <div className="flex flex-row flex-wrap">
                      <div
                        className="h-20 w-20 rounded-full bg-blue-200"
                        style={{
                          backgroundImage: `url(${order.productId.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }}
                      ></div>
                      <div className="my-auto text-gray-700 font-semibold px-2">
                        <span className="text-lg text-gray-800">
                          {order.productId.title}
                        </span>
                        <br />
                        <span className="text-sm font-bold text-gray-500">
                          {order.productId.category}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="">{order.orderBy.name}<br/>{order.orderBy.email}</td>
                  <td className=" px-3 py-6 text-green-600 text-right">
                    {order.orderQuantity} units, GHS{" "}
                    {parseInt(order.orderTotal).toFixed(2)}
                  </td>
                  <td className="capitalize"><div className="px-2 m-1 inline-block w-auto rounded bg-yellow-600 text-white">{order.orderStatus}</div><div className="px-2 inline-block m-1 w-auto rounded bg-green-600 text-white">{order.isPaid ? 'Paid' : 'Not Paid'}</div></td>
                  <td className="px-3 text-white py-6 text-right">
                    <div className="pt-1 mt-1">
                      <button onClick={e => updateOrder(order._id, {status: 'cancelled'})} className="p-1 rounded bg-red-500">Cancel</button>
                        </div>
                        <div className="pt-1 mt-1">
                        <button onClick={e => updateOrder(order._id, {status: 'out_of_stock'})} className="p-1 rounded bg-yellow-500">Out of Stock</button>
                        </div>
                        <div className="pt-1 mt-1">
                        <button onClick={e => updateOrder(order._id, {status: 'completed'})} className="p-1 rounded bg-green-500">Complete</button>
                        </div>
                    <div className="pt-1 mt-1">
                      <select
                        name="agent"
                        className="p-2 text-black border-2 bg-gray-100 rounded"
                        // onChange={(e) => setSelectedAgent(e.target.value)}
                        onChange={e => updateOrder(order._id, {agent: e.target.value})}
                      >
                        <option value="">Assign to Agent</option>
                        {agents.map((a) => (
                          <option defaultValue="" selected={order.agent === a._id} value={a._id} key={a._id}>
                            {a.name}
                          </option>
                        ))}
                      </select>
                      {/* <button className="p-2 rounded bg-gray-500"></button> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="h-20"></div>
      </div>
    </div>
  );
}

export default AdminOrders;
