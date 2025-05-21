import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GuidelineSection from '@/components/GuidelineSection';
import { NewsItem } from '@/components/NewsCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const ProceduresPage = () => {
  // Mock data for administrative procedures
  const procedures: NewsItem[] = Array.from({ length: 10 }, (_, i) => ({
    id: 500 + i,
    title: procedureTitles[i],
    slug: `thu-tuc-hanh-chinh-${i + 1}`,
    thumbnail: "administrative-procedure",
    thumbnailUrl: "https://images.unsplash.com/photo-1599353229998-484ff1334dfd",
    summary: `Hướng dẫn chi tiết về ${procedureTitles[i].toLowerCase()} theo quy định mới nhất của Bộ Công an.`,
    date_created: `2025-${(i + 1).toString().padStart(2, '0')}-01T08:00:00.000Z`,
    category: {
      name: "Thủ tục hành chính",
      slug: "thu-tuc-hanh-chinh",
      id: 4
    }
  }));

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <Breadcrumbs />
      <main className="flex-grow pt-8 bg-white dark:bg-gray-900">
        {/* Administrative Procedures Section */}
        <GuidelineSection 
          title="Thủ tục hành chính" 
          news={procedures}
        />
      </main>
      <Footer />
    </div>
  );
};

// Administrative procedure titles
const procedureTitles = [
  "Hồ sơ thủ tục xin cấp phép PCCC cho công trình",
  "Mẫu đơn xin cấp giấy chứng nhận đủ điều kiện về PCCC",
  "Quy trình gia hạn giấy phép an toàn PCCC",
  "Thủ tục đăng ký huấn luyện nghiệp vụ PCCC",
  "Quy trình xin cấp phép kinh doanh thiết bị PCCC",
  "Thủ tục cấp đổi giấy chứng nhận huấn luyện PCCC",
  "Hồ sơ thanh tra an toàn PCCC định kỳ",
  "Thủ tục đăng ký tổ chức huấn luyện PCCC",
  "Quy trình nghiệm thu hệ thống PCCC công trình",
  "Thủ tục xin cấp giấy phép xây dựng có yêu cầu PCCC"
];

export default ProceduresPage; 