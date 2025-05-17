
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
import NewsCard from '@/components/NewsCard';
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
  const [article, setArticle] = useState<any>(null);
  const [relatedNews, setRelatedNews] = useState<any[]>([]);
  
  useEffect(() => {
    // Find the current article
    const currentArticle = allNews.find(item => item.slug === `/${category}/${id}`);
    
    if (currentArticle) {
      setArticle(currentArticle);
      
      // Find related news from the same category
      const related = allNews
        .filter(item => 
          item.category === currentArticle.category && 
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
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-[400px] object-cover"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <Badge variant="secondary">{article.category}</Badge>
                      <span className="text-sm text-gray-500">{article.date}</span>
                    </div>
                    <h1 className="text-3xl font-bold mb-6">{article.title}</h1>
                    
                    <div className="prose max-w-none">
                      <p className="mb-4">
                        {article.excerpt} Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Nulla facilisi. Sed sit amet metus vel nisi fermentum facilisis. 
                        Proin varius libero ac mi commodo, at fringilla nibh tristique. 
                        Nam ut tristique mauris, vel tristique est.
                      </p>
                      
                      <p className="mb-4">
                        Morbi fermentum, lectus vel vehicula facilisis, tellus lectus finibus tortor, 
                        at commodo sem sem sed ligula. Praesent libero ligula, congue et feugiat at, 
                        scelerisque in ipsum. Vivamus ultricies orci est, eu finibus turpis pulvinar id. 
                        Donec lobortis nunc ac augue cursus, eget faucibus nisi tempor.
                      </p>
                      
                      <h2 className="text-xl font-bold mt-6 mb-4">Nguyên nhân và giải pháp</h2>
                      
                      <p className="mb-4">
                        Phasellus ullamcorper, nisl id tincidunt sagittis, felis ipsum finibus nisi, 
                        ut tincidunt nulla turpis vel neque. Vestibulum tempus lorem in ligula tempor dictum. 
                        Phasellus maximus elit vitae nisi tempor, eu ultricies mauris convallis. 
                        Quisque tempor metus eu est dictum, eu porta nunc dapibus.
                      </p>
                      
                      <p className="mb-4">
                        Nullam fermentum consectetur risus, in faucibus nisl semper vitae. 
                        Suspendisse vestibulum ipsum at tempor tempus. Phasellus sit amet accumsan quam. 
                        Mauris congue fringilla turpis in ultrices. Morbi vehicula sapien ut elit pharetra, 
                        sit amet interdum ipsum bibendum.
                      </p>
                      
                      <h2 className="text-xl font-bold mt-6 mb-4">Kết luận</h2>
                      
                      <p className="mb-4">
                        Aliquam porttitor, diam ut consectetur ullamcorper, tellus diam dignissim ipsum, 
                        non consequat nisl neque at diam. Suspendisse volutpat, felis quis lacinia fringilla, 
                        augue nulla ultrices arcu, ac convallis nisl leo in nisi. 
                        Morbi tristique diam id ex interdum, sit amet ultricies nulla dignissim.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Sidebar */}
            <div>
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Bài viết liên quan</h3>
                <div className="space-y-4">
                  {relatedNews.map((news) => (
                    <NewsCard key={news.id} news={news} />
                  ))}
                </div>
              </div>
              
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-xl font-bold mb-4">Danh mục</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link to="/tin-tuc" className="text-gray-700 hover:text-pccc-primary">Tin tức PCCC</Link>
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
                    <li>
                      <Link to="/video" className="text-gray-700 hover:text-pccc-primary">Video kỹ năng PCCC</Link>
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
