import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import VideoCard from '@/components/VideoCard';
import { videos } from '@/data/mockData';
import { Card, CardContent } from '@/components/ui/card';

const VideoDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [video, setVideo] = useState<any>(null);
  const [relatedVideos, setRelatedVideos] = useState<any[]>([]);
  
  useEffect(() => {
    // Find the current video
    const currentVideo = videos.find(item => item.slug === `/video/${id}`);
    
    if (currentVideo) {
      setVideo(currentVideo);
      
      // Find related videos (except current)
      const related = videos
        .filter(item => item.id !== currentVideo.id)
        .slice(0, 3);
        
      setRelatedVideos(related);
    }
  }, [id]);
  
  if (!video) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold">Video không tồn tại</h1>
            <Link to="/video" className="text-pccc-primary hover:underline mt-4 inline-block">
              Quay lại trang video
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Breadcrumbs />
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="aspect-video mb-4">
                    <iframe 
                      className="w-full h-full" 
                      src={`https://www.youtube.com/embed/${video.youtubeId}`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  
                  <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">{video.title}</h1>
                    <span className="text-sm text-gray-500">{video.date}</span>
                  </div>
                  
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      Mô tả chi tiết về video kỹ năng PCCC này. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                      Nulla facilisi. Sed sit amet metus vel nisi fermentum facilisis. 
                      Proin varius libero ac mi commodo, at fringilla nibh tristique. 
                      Nam ut tristique mauris, vel tristique est.
                    </p>
                    
                    <h2 className="text-xl font-bold mt-6 mb-4">Nội dung video</h2>
                    
                    <p className="mb-4">
                      Video này hướng dẫn chi tiết các kỹ năng quan trọng trong phòng cháy chữa cháy. 
                      Phasellus ullamcorper, nisl id tincidunt sagittis, felis ipsum finibus nisi, 
                      ut tincidunt nulla turpis vel neque. Vestibulum tempus lorem in ligula tempor dictum. 
                    </p>
                    
                    <ul className="list-disc pl-5 mb-4">
                      <li className="mb-2">Kỹ năng đánh giá tình huống khẩn cấp</li>
                      <li className="mb-2">Phương pháp sử dụng thiết bị chữa cháy</li>
                      <li className="mb-2">Quy trình sơ tán an toàn</li>
                      <li className="mb-2">Cách xử lý các tình huống đặc biệt</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Sidebar */}
            <div>
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Video liên quan</h3>
                <div className="space-y-4">
                  {relatedVideos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </div>
              </div>
              
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-xl font-bold mb-4">Danh mục khác</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link to="/tin-tuc" className="text-gray-700 hover:text-pccc-primary">Tin tức PCCC</Link>
                    </li>
                    <li>
                      <Link to="/huong-dan-cong-dong" className="text-gray-700 hover:text-pccc-primary">Hướng dẫn cộng đồng</Link>
                    </li>
                    <li>
                      <Link to="/van-ban-phap-quy" className="text-gray-700 hover:text-pccc-primary">Văn bản pháp quy</Link>
                    </li>
                    <li>
                      <Link to="/thu-tuc-hanh-chinh" className="text-gray-700 hover:text-pccc-primary">Thủ tục hành chính</Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VideoDetail;
