import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategorySection from '@/components/CategorySection';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const GuidelinesPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <Breadcrumbs />
      <main className="flex-grow py-4 bg-white dark:bg-gray-900">
        {/* Community Guidelines Section */}
        <CategorySection 
          title="Hướng dẫn cộng đồng" 
          categorySlug="huong-dan-cong-dong"
          categoryUrl="/huong-dan-cong-dong" 
          limit={4}
        />
        
        {/* Professional Skills Section */}
        <CategorySection 
          title="Hướng dẫn nghiệp vụ" 
          categorySlug="huong-dan-nghiep-vu"
          categoryUrl="/huong-dan-nghiep-vu" 
          limit={4}
        />
      </main>
      <Footer />
    </div>
  );
};

export default GuidelinesPage;