import React, { useEffect, useState } from 'react';
import { CDN_URL } from '../utils/constants';
import { Link } from 'react-router-dom';
import { database } from '../utils/firebase';

const OrderDetails = (currentUser) => {
  const [orders, setOrders] = useState(null);
  const uid = currentUser.currentUser.uid;

  useEffect(() => {
    const fetchData = () => {
      const databaseRef = database.ref('users/' + uid);

      databaseRef.on('value', (snapshot) => {
        const val = snapshot.val();
        if (val) {
          const data = Object.values(val);
          setOrders(data);
        }
      });
    };

    fetchData();
  }, [uid]);

  return (
    <>
      {orders != null &&
        orders.length > 0 &&
        orders.map((order) => {
          const path = '/restaurant/' + order.restaurant_id;
          return (
            <div className="my-1 flex" key={order.order_id}>
              {/* left side: logo */}
              <div className="w-full max-w-56 sm:w-56 h-auto m-2 p-2 transition duration-300 ease-in-out hover:scale-110 rounded-xl shadow-lg">
                <Link to={path}>
                  <img
                    className="min-h-full max-h-full object-fill rounded"
                    src={CDN_URL + order.logo}
                    alt="restaurant logo"
                  />
                </Link>
              </div>
              {/* right side for other details: top restaurant, below menu */}
              <div className="flex flex-col">
                {/* restaurant */}
                <div>
                  <h3 className="text-lg font-Arvo">{order.restaurantName}</h3>
                </div>
                {/* menu */}
                {order.items.map((item) => {
                  return (
                    <div className="flex font-Arvo text-sm" key={item.id}>
                      <h3 className="mx-2">{item.name}</h3>
                      <h3 className="mx-2">{item.price / 100}</h3>
                      <h3 className="mx-2">{item.quantity}</h3>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
    </>
  );
};

export default OrderDetails;
