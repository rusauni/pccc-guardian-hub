import Banner from '@/components/Banner';
import CategorySection from '@/components/CategorySection';
import FeaturedNewsCarousel from '@/components/FeaturedNewsCarousel';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import VideoSection from '@/components/VideoSection';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        {/* Simple Banner Section - No Carousel */}
        <Banner />
        
        {/* Featured News Carousel with Latest News */}
        <FeaturedNewsCarousel />
        
        {/* PCCC News Section */}
        <CategorySection 
          title="Tin Tức PCCC" 
          categorySlug="tin-tuc-pccc"
          categoryUrl="/tin-tuc-pccc" 
        />
        
        {/* Community Guides Section */}
        <CategorySection 
          title="Hướng dẫn cộng đồng" 
          categorySlug="huong-dan-cong-dong"
          categoryUrl="/huong-dan-cong-dong" 
        />
        
        {/* Research & Discussion Section */}
        <CategorySection 
          title="Nghiên cứu - Trao đổi" 
          categorySlug="nghien-cuu-trao-doi"
          categoryUrl="/nghien-cuu-trao-doi" 
        />
        
        {/* Videos Section */}
        <VideoSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
