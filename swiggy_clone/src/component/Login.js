import { useState } from "react";
import InputControl from "./InputControl";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../utils/userSlice";
import { LOGIN_PAGE_IMAGE } from "../utils/constants";

const Login = () => {
  const [loginInProcess, setLoginInProcess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [localUserData, setLocalUserData] = useState({
    email: "",
    password: "",
  });

  //react-router-dom hook to navigate to home once logged in.
  const navigate = useNavigate();

  //store operations
  const dispatch = useDispatch();

  const handleClick = () => {
    if (!localUserData.email || !localUserData.password) {
      setErrorMessage("Please fill every field");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);

      return;
    }

    //verify details from firebase database
    setLoginInProcess(true);
    signInWithEmailAndPassword(
      auth,
      localUserData.email,
      localUserData.password
    )
      .then((res) => {
        setLoginInProcess(false);
        //dispatch this user to user slice in store.
        dispatch(setUser(localUserData.email));
        navigate("/");
      })
      .catch((err) => {
        setErrorMessage(err.code + " " + err.message);
        console.log(errorMessage);
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
        setLoginInProcess(false);
      });

    setLocalUserData({
      email: "",
      password: "",
    });
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="block max-w-sm  bg-white p-5 m-7 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 transition duration-300 ease-in-out hover:scale-110  rounded-xl">
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
            <img className="w-full" src={LOGIN_PAGE_IMAGE} alt="Phone image" />
          </div>
          <div className="mb-12">
            <InputControl
              label="Email"
              placeholder="Enter Email Address"
              type="email"
              value={localUserData.email}
              onChange={(event) =>
                setLocalUserData((prev) => ({
                  ...prev,
                  email: event.target.value,
                }))
              }
            />

            <InputControl
              label="Password"
              placeholder="Enter Password"
              type="password"
              value={localUserData.password}
              onChange={(event) =>
                setLocalUserData((prev) => ({
                  ...prev,
                  password: event.target.value,
                }))
              }
            />

            {errorMessage !== "" && (
              <p className="text-red-500 font-Arvo">{errorMessage}</p>
            )}

            <div className="w-full m-2">
              {loginInProcess ? (
                <button
                  className="bg-gray-500 border rounded p-2 w-full font-Arvo text-lg"
                  disabled={true}
                  onClick={handleClick}
                >
                  Log In
                </button>
              ) : (
                <button
                  className="bg-green-400 border rounded p-2 w-full font-Arvo text-lg"
                  onClick={handleClick}
                >
                  Log In
                </button>
              )}
            </div>

            <p className="font-Arvo">
              Don't have an account,
              <Link to="/signup">
                <span className="text-blue-500 hover:cursor-pointer">
                  {" "}
                  Sign Up{" "}
                </span>
              </Link>{" "}
              to continue.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
