
import { useState, useEffect } from 'react';
import { Search, FileText } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const SearchBar = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSearch = (value: string) => {
    if (value.trim()) {
      toast({
        title: "Đang tìm kiếm",
        description: `Tìm kiếm văn bản với từ khóa: "${value}"`,
      });
      // In a real app, this would trigger a search API call
    }
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex w-full items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm h-9"
      >
        <Search className="h-4 w-4 opacity-50" />
        <span className="text-muted-foreground">Tra cứu văn bản...</span>
        <kbd className="ml-auto pointer-events-none hidden select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs opacity-50 sm:flex">
          <span>⌘</span>K
        </kbd>
      </button>
      
      <CommandDialog open={open} onOpenChange={setOpen}>
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
      </CommandDialog>
    </>
  );
};

export default SearchBar;
