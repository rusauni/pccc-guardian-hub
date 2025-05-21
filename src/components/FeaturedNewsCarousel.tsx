import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { latestNews, communityGuides, regulations, videos, procedures, professionalGuides, research } from '@/data/mockData';

// Create featured news from mock data
const featuredNews = [
  ...latestNews.slice(0, 2),
  ...regulations.slice(0, 1),
  ...communityGuides.slice(0, 2)
].map(item => ({
  id: item.id,
  title: item.title,
  category: item.category.name,
  image: item.thumbnailUrl || "https://via.placeholder.com/600x400?text=News+Image",
  date: new Date(item.date_updated).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
  slug: `/${item.category.slug}/${item.slug}`
}));

// Combine all news items for latest news
const allNewsItems = [
  ...latestNews,
  ...communityGuides,
  ...regulations,
  ...procedures,
  ...professionalGuides,
  ...research
];

// Sort by date (newest first) and take the top 5
const recentPosts = allNewsItems
  .sort((a, b) => new Date(b.date_updated).getTime() - new Date(a.date_updated).getTime())
  .slice(0, 5)
  .map(item => ({
    id: item.id,
    title: item.title,
    category: item.category.name,
    date: new Date(item.date_updated).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
    slug: `/${item.category.slug}/${item.slug}`
  }));

// Small Calendar icon component for the date
const CalendarIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const FeaturedNewsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const maxIndex = featuredNews.length - 1;
  const slideInterval = 7000; // 7 seconds per slide
  
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };
  
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setProgress(0); // Reset progress when manually changing slides
  };

  useEffect(() => {
    // Auto-advance slides
    const timer = setInterval(() => {
      nextSlide();
    }, slideInterval);

    // Progress bar animation
    const progressInterval = 100; // Update progress every 100ms
    const progressStep = (progressInterval / slideInterval) * 100;
    
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + progressStep;
        return newProgress >= 100 ? 0 : newProgress;
      });
    }, progressInterval);
    
    // Cleanup both timers
    return () => {
      clearInterval(timer);
      clearInterval(progressTimer);
    };
  }, [currentIndex]);

  // Reset progress when currentIndex changes
  useEffect(() => {
    setProgress(0);
  }, [currentIndex]);

  // Fallback image for error handling
  const fallbackImage = "https://via.placeholder.com/600x400?text=News+Image";

  return (
    <section className="pt-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-1.5 h-7 bg-pccc-primary mr-3 rounded-sm"></div>
            <h2 className="text-2xl font-bold text-pccc-dark dark:text-white">Tin tức nổi bật trong tuần</h2>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={prevSlide}
              className="p-2.5 rounded-full bg-white border border-pccc-light text-pccc-primary hover:bg-pccc-primary hover:text-white hover:border-pccc-primary transition-all duration-300"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2.5 rounded-full bg-white border border-pccc-light text-pccc-primary hover:bg-pccc-primary hover:text-white hover:border-pccc-primary transition-all duration-300"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="border border-gray-100 dark:border-gray-700 rounded-xl p-4 bg-white/50 dark:bg-gray-800/50">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Main featured news slider - left side (2/3 width on large screens) */}
            <div className="lg:col-span-2">
              <div className="space-y-3 rounded-xl p-5 bg-white dark:bg-gray-800 h-full flex flex-col">
                <div className="relative overflow-hidden rounded-xl aspect-[16/9] flex-grow mb-1">
                  {featuredNews.map((news, index) => (
                    <Link 
                      key={news.id} 
                      to={news.slug}
                      className={`block absolute inset-0 transition-opacity duration-700 ${
                        index === currentIndex 
                          ? 'opacity-100 z-10' 
                          : 'opacity-0 z-0'
                      }`}
                    >
                      <div className="relative h-full">
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
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-8">
                          <Badge variant="secondary" className="mb-3 w-fit font-medium">{news.category}</Badge>
                          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3">{news.title}</h3>
                          <div className="flex items-center text-gray-300">
                            <CalendarIcon className="h-4 w-4 mr-2" />
                            <span>{news.date}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                  
                  {/* Progress bar at the bottom of the main carousel */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-300/30">
                    <div 
                      className="h-full bg-gray-400 transition-all duration-100 ease-linear"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Horizontal thumbnail carousel indicators */}
                <div className="flex overflow-x-auto space-x-3 py-3 px-1 no-scrollbar">
                  {featuredNews.map((news, index) => (
                    <div 
                      key={news.id} 
                      className={`flex-shrink-0 cursor-pointer transition-all duration-300 ${
                        index === currentIndex
                          ? 'opacity-100 transform scale-105'
                          : 'opacity-75 hover:opacity-90'
                      }`}
                      onClick={() => goToSlide(index)}
                    >
                      <div className={`relative w-28 h-16 md:w-36 md:h-20 rounded-lg overflow-hidden ${
                        index === currentIndex ? 'ring-2 ring-gray-500' : 'ring-1 ring-gray-200'
                      }`}>
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
                        {index === currentIndex && (
                          <>
                            <div className="absolute inset-0 bg-gray-500/10"></div>
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-500"></div>
                          </>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 h-5 bg-gradient-to-t from-black/60 to-transparent"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Latest news section - right side (1/3 width on large screens) */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700 h-full flex flex-col">
                <h3 className="text-lg font-bold mb-4 border-b border-gray-100 dark:border-gray-700 pb-3 text-pccc-dark dark:text-white">Bài đăng gần nhất</h3>
                <div className="space-y-4 flex-grow">
                  {recentPosts.map((news) => (
                    <Card key={news.id} className="bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:shadow-sm dark:hover:shadow-gray-700/50 transition-shadow duration-300">
                      <CardContent className="p-4">
                        <Link to={news.slug} className="block hover:text-pccc-primary transition-colors duration-300">
                          <div className="flex flex-col">
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 uppercase">{news.category}</span>
                            <h4 className="text-sm font-semibold line-clamp-2 mb-1.5 dark:text-gray-200 hover:text-pccc-primary dark:hover:text-pccc-primary transition-colors">{news.title}</h4>
                            <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center">
                              <CalendarIcon className="h-3 w-3 mr-1" />
                              {news.date}
                            </span>
                          </div>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedNewsCarousel;
