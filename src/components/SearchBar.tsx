
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
    <div className="w-full border-b bg-muted/40">
      <div className="container py-4">
        <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2 mx-auto">
          <Input
            type="search"
            placeholder="Tra cứu văn bản pháp luật..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9"
          />
          <Button type="submit" size="sm">
            <Search className="h-4 w-4 mr-2" />
            Tìm kiếm
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
