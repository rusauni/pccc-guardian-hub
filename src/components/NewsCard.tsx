
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface NewsItem {
  id: number;
  title: string;
  category: string;
  image: string;
  date: string;
  excerpt?: string;
  slug: string;
}

interface NewsCardProps {
  news: NewsItem;
  showExcerpt?: boolean;
}

const NewsCard = ({ news, showExcerpt = false }: NewsCardProps) => {
  // Sử dụng ảnh placeholder nếu image không tồn tại hoặc bị lỗi
  const fallbackImage = "https://via.placeholder.com/400x300?text=News+Thumbnail";

  return (
    <Card className="news-card h-full hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <Link to={news.slug}>
          <img
            src={news.image || fallbackImage}
            alt={news.title}
            className="w-full h-48 object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = fallbackImage;
            }}
          />
          <div className="p-4">
            <Badge variant="secondary" className="mb-2">
              {news.category}
            </Badge>
            <h3 className="text-lg font-semibold line-clamp-2">{news.title}</h3>
            {showExcerpt && news.excerpt && (
              <p className="mt-2 text-sm text-gray-600 line-clamp-3">{news.excerpt}</p>
            )}
            <p className="text-sm text-gray-500 mt-2">{news.date}</p>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
