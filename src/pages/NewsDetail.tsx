import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { 
  latestNews, 
  communityGuides, 
  regulations, 
  procedures, 
  professionalGuides, 
  research 
} from '@/data/mockData';
import NewsCard, { NewsItem } from '@/components/NewsCard';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const allNews = [
  ...latestNews,
  ...communityGuides,
  ...regulations,
  ...procedures,
  ...professionalGuides,
  ...research,
];

const NewsDetail = () => {
  const { category, id } = useParams<{ category: string; id: string }>();
  const [article, setArticle] = useState<NewsItem | null>(null);
  const [relatedNews, setRelatedNews] = useState<NewsItem[]>([]);
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };
  
  useEffect(() => {
    // Find the current article by matching the slug with the route parameter
    const currentArticle = allNews.find(item => 
      item.slug === id && item.category.slug === category
    );
    
    if (currentArticle) {
      setArticle(currentArticle);
      
      // Find related news from the same category
      const related = allNews
        .filter(item => 
          item.category.slug === currentArticle.category.slug && 
          item.id !== currentArticle.id
        )
        .slice(0, 3);
        
      setRelatedNews(related);
    }
  }, [category, id]);
  
  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Breadcrumbs />
        <main className="flex-grow py-10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold">Bài viết không tồn tại</h1>
            <Link to="/" className="text-pccc-primary hover:underline mt-4 inline-block">
              Quay lại trang chủ
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Breadcrumbs />
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <img 
                    src={article.thumbnailUrl} 
                    alt={article.title} 
                    className="w-full h-[400px] object-cover"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <Badge variant="secondary">{article.category.name}</Badge>
                      <span className="text-sm text-gray-500">{formatDate(article.date_updated)}</span>
                    </div>
                    <h1 className="text-3xl font-bold mb-6">{article.title}</h1>
                    
                    <div className="prose max-w-none">
                      <p className="text-lg mb-6">
                        {article.summary}
                      </p>
                      
                      <p className="mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis justo ut massa vestibulum, 
                        non convallis eros mattis. Nulla facilisi. Donec sagittis sapien ac elit ultrices, 
                        a sodales dui lacinia. Suspendisse potenti. Pellentesque et tortor turpis. 
                        Fusce vitae tempor odio, eget facilisis eros. Integer sit amet sodales neque, 
                        sit amet interdum diam. Praesent ut tempus ante.
                      </p>
                      
                      <h2 className="text-xl font-bold my-4">Các biện pháp an toàn PCCC</h2>
                      
                      <p className="mb-4">
                        Cras commodo posuere massa, vitae fringilla nulla vehicula ac. 
                        Donec ipsum velit, aliquam nec iaculis at, sodales vel eros. 
                        Morbi fermentum, lacus sit amet aliquam interdum, lacus risus interdum felis, 
                        sed faucibus nulla risus eget nulla.
                      </p>
                      
                      <ul className="list-disc pl-5 mb-4">
                        <li className="mb-2">Kiểm tra hệ thống PCCC định kỳ</li>
                        <li className="mb-2">Lắp đặt thiết bị báo cháy</li>
                        <li className="mb-2">Sử dụng vật liệu chống cháy</li>
                        <li className="mb-2">Tập huấn kỹ năng PCCC cho cư dân</li>
                      </ul>
                      
                      <p className="mb-4">
                        Vivamus hendrerit varius arcu, eget ultricies magna rutrum sed. 
                        Nulla facilisi. Aliquam erat volutpat. Pellentesque at feugiat mauris. 
                        Maecenas tempus nisi ut nulla lacinia, a porta lectus commodo. 
                        Aliquam non magna vel lectus ultrices dapibus vel in justo.
                      </p>
                      
                      <p className="mb-4">
                        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                        Maecenas lorem nisi, ultrices id lacinia id, eleifend eget libero. 
                        Sed facilisis, velit ac tempor volutpat, dolor arcu aliquam risus, 
                        sed imperdiet orci ex vitae arcu.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Sidebar */}
            <div>
              <Card className="mb-6">
                <CardContent className="p-4">
                  <h3 className="text-xl font-bold mb-4">Bài viết liên quan</h3>
                  <div className="space-y-4">
                    {relatedNews.map(newsItem => (
                      <div key={newsItem.id} className="border-b pb-4 last:border-0">
                        <h4 className="font-semibold mb-1">
                          <Link 
                            to={`/${newsItem.category.slug}/${newsItem.slug}`} 
                            className="hover:text-pccc-primary"
                          >
                            {newsItem.title}
                          </Link>
                        </h4>
                        <p className="text-sm text-gray-500">{formatDate(newsItem.date_updated)}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-xl font-bold mb-4">Danh mục tin</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link to="/tin-tuc-pccc" className="text-gray-700 hover:text-pccc-primary">Tin tức PCCC</Link>
                    </li>
                    <li>
                      <Link to="/huong-dan-cong-dong" className="text-gray-700 hover:text-pccc-primary">Hướng dẫn cộng đồng</Link>
                    </li>
                    <li>
                      <Link to="/van-ban-phap-quy" className="text-gray-700 hover:text-pccc-primary">Văn bản pháp quy</Link>
                    </li>
                    <li>
                      <Link to="/thu-tuc-hanh-chinh" className="text-gray-700 hover:text-pccc-primary">Thủ tục hành chính</Link>
                    </li>
                    <li>
                      <Link to="/huong-dan-nghiep-vu" className="text-gray-700 hover:text-pccc-primary">Hướng dẫn nghiệp vụ</Link>
                    </li>
                    <li>
                      <Link to="/nghien-cuu-trao-doi" className="text-gray-700 hover:text-pccc-primary">Nghiên cứu - Trao đổi</Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewsDetail;
