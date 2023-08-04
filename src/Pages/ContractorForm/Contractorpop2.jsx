import React, { useState } from "react";
import {GrCircleInformation} from "react-icons/gr";

const Contractorpopup2 = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleIconMouseEnter = () => {
    setPopupVisible(true);
  };

  const handleIconMouseLeave = () => {
    setPopupVisible(false);
  };

  return (
    <div
      className="popup-container"
      onMouseEnter={handleIconMouseEnter}
      onMouseLeave={handleIconMouseLeave}
    >
      <div className="info-icon">
      <GrCircleInformation />
      </div>
      {isPopupVisible && (
        <div className="popup">
<div  className="pop">Name you wish to use in contract.</div>
        </div>
      )}
    </div>
  );
};

export default Contractorpopup2;