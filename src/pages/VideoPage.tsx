
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VideoCard from '@/components/VideoCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { videos } from '@/data/mockData';

const VideoPage = () => {
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VideoPage;
