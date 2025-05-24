
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { FileText, BookOpen } from 'lucide-react';
import { DialogTitle } from "@/components/ui/dialog";
import { useNavigate } from 'react-router-dom';
import { searchPostsByKeyword } from '@/repository/SearchPostsByKeyword';
import { searchDocumentsByKeyword } from '@/repository/SearchDocumentsByKeyword';
import { DocumentPreviewDialog } from '@/components/DocumentPreviewDialog';
import { SearchResultItem, transformSearchResults } from '@/models/SearchResult';

interface SearchToggleProps {
  isSearchIconOnly: boolean;
}

const SearchToggle = ({ isSearchIconOnly }: SearchToggleProps) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  
  // Document preview state
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewDocument, setPreviewDocument] = useState({
    url: '',
    title: '',
    type: ''
  });
  
  const { toast } = useToast();
  const navigate = useNavigate();

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
  
  // Reset search when dialog is opened/closed
  useEffect(() => {
    if (!open) {
      // Reset search state when dialog is closed
      setSearchQuery('');
      setSearchResults([]);
    }
  }, [open]);
  
  // Handle search input change with debounce
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    
    // Only search if dialog is open
    if (open) {
      const debounceTimeout = setTimeout(() => {
        performSearch(searchQuery);
      }, 300);
      
      return () => clearTimeout(debounceTimeout);
    }
  }, [searchQuery, open]);
  
  const performSearch = async (query: string) => {
    if (!query.trim()) return;
    if (!open) return; // Don't search if dialog is closed
    
    setIsLoading(true);
    try {
      // Call both APIs in parallel
      const [posts, documents] = await Promise.all([
        searchPostsByKeyword(query),
        searchDocumentsByKeyword(query)
      ]);
      
      console.log('API response - Posts:', posts);
      console.log('API response - Documents:', documents);
      
      // Transform results into unified model
      const results = transformSearchResults(posts, documents);
      console.log('Transformed search results:', results);
      
      // Only update results if dialog is still open
      if (open) {
        // Force a delay to ensure state updates properly
        setTimeout(() => {
          setSearchResults(results);
          setIsLoading(false);
        }, 100);
        return;
      }
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Lỗi tìm kiếm",
        description: "Không thể tìm kiếm. Vui lòng thử lại sau.",
        variant: "destructive"
      });
    } finally {
      if (!open) {
        setIsLoading(false);
      }
      // Note: We're setting isLoading to false in the setTimeout above for the success case
    }
  };
  
  const handleResultClick = (result: SearchResultItem) => {
    console.log('Result clicked:', result);
    
    // Close the dialog first
    setOpen(false);
    
    // Use a short timeout to ensure the dialog is closed before proceeding
    setTimeout(() => {
      if (result.type === 'Post' && result.postInfo) {
        // Navigate to post detail page using category.slug/slug format
        const post = result.postInfo;
        const url = `/${post.category.slug}/${post.slug}`;
        console.log('Navigating to post:', url);
        navigate(url);
      } else if (result.type === 'Document' && result.documentInfo) {
        // Open document preview
        setPreviewDocument({
          url: result.url,
          title: result.title,
          type: result.documentInfo.document_type
        });
        setPreviewOpen(true);
      }
    }, 50);
  };
  
  const handleSearch = (value: string) => {
    if (value.trim()) {
      toast({
        title: "Đang tìm kiếm",
        description: `Tìm kiếm với từ khóa: "${value}"`
      });
      performSearch(value);
    }
    // Keep dialog open to show results
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
        <DialogTitle className="sr-only">Tìm kiếm</DialogTitle>
        <CommandInput 
          placeholder="Nhập từ khóa tìm kiếm..." 
          value={searchQuery}
          onValueChange={setSearchQuery}
          autoFocus
        />
        <CommandList>
          {searchResults.length === 0 && !isLoading ? (
            <CommandEmpty>Không tìm thấy kết quả.</CommandEmpty>
          ) : isLoading ? (
            <CommandEmpty>Đang tìm kiếm...</CommandEmpty>
          ) : null}
          
          {/* Debug info */}
          {process.env.NODE_ENV === 'development' && (
            <div className="px-3 py-2 text-xs text-gray-500">
              Results: {searchResults.length}, 
              Posts: {searchResults.filter(item => item.type === 'Post').length}, 
              Docs: {searchResults.filter(item => item.type === 'Document').length}
            </div>
          )}
          
          {/* Group results by type */}
          {!isLoading && searchResults.length > 0 && (
            <div className="space-y-0">
              {searchResults.filter(item => item.type === 'Post').length > 0 && (
                <CommandGroup heading="Bài viết" className="pt-1 pb-0 mb-0">
                  {searchResults
                    .filter(item => item.type === 'Post')
                    .map((result) => (
                      <div
                        key={`post-${result.id}`}
                        className="w-full cursor-pointer hover:bg-accent"
                        onClick={() => handleResultClick(result)}
                      >
                        <CommandItem 
                          className="flex items-center w-full py-0 my-0 h-8 pointer-events-none"
                          value={`post-${result.id}-${result.title}`}
                        >
                          <div className="flex items-center w-full py-[4px]">

                          <BookOpen className="mr-2 h-4 w-4 flex-shrink-0" />
                          <span className="truncate w-full">{result.title}</span>
                          </div>
                        </CommandItem>
                      </div>
                    ))}
                </CommandGroup>
              )}
              
              {searchResults.filter(item => item.type === 'Document').length > 0 && (
                <CommandGroup heading="Văn bản tài liệu" className="pt-1 pb-0 mb-0">
                  {searchResults
                    .filter(item => item.type === 'Document')
                    .map((result) => (
                      <div
                        key={`doc-${result.id}`}
                        className="w-full cursor-pointer hover:bg-accent"
                        onClick={() => handleResultClick(result)}
                      >
                        <CommandItem 
                          className="flex items-center w-full py-0 my-0 h-8 pointer-events-none"
                          value={`doc-${result.id}-${result.title}`}
                        >
                          <div className="flex items-center w-full py-[4px]">

                          <FileText className="mr-2 h-4 w-4 flex-shrink-0" />
                          <span className="truncate w-full">{result.title}</span>
                          </div>
                        </CommandItem>
                      </div>
                    ))}
                </CommandGroup>
              )}
            </div>
          )}
        </CommandList>
        <span id="search-description" className="sr-only">
          Nhập từ khóa để tìm kiếm văn bản pháp luật. Sử dụng phím mũi tên để di chuyển và Enter để chọn.
        </span>
      </CommandDialog>
      {/* Add a hidden div with debug info */}
      {process.env.NODE_ENV === 'development' && searchResults.length > 0 && (
        <div style={{ display: 'none' }} data-search-results-count={searchResults.length}>
          {JSON.stringify(searchResults)}
        </div>
      )}
      
      {/* Document Preview Dialog */}
      <DocumentPreviewDialog 
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        documentUrl={previewDocument.url}
        documentTitle={previewDocument.title}
        documentType={previewDocument.type}
      />
    </>
  );
};

export default SearchToggle;
