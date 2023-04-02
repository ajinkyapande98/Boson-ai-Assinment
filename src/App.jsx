import Home from "./Home";
import { Route, Routes } from "react-router-dom";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";
import Navbar from "./Components/Navbar";
import AddTask from "./Components/AddTask";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        // console.log("logged out");
      }
    });
  }, [isLoggedIn]);
  console.log(isLoggedIn);
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/add-task" element={<AddTask toast={toast} />} />
          </>
        ) : (
          <>
            <Route path="/sign-in" element={<SignIn toast={toast} />} />
            <Route path="/sign-up" element={<SignUp toast={toast} />} />
          </>
        )}
        <Route
          path="/"
          element={<Home isLoggedIn={isLoggedIn} toast={toast} />}
        />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
