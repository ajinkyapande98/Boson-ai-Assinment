import React, { useEffect } from "react";
import ShowTask from "./Components/ShowTask";

const Home = ({ isLoggedIn, toast }) => {
  useEffect(() => {
    toast("Plese Log In First");
  }, []);
  console.log(isLoggedIn);
  return (
    <>
      {isLoggedIn ? (
        <ShowTask toast={toast} />
      ) : (
        <>
          <h1 className=" text-center text-2xl mt-5">Plese Log In First</h1>
        </>
      )}
    </>
  );
};

export default Home;
