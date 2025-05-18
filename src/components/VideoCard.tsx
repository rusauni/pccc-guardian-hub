import { Play } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';

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
    <Card className="overflow-hidden transition-colors hover:bg-accent/50">
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
              <div className="bg-pccc-primary bg-opacity-80 rounded-full p-3 text-white">
                <Play className="h-8 w-8" />
              </div>
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold line-clamp-2">{video.title}</h3>
            <p className="text-sm text-gray-500 mt-2">{formatDate(video.date_updated)}</p>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
