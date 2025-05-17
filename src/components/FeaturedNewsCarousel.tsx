
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

const FeaturedNewsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === featuredNews.length - 3 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? featuredNews.length - 3 : prev - 1));
  };
  
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 7000);
    
    return () => {
      clearInterval(timer);
    };
  }, []);

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
        
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 33.333}%)`,
            }}
          >
            {featuredNews.map((news) => (
              <div key={news.id} className="min-w-[33.333%] px-3">
                <Card className="news-card h-full hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <Link to={news.slug}>
                      <img
                        src={news.image}
                        alt={news.title}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = fallbackImage;
                        }}
                      />
                      <div className="p-4">
                        <Badge variant="secondary" className="mb-2">{news.category}</Badge>
                        <h3 className="text-lg font-semibold line-clamp-2">{news.title}</h3>
                        <p className="text-sm text-gray-500 mt-2">{news.date}</p>
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedNewsCarousel;
