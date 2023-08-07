import React, { useState } from "react";
import { GrCircleInformation } from "react-icons/gr";

const Contractorpopup1 = () => {
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
        <div className="contract-popup">
          <div className="pop">Name in which payment has to be done.</div>
        </div>
      )}
    </div>
  );
};

export default Contractorpopup1;
