
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import NewsCard, { NewsItem } from "./NewsCard";
import { Button } from "@/components/ui/button";

interface CategorySectionProps {
  title: string;
  news: NewsItem[];
  categoryUrl: string;
}

const CategorySection = ({ title, news, categoryUrl }: CategorySectionProps) => {
  return (
    <section className="category-section container mx-auto px-4 pb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-pccc-dark">{title}</h2>
        <Link to={categoryUrl}>
          <Button variant="outline" className="flex items-center gap-2 border-pccc-primary text-pccc-primary hover:bg-pccc-light">
            Xem tất cả <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {news.map((item) => (
          <NewsCard key={item.id} news={item} />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
