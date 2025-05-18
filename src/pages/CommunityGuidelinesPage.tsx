import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GuidelineSection from '@/components/GuidelineSection';
import { NewsItem } from '@/components/NewsCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const CommunityGuidelinesPage = () => {
  // Mock data for community guidelines
  const communityGuidelines: NewsItem[] = Array.from({ length: 10 }, (_, i) => ({
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Breadcrumbs />
      <main className="flex-grow pt-8">
        {/* Community Guidelines Section */}
        <GuidelineSection 
          title="Hướng dẫn cộng đồng" 
          news={communityGuidelines}
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
  "Kiến thức cơ bản về nguyên nhân gây cháy và cách phòng tránh",
  "Hướng dẫn sơ cứu nạn nhân trong vụ cháy",
  "Biện pháp phòng cháy cho khu chung cư cao tầng",
  "Chuẩn bị túi thoát hiểm khi xảy ra hỏa hoạn",
  "Các kỹ năng thoát nạn khi gặp khói và lửa",
  "Hướng dẫn sử dụng thang dây thoát hiểm",
  "An toàn PCCC khi sử dụng thiết bị điện trong gia đình"
];

export default CommunityGuidelinesPage; 