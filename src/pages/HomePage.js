import React, { useState, useEffect } from "react";
import Banner from "../components/Banner";
import Body from "../components/Body";
import "../App.scss";
import Preloader from "../components/Preloader/Preloader";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate content loading delay
    setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds (adjust as per your needs)
    }, 2000); // Adjust delay time as needed
  }, []);
  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <>
          <Banner />
          <Body />
        </>
      )}
    </>
  );
};

export default Home;
