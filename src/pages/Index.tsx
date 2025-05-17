
import Banner from '@/components/Banner';
import CategorySection from '@/components/CategorySection';
import FeaturedNewsCarousel from '@/components/FeaturedNewsCarousel';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import VideoCard from '@/components/VideoCard';
import { latestNews, communityGuides, regulations, videos, procedures, professionalGuides, research } from '@/data/mockData';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Banner Section */}
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
            <a href="/video" className="text-pccc-primary hover:underline flex items-center gap-1">
              Xem tất cả <span>→</span>
            </a>
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
