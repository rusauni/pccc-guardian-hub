import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategorySection from '@/components/CategorySection';
import { NewsItem } from '@/components/NewsCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const GuidelinesPage = () => {
  // Mock data for community guidelines (subcategory 1)
  const communityGuidelines: NewsItem[] = Array.from({ length: 4 }, (_, i) => ({
    id: 200 + i,
    title: communityTitles[i],
    slug: `huong-dan-cong-dong-${i + 1}`,
    thumbnail: "community-guide",
    thumbnailUrl: "https://images.unsplash.com/photo-1599353229998-484ff1334dfd",
    summary: `Hướng dẫn chi tiết về ${communityTitles[i].toLowerCase()} cho người dân và cộng đồng.`,
    date_updated: `2025-${(i + 1).toString().padStart(2, '0')}-10T09:00:00.000Z`,
    category: {
      name: "Hướng dẫn cộng đồng",
      slug: "huong-dan-cong-dong",
      id: 2
    }
  }));

  // Mock data for professional skills (subcategory 2)
  const professionalGuidelines: NewsItem[] = Array.from({ length: 4 }, (_, i) => ({
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Breadcrumbs />
      <main className="flex-grow py-4">
        {/* Community Guidelines Section */}
        <CategorySection 
          title="Hướng dẫn cộng đồng" 
          news={communityGuidelines}
          categoryUrl="/huong-dan-cong-dong" 
        />
        
        {/* Professional Skills Section */}
        <CategorySection 
          title="Hướng dẫn nghiệp vụ" 
          news={professionalGuidelines}
          categoryUrl="/huong-dan-nghiep-vu" 
        />
      </main>
      <Footer />
    </div>
  );
};

// Community guideline titles
const communityTitles = [
  "Hướng dẫn sử dụng bình chữa cháy đúng cách",
  "Cách lựa chọn và lắp đặt thiết bị báo cháy cho hộ gia đình",
  "Lập kế hoạch thoát nạn cho gia đình khi có hỏa hoạn",
  "Kiến thức cơ bản về nguyên nhân gây cháy và cách phòng tránh"
];

// Professional guideline titles
const professionalTitles = [
  "Quy trình kiểm tra an toàn PCCC tại cao ốc",
  "Kỹ thuật dập tắt đám cháy dầu và khí gas",
  "Hướng dẫn sử dụng thiết bị chữa cháy chuyên dụng",
  "Quy trình cứu nạn, cứu hộ chuyên nghiệp"
];

export default GuidelinesPage; 