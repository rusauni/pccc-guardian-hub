import { Link } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import NewsCard, { NewsItem } from "./NewsCard";
import { Button } from "@/components/ui/button";
import { getPostsByCategorySug, Post } from "@/repository/GetPostByCategorySug";

interface CategorySectionProps {
  title: string;
  categorySlug: string;
  categoryUrl: string;
  limit?: number;
}

const CategorySection = ({ 
  title, 
  categorySlug, 
  categoryUrl, 
  limit = 4 
}: CategorySectionProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const data = await getPostsByCategorySug(categorySlug, limit);
        setPosts(data);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Không thể tải dữ liệu. Vui lòng thử lại sau.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [categorySlug, limit]);

  // Map the API response to match NewsItem type
  const newsItems: NewsItem[] = posts.map(post => ({
    id: post.id.toString(),
    title: post.title,
    slug: post.slug,
    thumbnail: post.thumbnailUrl,
    thumbnailUrl: post.thumbnailUrl,
    summary: post.summary,
    date_created: post.date_created,
    category: {
      name: post.category?.name || title,
      slug: post.category?.slug || categorySlug,
      id: post.category?.id
    }
  }));

  if (error) {
    return (
      <section className="category-section container mx-auto px-4 py-10">
        <div className="text-center text-red-500">{error}</div>
      </section>
    );
  }


  return (
    <section className="category-section container mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <div className="w-1.5 h-7 bg-pccc-primary mr-3 rounded-sm"></div>
          <h2 className="text-2xl font-bold text-pccc-dark">{title}</h2>
        </div>
        <Link to={categoryUrl}>
          <Button variant="outline" className="flex items-center gap-2 border-pccc-primary text-pccc-primary hover:bg-pccc-primary hover:text-white transition-all duration-300">
            Xem tất cả <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-pccc-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {newsItems.map((item) => (
            <NewsCard key={item.id} news={item} />
          ))}
        </div>
      )}
    </section>
  );
};

export default CategorySection;
