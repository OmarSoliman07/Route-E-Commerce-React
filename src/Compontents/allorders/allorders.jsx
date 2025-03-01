import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrdersData();
  }, []);

  async function getOrdersData() {
    setLoading(true);
    try {
      const token = localStorage.getItem("userToken");
      const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${token}`);
      setOrders(res.data.data);
    } catch (error) {
      console.error("Error fetching orders data:", error);
      toast.error("Error fetching orders data.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <>
      <Toaster />
   
      <Link to="/cart" className="block mb-4 text-blue-500 underline">
        Go to Cart
      </Link>
      {orders && orders.length > 0 ? (
        <div className="w-11/12 mx-auto my-5">
          <div className="bg-gray-300 p-5 rounded-lg">
            <h2 className="text-2xl font-bold">Your Orders</h2>
            <div className="divide-y-2 divide-gray-500 mt-5">
              {orders.map((order) => (
                <div key={order._id} className="flex items-center py-3">
                  <div className="w-10/12">
                    <h2 className="text-2xl font-semibold">
                      Order ID: {order._id}
                    </h2>
                    <h2 className="text-green-700 text-xl">
                      Total Price: {order.totalOrderPrice} EGP
                    </h2>
                    <p className="text-gray-700">
                      Order Date: {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="w-2/12 flex items-center justify-center">
                    <Link
                      to={`/orderDetails/${order._id}`}
                      className="text-center block text-2xl text-white bg-green-700 py-2 px-4 rounded-lg hover:bg-green-800"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-red-700 bg-lime-500 text-center p-5 rounded-lg text-xl">
          No orders found.
        </div>
      )}
    </>
  );
}
