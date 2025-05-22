import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_BASE, ENDPOINTS, getAssetUrl } from '@/config/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import DetailPageLayout from '@/components/layouts/DetailPageLayout';
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
import { EditorContent } from '@/components/EditorContent/EditorContent';
import { getPostsByCategorySlug, Post } from '@/repository/GetPostByCategorySlug';

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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Format date to DD/MM/YYYY
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setIsLoading(true);
        // First try to find in mock data
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
        } else {
          // If not found in mock data, try to fetch from API
          const response = await fetch(
            `${API_BASE}/items/articles?filter[slug][_eq]=${id}&fields=*,category.name,category.slug,category.id`
          );
          
          if (response.ok) {
            const data = await response.json();
            if (data.data && data.data.length > 0) {
              const articleData = data.data[0];
              // Transform API data to match our NewsItem type
              const formattedArticle: NewsItem = {
                ...articleData,
                thumbnailUrl: getAssetUrl(articleData.thumbnail),
                date_created: articleData.date_created || new Date().toISOString(),
                category: articleData.category || { id: 0, name: 'Tin tức', slug: 'tin-tuc' }
              };
              setArticle(formattedArticle);
              
              // Fetch related articles from the same category (up to 5)
              if (formattedArticle.category?.slug) {
                try {
                  const relatedPosts = await getPostsByCategorySlug(formattedArticle.category.slug);
                  
                  // Filter out the current article and limit to 5 posts
                  const filteredRelated = relatedPosts
                    .filter(post => post.id !== formattedArticle.id)
                    .slice(0, 5);
                  
                  // Transform Post[] to NewsItem[] ensuring id is always a number
                  const relatedNewsItems = filteredRelated.map(post => ({
                    id: post.id, // This is guaranteed to be a number from the Post interface
                    title: post.title,
                    slug: post.slug,
                    thumbnail: post.thumbnail || '',
                    thumbnailUrl: post.thumbnailUrl,
                    summary: post.summary || '',
                    date_created: post.date_created,
                    category: post.category
                  }));
                  
                  setRelatedNews(relatedNewsItems);
                } catch (error) {
                  console.error('Error fetching related posts:', error);
                  setRelatedNews([]);
                }
              } else {
                setRelatedNews([]);
              }
            }
          }
        }
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [category, id]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Breadcrumbs />
        <main className="flex-grow py-10">
          <div className="container mx-auto px-4">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="h-96 bg-gray-200 rounded"></div>
              <div className="space-y-6 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
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

  // Define categories for the sidebar
  const categories = [
    { name: 'Tin tức PCCC', slug: 'tin-tuc-pccc' },
    { name: 'Hướng dẫn cộng đồng', slug: 'huong-dan-cong-dong' },
    { name: 'Văn bản pháp quy', slug: 'van-ban-phap-quy' },
    { name: 'Thủ tục hành chính', slug: 'thu-tuc-hanh-chinh' },
    { name: 'Hướng dẫn nghiệp vụ', slug: 'huong-dan-nghiep-vu' },
    { name: 'Nghiên cứu - Trao đổi', slug: 'nghien-cuu-trao-doi' }
  ];

  return (
    <DetailPageLayout
      article={article}
      relatedNews={relatedNews}
      categories={categories}
      isLoading={isLoading}
      error={null}
    />
  );
};

export default NewsDetail;
