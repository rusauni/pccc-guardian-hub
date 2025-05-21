import { Play } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';

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

interface VideoItem {
  id: number;
  title: string;
  thumbnail: string;
  thumbnailUrl: string;
  date_updated: string;
  slug: string;
  category: {
    name: string;
    slug: string;
    id: number;
  };
}

interface VideoCardProps {
  video: VideoItem;
}

const VideoCard = ({ video }: VideoCardProps) => {
  // Sử dụng ảnh placeholder nếu thumbnail không tồn tại hoặc bị lỗi
  const fallbackImage = "https://via.placeholder.com/400x300?text=Video+Thumbnail";
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };
  
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md dark:hover:shadow-pccc-primary/20 border border-gray-100 dark:border-gray-700 bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 rounded-xl">
      <CardContent className="p-0">
        <Link to={`/video/${video.slug}`}>
          <div className="relative">
            <img
              src={video.thumbnailUrl || fallbackImage}
              alt={video.title}
              className="w-full h-48 object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = fallbackImage;
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-all">
              <div className="bg-pccc-primary hover:bg-pccc-primary/90 rounded-full p-3 text-white transform hover:scale-110 transition-all duration-300 shadow-lg">
                <Play className="h-8 w-8" />
              </div>
            </div>
          </div>
          <div className="p-5">
            <Badge variant="secondary" className="mb-2.5 font-medium">
              {video.category.name}
            </Badge>
            <h3 className="text-lg font-semibold line-clamp-2 mb-3 hover:text-pccc-primary transition-colors">{video.title}</h3>
            <div className="flex items-center text-sm text-gray-400">
              <CalendarIcon className="h-3.5 w-3.5 mr-1.5" />
              <span>{formatDate(video.date_updated)}</span>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
