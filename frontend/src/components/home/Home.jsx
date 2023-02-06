import React from "react";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import Body from "../body/Body";
import History from "../body/History/History";

const Home = () => {
  return (
    <>
      <Header home={true} />
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col items-center">
          <Body />
          <History />
        </div>
      </div>
    </>
  );
};

export default Home;
