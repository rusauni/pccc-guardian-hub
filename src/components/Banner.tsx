
import React from 'react';

const Banner = () => {
  return (
    <div className="relative h-[300px]">
      <div className="banner-slide absolute w-full h-full">
        <img
          src="https://static.cand.com.vn/Files/Image/nguyenbinh/2018/02/13/30c0c2f3-ebc4-4fa2-a31d-e8d639972843.jpg"
          alt="Phòng cháy chữa cháy"
          className="w-full h-full object-cover"
        />
        {/* <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold text-center px-4">
            Bảo vệ cuộc sống - Nâng cao nhận thức về PCCC
          </h1>
        </div> */}
      </div>
    </div>
  );
};

export default Banner;
