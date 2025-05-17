
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
      <Button 
        variant="outline" 
        size={isSearchIconOnly ? "icon" : "default"}
        className={isSearchIconOnly ? "h-9 w-9" : "h-9 w-full justify-between relative bg-background border-none"}
        onClick={() => setOpen(true)}
      >
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          {!isSearchIconOnly && (
            <span className="text-muted-foreground text-sm">Tìm kiếm tài liệu...</span>
          )}
        </div>
        {!isSearchIconOnly && (
          <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        )}
      </Button>
      
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
