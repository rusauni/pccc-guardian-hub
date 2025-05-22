import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VideoCard from '@/components/VideoCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { getVideos, Video } from '@/repository/GetVideos';
import { Loader2 } from 'lucide-react';
import { getYoutubeThumbnailUrl } from '@/utils/youtube';

const VideoPage = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const data = await getVideos();
        setVideos(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching videos:', err);
        setError('Không thể tải dữ liệu video. Vui lòng thử lại sau.');
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
      date_created: new Date().toISOString(), // Default date if not provided
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
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <Breadcrumbs />
      <main className="flex-grow py-10 bg-white dark:bg-gray-900">
        <div className="container">
          <div className="flex items-center mb-8">
            <div className="w-1.5 h-7 bg-pccc-primary mr-3 rounded-sm"></div>
            <h1 className="text-2xl font-bold text-pccc-dark dark:text-white">Video kỹ năng PCCC</h1>
          </div>
          
          {loading && (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-pccc-primary" />
              <span className="ml-2 text-gray-600">Đang tải video...</span>
            </div>
          )}
          
          {error && (
            <div className="text-center py-10">
              <p className="text-red-500">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-4 py-2 bg-pccc-primary text-white rounded hover:bg-pccc-primary/90"
              >
                Thử lại
              </button>
            </div>
          )}
          
          {!loading && !error && videos.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-600">Không có video nào.</p>
            </div>
          )}
          
          {!loading && !error && videos.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {videos.map((video) => (
                <VideoCard key={video.id || video.link} video={prepareVideoData(video)} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VideoPage;
