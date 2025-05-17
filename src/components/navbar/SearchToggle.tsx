
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchBar from '@/components/SearchBar';

interface SearchToggleProps {
  isSearchIconOnly: boolean;
}

const SearchToggle = ({ isSearchIconOnly }: SearchToggleProps) => {
  return isSearchIconOnly ? (
    <Button 
      variant="ghost" 
      size="icon" 
      className="h-9 w-9"
      onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))}
    >
      <Search className="h-5 w-5" />
      <span className="sr-only">Tìm kiếm</span>
    </Button>
  ) : (
    <div className="w-64">
      <SearchBar />
    </div>
  );
};

export default SearchToggle;
