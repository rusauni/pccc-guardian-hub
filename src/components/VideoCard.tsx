
import { Play } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';

interface VideoItem {
  id: number;
  title: string;
  thumbnail: string;
  date: string;
  slug: string;
}

interface VideoCardProps {
  video: VideoItem;
}

const VideoCard = ({ video }: VideoCardProps) => {
  return (
    <Card className="news-card h-full">
      <CardContent className="p-0">
        <Link to={video.slug}>
          <div className="relative">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-pccc-primary bg-opacity-80 rounded-full p-3 text-white">
                <Play className="h-8 w-8" />
              </div>
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold line-clamp-2">{video.title}</h3>
            <p className="text-sm text-gray-500 mt-2">{video.date}</p>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
