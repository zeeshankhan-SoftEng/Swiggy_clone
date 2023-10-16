import { useParams } from "react-router-dom";
import useRestaurantDetails from "../utils/useRestaurantDetails";
import MenuCards from "../component/MenuCards"
import RestaurantDetailsContext from "../utils/RestaurantDetailsContext";

const RestaurantMenu = () => {
  const {resId} = useParams()
const {restaurant} = useRestaurantDetails(resId)
  // Check if restaurant is not defined or its cards array is empty
  const {
    name,
    areaname,
    deliverymsg,
    avgrating,
    totalratings,
    itemCards,
    logo
  } = restaurant;
 
  const restDataList = {
    resId:resId,
    name: name,
    areaname: areaname,
    logo: logo,
  };

  return (
    <>
    <div className="w-full min-h-screen">
      {/* Restaurant details */}
      <div className="w-[60%] mx-auto font-Arvo mt-[20px] flex justify-between items-baseline">
        <div>
          <h2 className="font-bold text-[22px] mb-[15px]">{name}</h2>
          {/* <h5 className="font-normal text-[#8d8d8d]">
            {cuisines.join(", ")}
          </h5> */}
          <div className="flex">
            <img
              className="h-5 w-4 mr-1"
              src="https://www.clipartmax.com/png/small/207-2072371_or-combined-to-be-gigantic-location-icon-in-orange-color.png"
              alt=""
            />
            <h5 className="font-normal text-[#8d8d8d]">{areaname}</h5>
          </div>
          <h5 className="font-normal text-[#8d8d8d]">{deliverymsg}</h5>
        </div>
        <div className="flex flex-col shadow-md">
          <span className="star-rating text-center border-[1px] border-[#d0d0d0] py-[5px] px-[2px] bg-green-500 text-white">
            <i className="fa fa-star"></i>{" "}
            {avgrating !=="--" ? avgrating : "0.0"}
          </span>
          {totalratings != null && (
            <span className="review-count text-center border-[1px] border-[#d0d0d0] py-[5px] px-[2px] text-[#8d8d8d] font-[13px]">
              {totalratings}
            </span>
          )}
        </div>
      </div>

      <hr className="w-[60%] mx-auto my-2 border-gray-600" />

      {/* Offers area */}

      <div className="w-[60%] mx-auto font-Arvo flex items-center overflow-x-auto whitespace-nowrap scrollbar-none">
        <div className="rounded-md m-1 p-2 shadow cursor-pointer border border-gray-400">
          <h5 className="font-semibold">30% upto 75rs</h5>
          <span className="font-[12px] text-[#a0522d]">
            use TRYNEW above 149rs
          </span>
        </div>
        <div className="rounded-md m-1 p-2 shadow cursor-pointer border border-gray-400">
          <h5 className="font-semibold">30% upto 75rs</h5>
          <span className="font-[12px] text-[#a0522d]">
            use TRYNEW above 149rs
          </span>
        </div>
        <div className="rounded-md m-1 p-2 shadow cursor-pointer border border-gray-400">
          <h5 className="font-semibold">30% upto 75rs</h5>
          <span className="font-[12px] text-[#a0522d]">
            use TRYNEW above 149rs
          </span>
        </div>
        <div className="rounded-md m-1 p-2 shadow cursor-pointer border border-gray-400">
          <h5 className="font-semibold">30% upto 75rs</h5>
          <span className="font-[12px] text-[#a0522d]">
            use TRYNEW above 149rs
          </span>
        </div>
        <div className="rounded-md m-1 p-2 shadow cursor-pointer border border-gray-400">
          <h5 className="font-semibold">30% upto 75rs</h5>
          <span className="font-[12px] text-[#a0522d]">
            use TRYNEW above 149rs
          </span>
        </div>
        <div className="rounded-md m-1 p-2 shadow cursor-pointer border border-gray-400">
          <h5 className="font-semibold">30% upto 75rs</h5>
          <span className="font-[12px] text-[#a0522d]">
            use TRYNEW above 149rs
          </span>
        </div>
      </div>

      {/* Veg/non veg declaration */}

      <div className="w-[60%] mx-auto font-Arvo">
        <h4 className="mt-[20px] mb-[10px] font-[600] text-[18px]">
          <i className="fa fa-leaf text-green-800"></i> Pure Veg
        </h4>
      </div>

      <hr className="w-[60%] mx-auto border-gray-600" />

      {/* Menu items with categories */}
      <RestaurantDetailsContext.Provider value={restDataList}>
          <div className="w-[60%] mx-auto my-1">
            {itemCards?.map((itemCard, index) => {
              if (index !== 0) {
                return <MenuCards key={index} itemCard={itemCard} />;
              }
            })}
          </div>
        </RestaurantDetailsContext.Provider>
      
    </div>
  </>
  )}
export default RestaurantMenu;
