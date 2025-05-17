
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
  return (
    <Card className="news-card h-full">
      <CardContent className="p-0">
        <Link to={news.slug}>
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-48 object-cover"
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
