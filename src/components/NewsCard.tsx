import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";

// Calendar icon component
const CalendarIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

export interface NewsItem {
  id: string | number;
  title: string;
  slug: string;
  thumbnail?: string;
  thumbnailUrl?: string;
  summary: string;
  date?: string;
  date_created?: string;
  date_updated?: string;
  content?: any; // EditorJS content
  category: {
    name: string;
    slug: string;
    id?: number;
  };
}

interface NewsCardProps {
  news: NewsItem;
  showExcerpt?: boolean;
}

const NewsCard = ({ news, showExcerpt = false }: NewsCardProps) => {
  // Sử dụng ảnh placeholder nếu thumbnailUrl không tồn tại hoặc bị lỗi
  const fallbackImage = "https://img.cand.com.vn/resize/800x800/NewFiles/Images/2022/08/05/2_cuoi_02-1659668776146.jpg";
  
  // Format date with fallback handling
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    
    try {
      // Parse the ISO 8601 date string
      const date = new Date(dateString);
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        console.warn('Invalid date string:', dateString);
        return 'N/A';
      }
      
      // Convert to Vietnam timezone (UTC+7)
      const options: Intl.DateTimeFormatOptions = { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric',
        timeZone: 'Asia/Ho_Chi_Minh'
      };
      
      return date.toLocaleDateString('vi-VN', options);
    } catch (error) {
      console.error('Error formatting date:', error, 'Date string:', dateString);
      return 'N/A';
    }
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md dark:hover:shadow-pccc-primary/20 border border-gray-100 dark:border-gray-700 bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 rounded-xl">
      <CardContent className="p-0">
        <Link to={`/${news.category.slug}/${news.slug}`}>
          <div className="relative">
            <AspectRatio ratio={16 / 9}>
              <img
                src={news.thumbnail || news.thumbnailUrl || fallbackImage}
                alt={news.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = fallbackImage;
                }}
              />
            </AspectRatio>
          </div>
          <div className="p-5">
            <Badge variant="secondary" className="mb-2.5 font-medium">
              {news.category.name}
            </Badge>
            <h3 className="text-lg font-semibold line-clamp-2 mb-3 hover:text-pccc-primary transition-colors">{news.title}</h3>
            {showExcerpt && news.summary && (
              <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{news.summary}</p>
            )}
            <div className="flex items-center text-sm text-gray-400">
              <CalendarIcon className="h-3.5 w-3.5 mr-1.5" />
              <span>{formatDate(news.date_created || news.date_updated)}</span>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
