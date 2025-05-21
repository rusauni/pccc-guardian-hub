import Banner from '@/components/Banner';
import CategorySection from '@/components/CategorySection';
import FeaturedNewsCarousel from '@/components/FeaturedNewsCarousel';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import VideoCard from '@/components/VideoCard';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { latestNews, communityGuides, regulations, videos, procedures, professionalGuides, research } from '@/data/mockData';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        {/* Simple Banner Section - No Carousel */}
        <Banner />
        
        {/* Featured News Carousel with Latest News */}
        <FeaturedNewsCarousel />
        
        {/* Community Guides Section */}
        <CategorySection 
          title="Hướng dẫn cộng đồng" 
          news={communityGuides}
          categoryUrl="/huong-dan-cong-dong" 
        />
        
        {/* Regulations Section */}
        <CategorySection 
          title="Văn bản pháp quy" 
          news={regulations}
          categoryUrl="/van-ban-phap-quy" 
        />
        
        {/* Videos Section */}
        <section className="category-section container mx-auto px-4 pb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-pccc-dark">Video kỹ năng PCCC</h2>
            <Link to="/video">
              <Button variant="outline" className="flex items-center gap-2 border-pccc-primary text-pccc-primary hover:bg-pccc-light">
                Xem tất cả <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
