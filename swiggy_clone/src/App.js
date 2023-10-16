import Header from "./component/Header";
import { Outlet } from "react-router-dom";
import MainContext from "./utils/MainContext";
import { Provider } from "react-redux";
import store from "./utils/store";
import { useState } from "react";

const AppLayout = () => {
  const [currentPath, setCurrentPath] = useState("home");

  return (
    <>
    <Provider store={store}>
      <MainContext.Provider value={{currentPath, setCurrentPath}}>
        <Header />
        <Outlet />
      </MainContext.Provider>
      </Provider>

    </>
  );
};

export default AppLayout;
