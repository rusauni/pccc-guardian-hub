import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GuidelineSection from '@/components/GuidelineSection';
import { NewsItem } from '@/components/NewsCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const ProfessionalSkillsPage = () => {
  // Mock data for professional guidelines
  const professionalGuidelines: NewsItem[] = Array.from({ length: 10 }, (_, i) => ({
    id: 300 + i,
    title: professionalTitles[i],
    slug: `huong-dan-nghiep-vu-${i + 1}`,
    thumbnail: "professional-guide",
    thumbnailUrl: "https://images.unsplash.com/photo-1599353229998-484ff1334dfd",
    summary: `Tài liệu hướng dẫn nghiệp vụ về ${professionalTitles[i].toLowerCase()} dành cho lực lượng PCCC.`,
    date_updated: `2025-${(i + 1).toString().padStart(2, '0')}-05T11:00:00.000Z`,
    category: {
      name: "Hướng dẫn nghiệp vụ",
      slug: "huong-dan-nghiep-vu",
      id: 3
    }
  }));

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <Breadcrumbs />
      <main className="flex-grow pt-8 bg-white dark:bg-gray-900">
        {/* Professional Guidelines Section */}
        <GuidelineSection 
          title="Hướng dẫn nghiệp vụ" 
          news={professionalGuidelines}
        />
      </main>
      <Footer />
    </div>
  );
};

// Professional guideline titles
const professionalTitles = [
  "Quy trình kiểm tra an toàn PCCC tại cao ốc",
  "Kỹ thuật dập tắt đám cháy dầu và khí gas",
  "Hướng dẫn sử dụng thiết bị chữa cháy chuyên dụng",
  "Quy trình cứu nạn, cứu hộ chuyên nghiệp",
  "Kỹ thuật đánh giá rủi ro cháy nổ trong công nghiệp",
  "Hướng dẫn tổ chức diễn tập PCCC quy mô lớn",
  "Phương pháp kiểm tra, bảo dưỡng hệ thống chữa cháy tự động",
  "Quy trình vận hành trung tâm điều khiển PCCC",
  "Kỹ thuật lập đồ án thiết kế PCCC cho công trình",
  "Hướng dẫn sử dụng trang phục bảo hộ chữa cháy"
];

export default ProfessionalSkillsPage; 