import React, { useState } from "react";
import { auth } from "../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const { isLoggedIn, setIsLoggedIn } = props;

  const Navigate = useNavigate();

  // const handleSignOut = () => {
  //   console.log("log out clicked");
  //   signOut(auth);
  //   Navigate("/signin");
  //   setIsOpen(!isOpen);
  //   setIsLoggedIn(false);
  // };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out user", error);
    }
    Navigate("/sign-in");
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  // console.log(isOpen);
  return (
    <div>
      <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-1 mb-3">
        <div
          // style={{ height: 30, width: 120, position: "relative", top: -20 }}
          className="flex items-center flex-shrink-0 text-white mr-16"
        >
          {/* <span className="font-semibold text-xl tracking-tight">Booketh</span> */}
          <Link to="/" className="flex items-center text-xl font-semibold ">
            <img
              // style={{ height: 30, width: 120, position: "absolute" }}
              className="h-12 relative m-2 "
              src="https://media.licdn.com/dms/image/C4D0BAQHkWsAyVMSmHQ/company-logo_200_200/0/1650493555598?e=1687392000&v=beta&t=Oeas7p-Gshem-GbChIZPgemZABl2blsgGHblpo148NM"
              alt=""
            />
            <h1>Boson Ai</h1>
          </Link>
        </div>
        <div className="block lg:hidden">
          <button
            onClick={handleToggle}
            className="flex items-center px-3 py-2 border rounded text-red-200 border-red-400 hover:text-white hover:border-white"
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* <title>Menu</title> */}
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div
          className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="text-sm lg:flex-grow">
            <Link
              onClick={handleToggle}
              to="/"
              className="text-base block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
            >
              Home
            </Link>
            <Link
              onClick={handleToggle}
              to="/add-task"
              className="text-base block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
            >
              Add Task
            </Link>
            <Link
              onClick={handleToggle}
              to="/contact-us"
              className="text-base block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
            >
              Contact Us
            </Link>
          </div>
          <div>
            {isLoggedIn ? (
              <button
                onClick={handleSignOut}
                className="inline-block text-sm mx-4 px-4  py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
              >
                Log Out
              </button>
            ) : (
              <>
                <Link
                  onClick={handleToggle}
                  to="/sign-up"
                  className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
                >
                  Sign Up
                </Link>
                <Link
                  onClick={handleToggle}
                  to="/sign-in"
                  className="inline-block text-sm mx-4 px-4  py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
                >
                  Log In
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
