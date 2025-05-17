
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import NewsCard from '@/components/NewsCard';
import { 
  latestNews, 
  communityGuides, 
  regulations, 
  procedures, 
  professionalGuides, 
  research, 
  videos 
} from '@/data/mockData';

const getCategoryData = (category: string) => {
  switch (category) {
    case 'tin-tuc':
      return { title: 'Tin tức PCCC', data: latestNews };
    case 'huong-dan-cong-dong':
      return { title: 'Hướng dẫn cộng đồng', data: communityGuides };
    case 'van-ban-phap-quy':
      return { title: 'Văn bản pháp quy', data: regulations };
    case 'thu-tuc-hanh-chinh':
      return { title: 'Thủ tục hành chính', data: procedures };
    case 'huong-dan-nghiep-vu':
      return { title: 'Hướng dẫn nghiệp vụ', data: professionalGuides };
    case 'nghien-cuu-trao-doi':
      return { title: 'Nghiên cứu - Trao đổi', data: research };
    default:
      return { title: 'Danh mục', data: [] };
  }
};

const NewsCategory = () => {
  const { category } = useParams<{ category: string }>();
  const { title, data } = getCategoryData(category || '');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <SearchBar />
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-pccc-dark">{title}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.map((item) => (
              <NewsCard key={item.id} news={item} showExcerpt={true} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewsCategory;
