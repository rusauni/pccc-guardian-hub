import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export interface NewsItem {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  thumbnailUrl: string;
  summary: string;
  date_updated: string;
  category: {
    name: string;
    slug: string;
    id: number;
  };
}

interface NewsCardProps {
  news: NewsItem;
  showExcerpt?: boolean;
}

const NewsCard = ({ news, showExcerpt = false }: NewsCardProps) => {
  // Sử dụng ảnh placeholder nếu thumbnailUrl không tồn tại hoặc bị lỗi
  const fallbackImage = "https://via.placeholder.com/400x300?text=News+Thumbnail";
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <Card className="overflow-hidden transition-colors hover:bg-accent/50">
      <Link to={`/${news.category.slug}/${news.slug}`} className="block focus:outline-none focus-visible:ring-1 focus-visible:ring-ring">
        <AspectRatio ratio={16 / 9}>
          <img
            src={news.thumbnailUrl || fallbackImage}
            alt={news.title}
            className="object-cover w-full h-full"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = fallbackImage;
            }}
          />
        </AspectRatio>
        <CardContent className="p-4">
          <Badge variant="secondary" className="mb-2">
            {news.category.name}
          </Badge>
          <h3 className="text-lg font-semibold line-clamp-2 mb-2">{news.title}</h3>
          {showExcerpt && news.summary && (
            <p className="text-sm text-muted-foreground line-clamp-3">{news.summary}</p>
          )}
          <p className="text-sm text-muted-foreground mt-2">{formatDate(news.date_updated)}</p>
        </CardContent>
      </Link>
    </Card>
  );
};

export default NewsCard;
