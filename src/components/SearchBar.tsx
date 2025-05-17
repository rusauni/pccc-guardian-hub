
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "Đang tìm kiếm",
        description: `Tìm kiếm văn bản với từ khóa: "${searchQuery}"`,
      });
      // In a real app, this would trigger a search API call
    }
  };

  return (
    <div className="bg-pccc-light py-2">
      <div className="container mx-auto px-4">
        <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl mx-auto">
          <Input
            type="search"
            placeholder="Tra cứu văn bản pháp luật về PCCC..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" variant="default" size="sm" className="whitespace-nowrap">
            <Search className="mr-2 h-4 w-4" /> Tìm kiếm
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
