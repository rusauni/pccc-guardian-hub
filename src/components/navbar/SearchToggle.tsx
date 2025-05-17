
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { FileText } from 'lucide-react';
import { DialogTitle } from "@/components/ui/dialog";

interface SearchToggleProps {
  isSearchIconOnly: boolean;
}

const SearchToggle = ({ isSearchIconOnly }: SearchToggleProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(open => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSearch = (value: string) => {
    if (value.trim()) {
      toast({
        title: "Đang tìm kiếm",
        description: `Tìm kiếm văn bản với từ khóa: "${value}"`
      });
      // In a real app, this would trigger a search API call
    }
    setOpen(false);
  };

  return (
    <>
      {isSearchIconOnly ? (
        <Button 
          variant="outline" 
          size="icon"
          className="h-9 w-9 rounded-md bg-muted border-none"
          onClick={() => setOpen(true)}
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
          <kbd className="ml-auto pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      )}
      
      <CommandDialog open={open} onOpenChange={setOpen} aria-describedby="search-description">
        <DialogTitle className="sr-only">Tìm kiếm văn bản</DialogTitle>
        <CommandInput placeholder="Nhập từ khóa tìm kiếm văn bản..." />
        <CommandList>
          <CommandEmpty>Không tìm thấy văn bản pháp luật.</CommandEmpty>
          <CommandGroup heading="Văn bản gần đây">
            <CommandItem onSelect={() => handleSearch("Nghị định 136/2020/NĐ-CP")}>
              <FileText className="mr-2 h-4 w-4" />
              <span>Nghị định 136/2020/NĐ-CP</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSearch("Luật PCCC 2001")}>
              <FileText className="mr-2 h-4 w-4" />
              <span>Luật Phòng cháy và chữa cháy 2001</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSearch("Thông tư 149/2020/TT-BCA")}>
              <FileText className="mr-2 h-4 w-4" />
              <span>Thông tư 149/2020/TT-BCA</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Danh mục">
            <CommandItem onSelect={() => handleSearch("Luật")}>
              <FileText className="mr-2 h-4 w-4" />
              <span>Luật</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSearch("Nghị định")}>
              <FileText className="mr-2 h-4 w-4" />
              <span>Nghị định</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSearch("Thông tư")}>
              <FileText className="mr-2 h-4 w-4" />
              <span>Thông tư</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
        <span id="search-description" className="sr-only">
          Nhập từ khóa để tìm kiếm văn bản pháp luật. Sử dụng phím mũi tên để di chuyển và Enter để chọn.
        </span>
      </CommandDialog>
    </>
  );
};

export default SearchToggle;
