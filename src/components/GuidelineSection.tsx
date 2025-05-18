import NewsCard, { NewsItem } from "./NewsCard";

interface GuidelineSectionProps {
  title: string;
  news: NewsItem[];
}

const GuidelineSection = ({ title, news }: GuidelineSectionProps) => {
  return (
    <section className="guideline-section container mx-auto px-4 pb-10">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-pccc-dark">{title}</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {news.map((item) => (
          <NewsCard key={item.id} news={item} />
        ))}
      </div>
    </section>
  );
};

export default GuidelineSection; 