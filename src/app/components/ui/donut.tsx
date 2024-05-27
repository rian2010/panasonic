// src/DeliveryProgressComponent.js
import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const DeliveryProgressComponent = () => {
  const targetPercentage = 68;
  const [percentage, setPercentage] = useState(0);

  const getCurrentDate = () => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date().toLocaleDateString(undefined, options);
  };
  const currentDate = getCurrentDate();

  useEffect(() => {
    let interval;
    if (percentage < targetPercentage) {
      interval = setInterval(() => {
        setPercentage(prev => Math.min(prev + 1, targetPercentage));
      }, 20); // Adjust the speed of the animation by changing the interval duration
    }
    return () => clearInterval(interval);
  }, [percentage, targetPercentage]);

  return (
    <div className="bg-[#3E3B64] p-5 rounded-lg text-white font-sans">
      <h2 className="text-xl mb-2 border-b font-bold pb-1">Deliveries</h2>
      <div className="w-24 h-24 mx-auto py-3">
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            textSize: '24px',
            textColor: 'white',
            pathColor: '#60a5fa',
            trailColor: '#1f2937',
          })}
        />
      </div>
      <div className="text-center text-l mb-4 pt-4 border-b pb-1">Target Deliveries</div>
      <div className="text-center text-sm text-gray-400">As of {currentDate}</div>
    </div>
  );
};

export default DeliveryProgressComponent;

