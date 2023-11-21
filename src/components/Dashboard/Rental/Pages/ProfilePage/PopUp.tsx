import { useEffect, useState } from "react";

const PopUp = () => {
  const [showPopup, setShowPopup] = useState(true);

  // Function to hide the popup after 1 second
  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 2000); // 1000 milliseconds = 1 second

      // Clear the timer if the component unmounts or showPopup changes
      return () => {
        clearTimeout(timer);
      };
    }
  }, [showPopup]);
  return (
    <>
      {showPopup && (
        <div className="absolute bg-green-100 p-2 transition-all duration-300 rounded-md shadow-md top-[110px] right-20">
          Your Details Saved
        </div>
      )}
    </>
  );
};

export default PopUp;
