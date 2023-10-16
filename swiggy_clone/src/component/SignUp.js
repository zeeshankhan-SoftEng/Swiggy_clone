import { useState } from "react";
import InputControl from "./InputControl";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { LOGIN_PAGE_IMAGE } from "../utils/constants";

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [signUpInProcess, setSignUpInProcess] = useState(false);

  const [localUserData, setLocalUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleClick = () => {
    if (
      !localUserData.name ||
      !localUserData.email ||
      !localUserData.password
    ) {
      setErrorMessage("Please fill the correct details");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);

      return;
    }

    //create user in firebase
    setSignUpInProcess(true);

    createUserWithEmailAndPassword(
      auth,
      localUserData.email,
      localUserData.password
    )
      .then(async (res) => {
        console.log(res.user.displayName);
        console.log("Updating profile name");
        await updateProfile(res.user, {
          displayName: localUserData.name,
        });
        console.log("profile updated");
        console.log(res.user.displayName);
        setSignUpInProcess(false);
        navigate("/");
      })
      .catch((err) => {
        setErrorMessage(err.code + " " + err.message);
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
        setSignUpInProcess(false);
      });

    setLocalUserData({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="flex justify-center items-center h-fit">
    <div className="block max-w-sm rounded-lg bg-white p-5 m-7 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 transition duration-300 ease-in-out hover:scale-110">
      <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
        <img src={LOGIN_PAGE_IMAGE} className="w-full" alt="Phone image" />
      </div>
      <div className="mb-12">
        <InputControl
          label="Name"
          placeholder="Enter Your Name"
          type="text"
          value={localUserData.name}
          onChange={(event) =>
            setLocalUserData((prev) => ({
              ...prev,
              name: event.target.value,
            }))
          }
        />
  
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
          {signUpInProcess ? (
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleClick}
              disabled={true}
            >
              Sign Up
            </button>
          ) : (
            <button
              className="bg-green-400 border rounded p-2 w-full font-Arvo text-lg"
              onClick={handleClick}
            >
              Sign Up
            </button>
          )}
        </div>
  
        <p className="font-Arvo text-center md:text-left">
          Already have an account,{" "}
          <Link to="/login" className="text-blue-500 hover:cursor-pointer">
            Log In
          </Link>{" "}
          to continue.
        </p>
      </div>
    </div>
  </div>
  
  );
};

export default SignUp;
