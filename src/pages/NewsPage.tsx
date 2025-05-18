import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GuidelineSection from '@/components/GuidelineSection';
import { NewsItem } from '@/components/NewsCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const NewsPage = () => {
  // Mock data for PCCC news
  const newsPCCC: NewsItem[] = Array.from({ length: 10 }, (_, i) => ({
    id: 600 + i,
    title: newsTitles[i],
    slug: `tin-tuc-pccc-${i + 1}`,
    thumbnail: "news-pccc",
    thumbnailUrl: "https://images.unsplash.com/photo-1599353229998-484ff1334dfd",
    summary: `${newsTitles[i]}. Cập nhật thông tin mới nhất về hoạt động PCCC và các sự kiện liên quan.`,
    date_updated: `2025-${(i + 1).toString().padStart(2, '0')}-15T10:00:00.000Z`,
    category: {
      name: "Tin tức PCCC",
      slug: "tin-tuc-pccc",
      id: 1
    }
  }));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Breadcrumbs />
      <main className="flex-grow pt-8">
        {/* News PCCC Section */}
        <GuidelineSection 
          title="Tin tức PCCC" 
          news={newsPCCC}
        />
      </main>
      <Footer />
    </div>
  );
};

// News titles
const newsTitles = [
  "Tổng kết công tác PCCC năm 2025 và phương hướng nhiệm vụ năm 2026",
  "Diễn tập phương án chữa cháy và cứu nạn, cứu hộ tại các chung cư cao tầng",
  "Hội nghị sơ kết công tác PCCC 6 tháng đầu năm 2025",
  "Tập huấn nghiệp vụ PCCC cho lực lượng dân phòng",
  "Triển khai ứng dụng công nghệ mới trong công tác PCCC",
  "Tuyên truyền phổ biến kiến thức PCCC cho học sinh, sinh viên",
  "Lễ ra mắt Đội PCCC cơ sở tại các khu công nghiệp",
  "Hội thao nghiệp vụ PCCC và cứu nạn cứu hộ năm 2025",
  "Trao tặng trang thiết bị PCCC cho các khu dân cư",
  "Kỷ niệm Ngày toàn dân phòng cháy chữa cháy 04/10/2025"
];

export default NewsPage; 