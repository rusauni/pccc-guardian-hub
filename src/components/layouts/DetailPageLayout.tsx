import { ReactNode } from 'react';
import { Breadcrumbs } from '../Breadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EditorContent } from '@/components/EditorContent/EditorContent';
import { Link } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Footer from '../Footer';

interface DetailPageLayoutProps {
  children?: ReactNode;
  showBreadcrumbs?: boolean;
  article?: {
    title?: string;
    thumbnailUrl?: string;
    category?: {
      name: string;
      slug: string;
    };
    date_created?: string;
    content?: any;
    summary?: string;
  };
  relatedNews?: Array<{
    id: number;
    title: string;
    slug: string;
    category: {
      name: string;
      slug: string;
    };
    date_created: string;
  }>;
  categories?: Array<{
    name: string;
    slug: string;
  }>;
  isLoading?: boolean;
  error?: string | null;
}

// Format date helper function
const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const DetailPageLayout = ({ 
  children, 
  showBreadcrumbs = true,
  article,
  relatedNews = [],
  categories = [],
  isLoading = false,
  error = null
}: DetailPageLayoutProps) => {
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        {showBreadcrumbs && <Breadcrumbs />}
        <main className="flex-grow py-10">
          <div className="container mx-auto px-4">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="h-96 bg-gray-200 rounded"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        {showBreadcrumbs && <Breadcrumbs />}
        <main className="flex-grow py-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <Badge variant="secondary">
                          Thông báo
                        </Badge>
                      </div>
                      <h1 className="text-3xl font-bold mb-6">Không thể tải nội dung</h1>
                      
                      <div className="prose max-w-none">
                        <p className="text-lg mb-6">
                          {error}
                        </p>
                        <Link to="/" className="text-pccc-primary hover:underline mt-4 inline-block">
                          Quay lại trang chủ
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // If we have an article, display it with the EditorContent component
  if (article) {
    const formattedDate = article.date_created ? formatDate(article.date_created) : '';
    
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        {showBreadcrumbs && <Breadcrumbs />}
        <main className="flex-grow py-10 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main content */}
              <div className="lg:col-span-2">
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    {article.thumbnailUrl && (
                      <img 
                        src={article.thumbnailUrl} 
                        alt={article.title} 
                        className="w-full h-[400px] object-cover"
                      />
                    )}
                    <div className="p-6 dark:bg-gray-900 dark:text-white">
                      <div className="flex justify-between items-center mb-4">
                        <Badge variant="secondary">
                          {article.category?.name || 'Tin tức PCCC'}
                        </Badge>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {formattedDate}
                        </span>
                      </div>
                      
                      <div className="prose max-w-none dark:prose-invert">
                        {article.content ? (
                          <EditorContent content={article.content} className="mt-6" />
                        ) : (
                          <p className="text-lg mb-6">
                            {article.summary || 'Nội dung đang được cập nhật...'}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Right Sidebar */}
              <div className="space-y-6">
                {/* Related Articles */}
                {relatedNews.length > 0 && (
                  <Card className="dark:bg-gray-900 dark:border-gray-800">
                    <CardContent className="p-4">
                      <h3 className="text-lg font-bold mb-4 pb-2 border-b dark:border-gray-700 dark:text-white">Bài viết liên quan</h3>
                      <div className="space-y-4">
                        {relatedNews.map((item, index) => (
                          <div key={item.id} className="pb-3 border-b dark:border-gray-700 last:border-0">
                            <Link 
                              to={`/${item.category.slug}/${item.slug}`}
                              className="text-sm font-medium dark:text-white hover:text-blue-600 dark:hover:text-blue-400 line-clamp-2"
                            >
                              {item.title}
                            </Link>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{formatDate(item.date_created)}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {/* Categories */}
                {categories.length > 0 && (
                  <Card className="dark:bg-gray-900 dark:border-gray-800">
                    <CardContent className="p-4">
                      <h3 className="text-lg font-bold mb-4 pb-2 border-b dark:border-gray-700 dark:text-white">Danh mục</h3>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <div key={category.slug}>
                            <Link 
                              to={`/${category.slug}`}
                              className="text-sm dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                            >
                              {category.name}
                            </Link>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Default layout if no article is provided
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {showBreadcrumbs && <Breadcrumbs />}
      <main className="flex-grow py-12 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default DetailPageLayout;
