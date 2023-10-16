import { createContext } from "react";

const RestaurantDetailsContext = createContext({
    restaurant: {
        name: "",
        id: "",
        logo: "",
        areaname: "",
    },
})

export default RestaurantDetailsContext;