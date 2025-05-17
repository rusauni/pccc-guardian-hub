
import React from 'react';

const Banner = () => {
  return (
    <div className="relative h-[300px]">
      <div className="banner-slide absolute w-full h-full">
        <img
          src="https://via.placeholder.com/1200x400?text=PCCC"
          alt="Phòng cháy chữa cháy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold text-center px-4">
            Bảo vệ cuộc sống - Nâng cao nhận thức về PCCC
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Banner;
