
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";

// Example featured news data
const featuredNews = [
  {
    id: 1,
    title: "Cháy chung cư ở Hà Nội: Những bài học về an toàn PCCC",
    category: "Tin nổi bật",
    image: "https://via.placeholder.com/600x400?text=Chung+cư+Hà+Nội",
    date: "15/05/2025",
    slug: "/tin-tuc/1",
  },
  {
    id: 2,
    title: "Hướng dẫn kỹ năng thoát nạn khi gặp hỏa hoạn",
    category: "Kỹ năng",
    image: "https://via.placeholder.com/600x400?text=Kỹ+năng+thoát+nạn",
    date: "14/05/2025",
    slug: "/huong-dan-cong-dong/2",
  },
  {
    id: 3,
    title: "Bộ Công an ban hành thông tư mới về quản lý PCCC tại khu dân cư",
    category: "Văn bản pháp quy",
    image: "https://via.placeholder.com/600x400?text=Thông+tư+mới",
    date: "12/05/2025",
    slug: "/van-ban-phap-quy/3",
  },
  {
    id: 4,
    title: "Diễn tập PCCC tại các trường học - Hình ảnh ấn tượng",
    category: "Hướng dẫn cộng đồng",
    image: "https://via.placeholder.com/600x400?text=Diễn+tập+trường+học",
    date: "10/05/2025",
    slug: "/huong-dan-cong-dong/4",
  },
  {
    id: 5,
    title: "Công nghệ mới trong lĩnh vực PCCC được áp dụng tại Việt Nam",
    category: "Nghiên cứu - Trao đổi",
    image: "https://via.placeholder.com/600x400?text=Công+nghệ+PCCC",
    date: "08/05/2025",
    slug: "/nghien-cuu-trao-doi/5",
  },
];

// Latest news data
const latestNews = [
  {
    id: 6,
    title: "Sáng 17-5, giá mua vàng nhẫn 99,99 giảm còn 111 triệu đồng/lượng",
    category: "Tin tức",
    date: "17/05/2025",
    slug: "/tin-tuc/6",
  },
  {
    id: 7,
    title: "Tổng thống Mỹ Trump tuyên bố sẽ đơn phương áp mức thuế mới với 150 quốc gia",
    category: "Thế giới",
    date: "17/05/2025",
    slug: "/tin-tuc/7",
  },
  {
    id: 8,
    title: "Tìm thấy thi thể 3 nạn nhân vụ sạt lở khi thi công thuỷ điện ở Lai Châu",
    category: "Tin tức",
    date: "17/05/2025",
    slug: "/tin-tuc/8",
  },
  {
    id: 9,
    title: "Những ai bị cáo buộc đã nhận tiền hối lộ 71 tỉ đồng của ông chủ Công ty Dược Sơn Lâm?",
    category: "Tin tức",
    date: "16/05/2025",
    slug: "/tin-tuc/9",
  },
  {
    id: 10,
    title: "Diễn biến vụ 11 nghệ sĩ bị cảnh sát điều tra",
    category: "Giải trí",
    date: "16/05/2025",
    slug: "/giai-tri/10",
  },
];

const FeaturedNewsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderValue, setSliderValue] = useState([0]);
  const maxIndex = featuredNews.length - 1;
  
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    setSliderValue([currentIndex + 1 > maxIndex ? 0 : currentIndex + 1]);
  };
  
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    setSliderValue([currentIndex - 1 < 0 ? maxIndex : currentIndex - 1]);
  };
  
  const handleSliderChange = (value: number[]) => {
    setCurrentIndex(value[0]);
    setSliderValue(value);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 7000);
    
    return () => {
      clearInterval(timer);
    };
  }, [currentIndex]);

  // Fallback image for error handling
  const fallbackImage = "https://via.placeholder.com/600x400?text=News+Image";

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-1 h-6 bg-pccc-primary mr-3"></div>
            <h2 className="text-2xl font-bold text-pccc-dark">Tin tức nổi bật trong tuần</h2>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-pccc-light text-pccc-primary hover:bg-pccc-primary hover:text-white transition"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-pccc-light text-pccc-primary hover:bg-pccc-primary hover:text-white transition"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main featured news slider - left side (2/3 width on large screens) */}
          <div className="lg:col-span-2">
            <div className="relative overflow-hidden rounded-lg shadow-md">
              {featuredNews.map((news, index) => (
                <Link 
                  key={news.id} 
                  to={news.slug}
                  className={`block transition-opacity duration-500 ${
                    index === currentIndex ? 'opacity-100 relative z-10' : 'opacity-0 absolute inset-0'
                  }`}
                >
                  <div className="relative aspect-[16/9]">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = fallbackImage;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                      <Badge variant="secondary" className="mb-2 w-fit">{news.category}</Badge>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{news.title}</h3>
                      <p className="text-sm text-gray-200">{news.date}</p>
                    </div>
                  </div>
                </Link>
              ))}
              
              <div className="absolute bottom-4 left-0 right-0 z-20 px-6">
                <Slider 
                  value={sliderValue} 
                  max={maxIndex} 
                  step={1} 
                  onValueChange={handleSliderChange} 
                  className="w-full" 
                />
              </div>
            </div>
          </div>
          
          {/* Latest news section - right side (1/3 width on large screens) */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4 border-b pb-2">Bài đăng gần nhất</h3>
              <div className="space-y-4">
                {latestNews.map((news) => (
                  <Link key={news.id} to={news.slug} className="block hover:bg-gray-100 rounded-md p-2 transition-colors">
                    <div>
                      <Badge variant="outline" className="text-xs mb-1">{news.category}</Badge>
                      <h4 className="text-sm font-medium line-clamp-2">{news.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">{news.date}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedNewsCarousel;
