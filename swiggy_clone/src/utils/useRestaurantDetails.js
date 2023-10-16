import { useState, useEffect } from "react";
import { MENU_URL } from "../utils/constants";

const useRestaurantDetails = (resId) => {
  const [restaurant, setRestaurant] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log({ rest: restaurant });
  // Fetch restaurant data from the API

  useEffect(() => {
    getRestaurantInfo(resId);
  }, []);

  async function getRestaurantInfo() {
    try {
      const response = await fetch(MENU_URL + resId);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const json = await response.json();

      const card = json?.data?.cards[0]?.card?.card?.info;
      const cuisineDetails = json?.data?.cards[1]?.groupedCard?.cardGroupMap
        ?.REGULAR?.cards
        ? json?.data?.cards[1]?.groupedCard?.cardGroupMap?.REGULAR?.cards
        : json?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards;

      setRestaurant({
        name: card?.name,
        logo: card?.cloudinaryImageId,
        id: card?.id,
        cuisines: card?.cuisines,
        areaname: card?.areaName,
        deliverymsg: card?.feeDetails?.message,
        avgrating: card?.avgRatingString,
        totalratings: card?.totalRatingsString,
        itemCards: cuisineDetails,
      });

      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }

  // Return an object with restaurant data, loading state, and error
  return { restaurant, loading, error };
};

export default useRestaurantDetails;
