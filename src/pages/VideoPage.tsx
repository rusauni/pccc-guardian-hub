
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import VideoCard from '@/components/VideoCard';
import { videos } from '@/data/mockData';

const VideoPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <SearchBar />
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-pccc-dark">Video kỹ năng PCCC</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
