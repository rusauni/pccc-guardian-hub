
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NewsCard from '@/components/NewsCard';
import { LegalDocumentsTable } from '@/components/LegalDocumentsTable';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { 
  latestNews, 
  communityGuides, 
  regulations, 
  procedures, 
  professionalGuides, 
  research, 
  videos 
} from '@/data/mockData';
import { getCategoryBySlug, CATEGORIES } from '@/data/categories';

const getCategoryData = (categorySlug: string) => {
  // Get category from centralized data
  const category = getCategoryBySlug(categorySlug);
  const categoryName = category?.name || 'Danh mục';
  
  // Map category slug to its corresponding data
  const categoryDataMap: Record<string, any[]> = {
    'tin-tuc-pccc': latestNews,
    'huong-dan-cong-dong': communityGuides,
    'huong-dan-nghiep-vu': professionalGuides,
    'huong-dan': [...communityGuides, ...professionalGuides],
    'van-ban-phap-quy': [], // Empty data array since we'll use the table
    'thu-tuc-hanh-chinh': procedures,
    'nghien-cuu-trao-doi': research,
    'tai-lieu': [...regulations, ...research],
    'video-ky-nang-pccc': videos
  };
  
  // Return the category data or empty array if not found
  return { 
    title: categoryName, 
    data: categoryDataMap[categorySlug] || [] 
  };

};

const NewsCategory = () => {
  const { category } = useParams<{ category: string }>();
  const pathname = window.location.pathname;
  const categoryValue = pathname === '/van-ban-phap-quy' ? 'van-ban-phap-quy' : 
                      pathname === '/thu-tuc-hanh-chinh' ? 'thu-tuc-hanh-chinh' : 
                      category || '';
  const { title, data } = getCategoryData(categoryValue);
  
  // Determine if we should use the table view and which category ID to use
  const useTableView = categoryValue === 'van-ban-phap-quy' || categoryValue === 'thu-tuc-hanh-chinh';
  const tableCategory = categoryValue === 'van-ban-phap-quy' ? CATEGORIES.VAN_BAN_PHAP_QUY.id : 
                        categoryValue === 'thu-tuc-hanh-chinh' ? CATEGORIES.THU_TUC_HANH_CHINH.id : 0;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <Breadcrumbs />
      <main className="flex-grow py-10 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-8">
            <div className="w-1.5 h-7 bg-pccc-primary mr-3 rounded-sm"></div>
            <h1 className="text-2xl font-bold text-pccc-dark dark:text-white">{title}</h1>
          </div>
          
          {useTableView ? (
            <LegalDocumentsTable categoryId={tableCategory} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.map((item) => (
                <NewsCard key={item.id} news={item} showExcerpt={true} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewsCategory;
