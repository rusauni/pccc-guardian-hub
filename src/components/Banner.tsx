
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const bannerImages = [
  {
    id: 1,
    src: "https://via.placeholder.com/1200x400?text=Phòng+cháy+chữa+cháy",
    alt: "Phòng cháy chữa cháy",
    title: "Phòng cháy và chữa cháy - Trách nhiệm của toàn dân"
  },
  {
    id: 2,
    src: "https://via.placeholder.com/1200x400?text=Nhân+viên+cứu+hỏa",
    alt: "Nhân viên cứu hỏa",
    title: "Nâng cao kỹ năng PCCC cho cộng đồng"
  },
  {
    id: 3,
    src: "https://via.placeholder.com/1200x400?text=Tình+huống+khẩn+cấp",
    alt: "Tình huống khẩn cấp",
    title: "Bảo vệ cuộc sống - Nâng cao nhận thức về PCCC"
  },
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === bannerImages.length - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? bannerImages.length - 1 : prev - 1));
  };
  
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="relative overflow-hidden h-[400px]">
      {bannerImages.map((image, index) => (
        <div
          key={image.id}
          className={`banner-slide absolute w-full h-full transition-opacity duration-500 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold text-center px-4">
              {image.title}
            </h1>
          </div>
        </div>
      ))}
      
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 z-20 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75 transition"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 z-20 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75 transition"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
