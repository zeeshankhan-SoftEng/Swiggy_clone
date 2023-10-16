import RestaurantCards from "../component/RestaurantCards";
import { useEffect, useState } from "react"; /* This is named export */
import Shimmer from "./Shimmer"; /* This is default export */
import { swiggy_api_URL } from "../utils/constants";
import { Link } from "react-router-dom";

// Filter the restaurant data according input type
function filterData(searchText, restaurants) {
  const resFilterData = restaurants.filter((rest) =>
    rest?.info?.name.toLowerCase().includes(searchText.toLowerCase())
  );
  return resFilterData;
}
// Body Component for body section: It contain all restaurant cards
const Body = () => {
  const [allRestaurant, setAllRestaurant] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");
  // empty dependency array =>  once after render
  // dep array [searchText] => once after initial render + everytime after render (my text changes)
  useEffect(() => {
    async function getRestaurants() {
      try {
        const data = await fetch(swiggy_api_URL);
        const json = await data.json();
        // Log the API response to verify data structure

        // Ensure that the path to restaurant data matches the API response structure
        const resData =
          json?.data?.cards.find(
            (card) =>
              card.card?.card?.gridElements?.infoWithStyle?.restaurants !==
              undefined
          )?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

        // Log the restaurant data to verify it's not empty
        setAllRestaurant(resData);
        setFilteredRestaurant(resData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getRestaurants();
  }, []);

  return !allRestaurant || allRestaurant.length === 0 ? (
    <Shimmer />
  ) : (
    <>
      <div className=" flex justify-center py-2 my-4 ">
        <div>
          <input
            className="mr-3  rounded-lg shadow appearance-none border border-red-500  max-w-3xl py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Search Restaurants"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="bg-red-900 hover:bg-gray-100 text-cyan-50 font-semibold py-2 px-4  rounded-lg border-gray-400  shadow"
            variant="contained"
            color="primary"
            onClick={() => {
              const data = filterData(searchText, allRestaurant);
              setFilteredRestaurant(data);
            }}
          >
            Search{" "}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap">
       
        {filteredRestaurant.map((rest)=>( 
          
            <Link to={"/restaurant/" + rest?.info?.id} key={rest?.info?.id}>
            <RestaurantCards {...rest?.info} key={rest?.info?.id}  />
          </Link>
          
        ))}
      </div>
    </>
  );
};

export default Body;
