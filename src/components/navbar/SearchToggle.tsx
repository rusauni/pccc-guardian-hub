
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useGlobalSearch } from '@/components/GlobalSearchDialog';

interface SearchToggleProps {
  isSearchIconOnly: boolean;
}

const SearchToggle = ({ isSearchIconOnly }: SearchToggleProps) => {
  // Use the global search dialog
  const { open, setOpen: setOpen, toggleOpen } = useGlobalSearch();

  // All search functionality is now handled in the GlobalSearchDialog component

  return (
    <>
      {isSearchIconOnly ? (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen(true)}
          className="h-9 w-9 rounded-md bg-muted border-none"
        >
          <Search className="h-4 w-4 text-muted-foreground" />
        </Button>
      ) : (
        <Button 
          variant="outline" 
          size="sm"
          className="h-9 w-64 justify-start px-3 text-muted-foreground bg-muted border-none rounded-md"
          onClick={() => setOpen(true)}
        >
          <Search className="h-4 w-4 mr-2" />
          <span className="text-sm">Tìm kiếm tài liệu...</span>
          <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      )}
      {/* The actual search dialog is now rendered globally in the GlobalSearchProvider */}
    </>
  );
};

export default SearchToggle;
