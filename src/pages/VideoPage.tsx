
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VideoCard from '@/components/VideoCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { videos } from '@/data/mockData';

const VideoPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Breadcrumbs />
      <main className="flex-grow py-10">
        <div className="container">
          <div className="flex items-center mb-8 space-x-3">
            <div className="w-1 h-6 bg-primary rounded-full"></div>
            <h1 className="text-3xl font-bold tracking-tight">Video kỹ năng PCCC</h1>
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
