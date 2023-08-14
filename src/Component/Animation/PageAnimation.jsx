import React from "react";
import "./PageAnimation.css";

const PageAnimation = () => {
  return (
    <>
      <div className="pageanimationdiv">
        <div className="typewriter">
          <div className="slide">
            <i></i>
          </div>
          <div className="paper"></div>
          <div className="keyboard"></div>
        </div>
      </div>
    </>
  );
};

export default PageAnimation;