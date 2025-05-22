import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';
import VideoCard from '@/components/VideoCard';
import { getVideos, Video } from '@/repository/GetVideos';
import { getYoutubeThumbnailUrl } from '@/utils/youtube';

const VideoSection = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const data = await getVideos();
        // Limit to 4 videos for the homepage
        setVideos(data.slice(0, 4));
        setError(null);
      } catch (err) {
        console.error('Error fetching videos:', err);
        setError('Không thể tải dữ liệu video.');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Prepare video data for VideoCard component
  const prepareVideoData = (video: Video) => {
    // Get YouTube thumbnail URL from the video link
    const youtubeThumbnail = getYoutubeThumbnailUrl(video.link, 'hqdefault');
    
    return {
      id: video.id || Math.floor(Math.random() * 10000),
      title: video.title,
      thumbnail: video.thumbnail || null,
      thumbnailUrl: video.thumbnail || youtubeThumbnail,
      date_created: new Date().toISOString(),
      slug: `video-${video.id || Math.floor(Math.random() * 10000)}`,
      videoUrl: video.link,
      category: {
        name: video.category?.name || 'Video hướng dẫn',
        slug: 'video',
        id: 7
      }
    };
  };

  return (
    <section className="category-section container mx-auto px-4 pb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-pccc-dark dark:text-white">Video kỹ năng PCCC</h2>
        <Link to="/video">
          <Button variant="outline" className="flex items-center gap-2 border-pccc-primary text-pccc-primary hover:bg-pccc-light dark:border-pccc-primary dark:text-pccc-primary dark:hover:bg-pccc-primary/20">
            Xem tất cả <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
      
      {loading && (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="h-6 w-6 animate-spin text-pccc-primary" />
          <span className="ml-2 text-gray-600 dark:text-gray-400">Đang tải video...</span>
        </div>
      )}
      
      {error && (
        <div className="text-center py-6">
          <p className="text-red-500">{error}</p>
        </div>
      )}
      
      {!loading && !error && videos.length === 0 && (
        <div className="text-center py-6">
          <p className="text-gray-600 dark:text-gray-400">Không có video nào.</p>
        </div>
      )}
      
      {!loading && !error && videos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <VideoCard key={video.id || video.link} video={prepareVideoData(video)} />
          ))}
        </div>
      )}
    </section>
  );
};

export default VideoSection;
