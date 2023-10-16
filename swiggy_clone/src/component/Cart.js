import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { addItem, clearCart, removeItem } from "../utils/cartSlice";
import { CDN_URL } from "../utils/constants";
import MainContext from "../utils/MainContext";
import { database } from "../utils/firebase";
import OrderDetails from "./OrderDetails";

const Cart = () => {
  const [totalBill, setTotalBill] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);

  const cartItems = useSelector((store) => store.cart.cartItems);
  const path = `/restaurant/${cartItems.restaurant_id}`;

  const { setCurrentPath } = useContext(MainContext);
  const { pathname } = useLocation();

  // Update currentUser state when the pathname changes
  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  // Calculate the total bill whenever cartItems change
  useEffect(() => {
    let total = 0;
    cartItems.items.forEach((cur) => {
      if (!isNaN(cur.price)) {
        total += (cur.price / 100) * cur.quantity;
      }
    });
    // Use toFixed to format the total with two decimal places
    setTotalBill(total.toFixed(2));
  }, [cartItems]);

  const dispatch = useDispatch();
  const store = useStore();

  const addMenu = (curItem) => {
    dispatch(addItem(curItem));
  };

  const removeMenu = (curItem) => {
    dispatch(removeItem(curItem));
  };

  const handleClick = () => {
    if (!currentUser) {
      alert("Please Login/Sign up first to place an order");
      return;
    }

    const cartState = store.getState().cart;
    const cartItems = cartState.cartItems;
    const uid = currentUser.uid;
    const databaseRef = database.ref(`users/${uid}`);
    const newChildRef = databaseRef.push();
    newChildRef.set(cartItems);

    alert("Order Successful");
    dispatch(clearCart());
  };

  return (
    <div className="flex flex-wrap bg-slate-200 p-4 min-h-screen">
      {/* Account details side */}
      <div className="w-full md:w-2/3 lg:w-3/4 p-4">
        {/* Account */}
        <div className="py-5 px-10 bg-white">
  <h3 className="text-lg font-bold font-Arvo">Account</h3>

  {currentUser ? (
    // Display user information when logged in
    <div className="my-1">
      <div className="my-1">
        <h2 className="text-md font-semibold font-Arvo">
          Personal Information
        </h2>
        <h2 className="text-md font-Arvo m-1">
          Name: {currentUser.displayName}
        </h2>
        <h3 className="text-md font-Arvo m-1">
          Email: {currentUser.email}
        </h3>
      </div>
      <div className="my-1">
        <h2 className="text-md font-semibold font-Arvo">Order History</h2>
        <OrderDetails currentUser={currentUser} />
      </div>
    </div>
  ) : (
    // Display login/signup options when not logged in
    <div>
      <h4 className="font-Arvo text-slate-400 mb-4">
        To place your order now, log in to your existing account or sign up.
      </h4>
      <Link to="/login">
        <button className="border border-green-700 rounded text-green-700 font-Arvo mx-2 py-1 px-3 text-sm">
          Have an account? <br />
          <span className="text-md">LOG IN</span>
        </button>
      </Link>
      <Link to="/signup">
        <button className="bg-green-700 rounded text-white font-Arvo mx-2 py-1 px-3 text-sm">
          New to Food Studio? <br />
          <span className="text-md">SIGN UP</span>
        </button>
      </Link>
    </div>
  )}
</div>

        {/* Delivery Address */}
        <div className="py-5 px-10 bg-white my-4">
          <h3 className="font-Arvo font-bold text-lg">Delivery Address</h3>
        </div>
        {/* Payment */}
        <div className="py-5 px-10 bg-white my-4">
          <h3 className="font-Arvo font-bold text-lg">Payment</h3>
        </div>
      </div>

      {/* Cart details side */}
      {cartItems.items.length > 0 && (
        <div className="bg-white w-full md:w-1/3 lg:w-1/4 h-auto md:h-[70vh] p-4 my-4 transition duration-300 ease-in-out hover:scale-110 rounded-xl shadow-l">
          {/* Restaurant details */}
          <div className="flex">
            <div className="w-16 h-12 mx-2 overflow-hidden">
              <Link to={path}>
                <img
                  className="min-h-full max-h-full object-fill rounded"
                  src={`${CDN_URL}${cartItems.logo}`}
                  alt=""
                />
              </Link>
            </div>
            <div className="mx-2">
              <h3 className="text-lg font-Arvo">{cartItems.restaurantName}</h3>
              <h4 className="text-sm">{cartItems.areaName}</h4>
            </div>
          </div>

          {/* Menu items list */}
          <div className="h-auto md:h-[35vh] overflow-y-auto mt-4 ">
            {cartItems.items.map((curItem, index) => (
              <div key={index} className="my-4 flex justify-between items-center">
                <h3 className="w-[40%] font-Arvo">{curItem.name}</h3>
                <div className="w-[35%] flex justify-between items-center border border-gray-400 px-2 mx-2">
                  <button onClick={() => removeMenu(curItem)}>➖</button>
                  <h4 className="mx-1 font-Arvo">{curItem.quantity}</h4>
                  <button onClick={() => addMenu(curItem)}>➕</button>
                </div>
                <p className="w-[25%] text-end font-Arvo">
                  {(curItem.price / 100) * curItem.quantity}Rs
                </p>
              </div>
            ))}
          </div>

          {/* Total Charge */}
          <div className="mt-2 p-2 flex justify-between">
            <h3 className="font-bold">Total Amount to Pay:</h3>
            <h3 className="font-semibold">{totalBill}Rs</h3>
          </div>

          <div className="flex justify-between my-1">
            <button
              className="bg-green-600 text-white font-Arvo p-1 rounded ml-4"
              onClick={() => {
                dispatch(clearCart());
              }}
            >
              Clear Cart
            </button>
            <button
              className="bg-green-600 text-white font-Arvo p-1 rounded"
              onClick={handleClick}
            >
              CheckOut
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
