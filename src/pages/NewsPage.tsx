import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GuidelineSection from '@/components/GuidelineSection';
import { NewsItem } from '@/components/NewsCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { getPostsByCategorySlug } from '@/repository/GetPostByCategorySlug';
import { Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NewsPage = () => {
  const { slug } = useParams<{ slug?: string }>();
  const [newsPCCC, setNewsPCCC] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchNews = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Use the slug from URL or fallback to 'tin-tuc-pccc'
      const categorySlug = slug || 'tin-tuc-pccc';
      const posts = await getPostsByCategorySlug(categorySlug);
      
      // Map the API response to match NewsItem type
      const mappedNews = posts.map(post => ({
        id: post.id.toString(),
        title: post.title,
        slug: post.slug,
        thumbnail: post.thumbnail,
        thumbnailUrl: post.thumbnailUrl,
        summary: post.summary,
        date_created: post.date_created,
        date_updated: post.date_updated,
        category: {
          name: post.category?.name || 'Tin tức PCCC',
          slug: post.category?.slug || categorySlug,
          id: post.category?.id
        }
      }));
      
      setNewsPCCC(mappedNews);
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Không thể tải dữ liệu. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [slug, retryCount]); // Refetch when slug changes or on retry

  if (isLoading && newsPCCC.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <Breadcrumbs />
        <main className="flex-grow pt-8 bg-white dark:bg-gray-900 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4 p-8 max-w-2xl text-center">
            <Loader2 className="h-12 w-12 animate-spin text-pccc-primary" />
            <h2 className="text-xl font-semibold">Đang tải dữ liệu...</h2>
            <p className="text-gray-500">Vui lòng chờ trong giây lát</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error && newsPCCC.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <Breadcrumbs />
        <main className="flex-grow pt-8 bg-white dark:bg-gray-900 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4 p-8 max-w-2xl text-center">
            <AlertCircle className="h-12 w-12 text-red-500" />
            <h2 className="text-xl font-semibold">Đã xảy ra lỗi</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
            <Button 
              onClick={() => setRetryCount(prev => prev + 1)}
              className="bg-pccc-primary hover:bg-pccc-primary/90"
            >
              Thử lại
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <Breadcrumbs />
      <main className="flex-grow bg-white dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-8">
            <div className="w-1.5 h-7 bg-pccc-primary mr-3 rounded-sm"></div>
            <h1 className="text-2xl font-bold text-pccc-dark dark:text-white">
              Tin tức PCCC
            </h1>
          </div>
          
          {isLoading && newsPCCC.length > 0 && (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-pccc-primary" />
            </div>
          )}
          
          {error && newsPCCC.length > 0 && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">
                    Có lỗi khi tải thêm dữ liệu: {error}
                  </p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mt-2 text-red-700 hover:bg-red-100"
                    onClick={() => setRetryCount(prev => prev + 1)}
                  >
                    Thử lại
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {newsPCCC.map((item) => (
              <div key={item.id} className="overflow-hidden transition-all duration-300 border border-gray-100 rounded-xl dark:border-gray-700 bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 hover:shadow-md dark:hover:shadow-pccc-primary/20">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src={item.thumbnailUrl} 
                    alt={item.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = "https://img.cand.com.vn/resize/800x800/NewFiles/Images/2022/08/05/2_cuoi_02-1659668776146.jpg";
                    }}
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
                    <span>{new Date(item.date_created).toLocaleDateString('vi-VN')}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2 h-14">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
                    {item.summary}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="inline-block bg-gray-100 dark:bg-gray-700 text-xs px-2 py-1 rounded-full">
                      {item.category?.name || 'Tin tức PCCC'}
                    </span>
                    <a 
                      href={`/tin-tuc/${item.slug}`}
                      className="text-pccc-primary hover:text-pccc-primary/80 text-sm font-medium flex items-center"
                    >
                      Xem thêm
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {newsPCCC.length === 0 && !isLoading && !error && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">Không có bài viết nào được tìm thấy.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewsPage; 